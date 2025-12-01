import Patient from "../models/Patient.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { json } from "express";
import Lab from "../models/Lab.js";

///generate token

const generateToken = (id) => {
  return jwt.sign({ id, role: "patient" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

///register new patient
export const registerPatient = async (req, res) => {
  try {
    const { name, phone, password, labId, staffId, gender, address, age } =
      req.body;

    if (!name || !phone || !password || !labId || !staffId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exiting = await Patient.findOne({ phone });

    if (exiting)
      return res.status(400).json({ message: "Patient already exists" });

    const lab = await Lab.findById(labId);

    lab.patientCounter += 1;
    await lab.save();

    //patient id
    const year = new Date().getFullYear();
    const sequence = String(lab.patientCounter).padStart(4, "0");
    const patientId = `${lab.code}-${year}-${sequence}`;
    const patient = await Patient.create({
      name,
      phone,
      password,
      labId,
      patientId,
      address,
      age,
      gender,
      staffId,
    });

    res.status(201).json({
      message: "Patient registered successfully",
      token: generateToken(patient._id),
      patient: {
        id: patient._id,
        name: patient.name,
        phone: patient.phone,
        labId: patient.labId,
        patientId: patient.patientId,
        staffId: patient.staffId,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
////login patient with phone and password
export const loginPatient = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const patient = await Patient.findOne({ phone });

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const isMatch = await patient.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    res.json({
      message: "Login successful",
      token: generateToken(patient._id),
      patient: {
        id: patient._id,
        name: patient.name,
        phone: patient.phone,
        labId: patient.labId,
        staffId: patient.staffId,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPatientDetails = async (req, res) => {
  try {
    const patientId = req.params.id;

    const patient = await Patient.findById(patientId)
      .populate("labId", "name address")
      .populate({
        path: "tests",
        populate: { path: "staffId", select: "name role" },
      })
      .populate("staffId", "name role");
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
///patient update

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, address, gender } = req.body;

    const updateFields = await Patient.findByIdAndUpdate(
      req.user._id,
      { name, phone, gender, address },
      { new: true }
    );
    if (!updateFields) {
      return res.status(404).json({ message: "patient not found" });
    }

    res.json({ message: "profile updated succeses", updateFields });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
///tests
export const getSingleLabTests = async (req, res) => {
  try {
    const { labId } = req.params;

    const tests = await Test.find({ labId });

    res.status(200).json({ success: true, tests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
///passwoed update
export const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;

    const { currentPassword, newPassword } = req.body;

    ///find
    const user = await Patient.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    //verify old
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current Password incurrect" });

    if (newPassword.length < 6)
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters long" });

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password Updated Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
