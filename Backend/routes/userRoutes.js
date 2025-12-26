import express from "express";
import {
  registerUser,
  loginUser,
  getUserDetails,
  updateProfile,
  updatePassword,
  getSingleUserPatients,
} from "../controllers/usersController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//Register a User
router.post("/register", auth(["superAdmin", "admin"]), registerUser);

//login user
router.post(
  "/login",

  loginUser
);
//get single user
router.put(
  "/update-profile",
  auth(["patient", "admin", "lab_technician", "lab_scientist", "receptionist"]),
  updateProfile
);

router.put(
  "/update-password",
  auth(["patient", "admin", "lab_technician", "lab_scientist", "receptionist"]),
  updatePassword
);
router.get(
  "/:id",
  auth([
    "patient",
    "superAdmin",
    "admin",
    "lab_technician",
    "lab_scientist",
    "receptionist",
  ]),
  getUserDetails
);
router.get(
  "/:staffId/patients",
  auth(["admin", "lab_technician", "lab_scientist", "receptionist"]),
  getSingleUserPatients
);
export default router;
