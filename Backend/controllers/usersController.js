import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Patient from "../models/Patient.js";
import { logActivity } from "../middleware/activityLogger.js";
import Lab from "../models/Lab.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, labId } = req.body;

    if (req.user.role === "admin" && role === "admin") {
      return res
        .status(403)
        .json({ message: "Admins cannot create other admins" });
    }
    const exitingUser = await User.findOne({ email });
    if (exitingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const lab = await Lab.findById(labId);

    lab.staffCounter += 1;
    await lab.save();

    //staff id
    const sequence = String(lab.staffCounter).padStart(4, "0");
    const StaffId = `${lab.code}-S${sequence}`;
    const user = await User.create({
      name,
      email,
      StaffId,
      password,
      role,
      labId,
    });
    res
      .status(201)
      .json({ message: `${user.role} user registered successfully`, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //superADmin
    console.log(req.body);
    if (email === process.env.SUPER_ADMIN_EMAIL) {
      if (password === process.env.SUPER_ADMIN_PASSWORD) {
        const token = jwt.sign(
          { id: "superAdmin-static-id", role: "superAdmin" },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );
        const user = {
          message: "Super admin loggeg in",
          role: "superAdmin",
          name: "DevKhamal",
        };
        res.json({ token, user });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid super admin credencials" });
      }
    }

    //normal users
    const user = await User.findOne({ email }).populate("labId", "name");

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    await logActivity(user._id, user.labId, "Logged in");

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

///userdetails
export const getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId)
      .select("-password")
      .populate("labId", "name address");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

///user update

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, address, gender } = req.body;

    const updateFields = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, gender, address },
      { new: true }
    );
    if (!updateFields) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "profile updated succeses", updateFields });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

///passwoed update
export const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;

    const { currentPassword, newPassword } = req.body;

    ///find
    const user = await User.findById(userId);

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
///Patients register by the user
export const getSingleUserPatients = async (req, res) => {
  try {
    const { staffId } = req.params;

    const patients = await Patient.find({ staffId });
    res.status(200).json({ success: true, patients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
