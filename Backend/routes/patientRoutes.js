import express from "express";
import Patient from "../models/Patient.js";
import auth from "../middleware/auth.js";
import {
  registerPatient,
  loginPatient,
  getPatientDetails,
  updatePassword,
  updateProfile,
} from "../controllers/patientController.js";
const router = express.Router();

router.post(
  "/register",
  auth(["lab_technician", "lab_scientist"]),
  registerPatient
);
router.post("/login", loginPatient);
router.put(
  "/update-profile",
  auth(["patient", "admin", "lab_technician", "lab_scientist"]),
  updateProfile
);

router.put(
  "/update-password",
  auth(["patient", "admin", "lab_technician", "lab_scientist"]),
  updatePassword
);
router.get(
  "/:id",
  auth(["patient", "lab_technician", "lab_scientist"]),
  getPatientDetails
);

export default router;
