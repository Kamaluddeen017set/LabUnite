import express from "express";
import Test from "../models/Test.js";

import auth from "../middleware/auth.js";
import {
  createNewTest,
  deleteTest,
  getSingleTest,
  updateTest,
} from "../controllers/testController.js";

const router = express.Router();

router.post("/", auth(["lab_technician", "lab_scientist"]), createNewTest);
router.get("/", async (req, res) => {
  const tests = await Test.find()
    .populate("patientId", "name")
    .populate("labId", "name")
    .populate("staffId", "name role");
  res.json(tests);
});

router.get(
  "/:labId/:id",
  auth(["patient", "admin", "lab_technician", "lab_scientist"]),
  getSingleTest
);

router.put(
  "/:labId/:id",
  auth(["lab_technician", "lab_scientist"]),
  updateTest
);
router.delete("/:id", auth(["lab_technician", "lab_scientist"]), deleteTest);

export default router;
