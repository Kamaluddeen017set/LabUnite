import Lab from "../models/Lab.js";
import Patient from "../models/Patient.js";
import TestTemplete from "../models/TestTemplete.js";

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
}
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
///get lab patients
export const getSingleLabPatients = async (req, res) => {
  try {
    const { labId } = req.params;

    const patients = await Patient.find({ labId });
    res.status(200).json({ success: true, patients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
