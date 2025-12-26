import express from "express";
import auth from "../middleware/auth.js";
import {
  creacteTestTemplete,
  deleteTestTemplete,
  getAllTestTemplete,
  getSingleTestTemplete,
  updateTestTemplete,
} from "../controllers/testTempleteController.js";

const router = express.Router();

router.post("/create", auth(["admin", "SuperAdmin"]), creacteTestTemplete);
router.get(
  "/",
  auth(["patient", "admin", "lab_technician", "lab_scientist", "receptionist"]),
  getAllTestTemplete
);
router.get(
  "/:labId/:id",
  auth(["patient", "admin", "lab_technician", "lab_scientist", "receptionist"]),
  getSingleTestTemplete
);
router.put("/:id", auth(["admin", "SuperAdmin"]), updateTestTemplete);
router.delete("/:id", auth(["admin", "SuperAdmin"]), deleteTestTemplete);

export default router;
