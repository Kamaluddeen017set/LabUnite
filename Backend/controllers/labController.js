import Lab from "../models/Lab.js";
import User from "../models/User.js";
import Patient from "../models/Patient.js";
import TestTemplete from "../models/TestTemplete.js";
import Test from "../models/Test.js";

//generate Code

function generateCodeFromName(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}
async function generateUnoqueLabCode(name) {
  const codeFromName = generateCodeFromName(name);

  let exiting = await Lab.findOne({ code: codeFromName });

  if (!exiting) return codeFromName;

  const suffix = Date.now().toString.slice(-2);
  return codeFromName + suffix;
} ///get lab patients
export const getSingleLabPatients = async (req, res) => {
  try {
    const { labId } = req.params;

    const patients = await Patient.find({ labId })
      .populate("patientId", "name age gender patientId phone address")
      .populate("labId", "name")
      .populate("staffId", "name role")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, patients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLabPatientsToday = async (req, res) => {
  const { start, end } = req.query;
  const { labId } = req.params;
  console.log(req.query);
  console.log(req.params);
  if ((!start, !end)) {
    return res.status(400).json({
      success: false,
      message: " Current Date are Required",
    });
  }
  const patients = await Patient.find({
    labId,
    createdAt: {
      $gte: new Date(start),
      $lte: new Date(end + "T23:59:59"),
    },
  })
    .populate("patientId", "name age gender patientId phone address")
    .populate("labId", "name")
    .populate("staffId", "name role")
    .sort({ createdAt: -1 });
  res.json({ success: true, patients });
};

export const createLab = async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;
    const code = await generateUnoqueLabCode(name);

    const exitingLab = await Lab.findOne({ name });
    if (exitingLab) {
      return res.status(400).json({ message: "Lab already exists" });
    }
    const lab = await Lab.create({
      name,
      email,
      address,
      phone,
      code,
      patientCounter: 0,
      testCounter: 0,
    });
    res.status(201).json({ message: "Lab created successfully", lab });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleLabTestTempleteLists = async (req, res) => {
  try {
    const { labId } = req.params;

    const testTempletes = await TestTemplete.find({ labId });
    res.status(200).json({ success: true, testTempletes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getSingleLabTests = async (req, res) => {
  try {
    const { labId } = req.params;

    const tests = await Test.find({ labId })
      .populate("patientId", "name age gender patientId phone address")
      .populate("labId", "name")
      .populate("staffId", "name role")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, tests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//single lab today tests
export const getLabTestsToday = async (req, res) => {
  const { start, end } = req.query;
  const { labId } = req.params;
  console.log(req.query);
  console.log(req.params);
  if ((!start, !end)) {
    return res.status(400).json({
      success: false,
      message: " Current Date are Required",
    });
  }
  const tests = await Test.find({
    labId,
    createdAt: {
      $gte: new Date(start),
      $lte: new Date(end + "T23:59:59"),
    },
  })
    .populate("patientId", "name age gender patientId phone address")
    .populate("labId", "name")
    .populate("staffId", "name role")
    .sort({ createdAt: -1 });
  res.json({ success: true, tests });
};

///lab stafff
export const getSingleLabStaff = async (req, res) => {
  try {
    const { labId } = req.params;

    const staffs = await User.find({ labId })
      .populate("labId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, staffs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
