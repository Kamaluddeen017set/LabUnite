import express from "express";
import Lab from "../models/Lab.js";
import auth from "../middleware/auth.js";
import {
  createLab,
  getLabPatientsToday,
  getLabTestsToday,
  getSingleLabPatients,
  getSingleLabStaff,
  getSingleLabTests,
  getSingleLabTestTempleteLists,
} from "../controllers/labController.js";

const router = express.Router();

/////only admin can create lab
router.post("/", auth(["superAdmin"]), createLab);

// router.get(
//   "/",
//   auth(["SuperAdmin", "admin", "patient", "lab_technician", "lab_scientist"]),
//   async (req, res) => {
//     const labs = await Lab.find();
//     res.json(labs);
//   }
// );
router.get(
  "/:labId/patients",
  auth([
    "SuperAdmin",
    "admin",
    "receptionist",
    "lab_technician",
    "lab_scientist",
  ]),
  getSingleLabPatients
);
router.get("/:labId/staffs", auth(["SuperAdmin", "admin"]), getSingleLabStaff);
router.get(
  "/:labId/tests",
  auth([
    "SuperAdmin",
    "admin",
    "lab_technician",
    "receptionist",
    "lab_scientist",
  ]),
  getSingleLabTests
);
router.get(
  "/:labId/test-templetes",
  auth([
    "SuperAdmin",
    "admin",
    "receptionist",
    "lab_technician",
    "lab_scientist",
  ]),
  getSingleLabTestTempleteLists
);
router.get(
  "/:labId/today-patients/date",
  auth([
    "admin",
    "SuperAdmin",
    "receptionist",
    "lab_technician",
    "lab_scientist",
  ]),
  getLabPatientsToday
);
router.get(
  "/:labId/today-tests/date",
  auth([
    "admin",
    "SuperAdmin",
    "receptionist",
    "lab_technician",
    "lab_scientist",
  ]),
  getLabTestsToday
);

export default router;
