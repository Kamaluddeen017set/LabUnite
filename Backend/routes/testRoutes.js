import express from "express";
import auth from "../middleware/auth.js";
import {
  createNewTest,
  deleteTest,
  getAllTest,
  getSingleTest,
  updateTest,
} from "../controllers/testController.js";

const router = express.Router();

router.post(
  "/",
  auth(["lab_technician", "lab_scientist", "receptionist"]),
  createNewTest
);
router.get("/", auth(["superAdmin"]), getAllTest);

router.get(
  "/:labId/:id",
  auth(["patient", "admin", "lab_technician", "lab_scientist"]),
  getSingleTest
);

router.put(
  "/:labId/:id",
  auth(["lab_technician", "lab_scientist", "receptionist"]),
  updateTest
);
router.delete(
  "/:id",
  auth(["lab_technician", "lab_scientist", "receptionist"]),
  deleteTest
);

export default router;
