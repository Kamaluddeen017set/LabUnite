import express from "express";
import Lab from "../models/Lab.js";
import auth from "../middleware/auth.js";
import {
  createLab,
  getSingleLabPatients,
  getSingleLabTestTempleteLists,
} from "../controllers/labController.js";

const router = express.Router();

/////only admin can create lab
router.post("/", auth(["superAdmin"]), createLab);

router.get(
  "/",
  auth(["SuperAdmin", "admin", "patient", "lab_technician", "lab_scientist"]),
  async (req, res) => {
    const labs = await Lab.find();
    res.json(labs);
  }
);
router.get(
  "/:labId/patients",
  auth(["SuperAdmin", "admin", "patient", "lab_technician", "lab_scientist"]),
  getSingleLabPatients
);
router.get(
  "/:labId/test-templetes",
  auth(["SuperAdmin", "admin", "patient", "lab_technician", "lab_scientist"]),
  getSingleLabTestTempleteLists
);
export default router;
