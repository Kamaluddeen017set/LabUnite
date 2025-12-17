import express from "express";
import auth from "../middleware/auth.js";
import {
  getActivitiesByStaff,
  getAllActivities,
  getStaffActivitiesbyDate,
} from "../controllers/staffActivityController.js";

const router = express.Router();

//gett all lab activities
router.get("/:labId", auth(["admin", "SuperAdmin"]), getAllActivities);

//get activities by staff
router.get(
  "/:labId/staff/:staffId",
  auth(["admin", "SuperAdmin"]),
  getActivitiesByStaff
);
router.get(
  "/:labId/filter/date",
  auth(["admin", "SuperAdmin"]),
  getStaffActivitiesbyDate
);

export default router;
