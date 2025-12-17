import StaffActivity from "../models/StaffActivity.js";

//get all activities

export const getAllActivities = async (req, res) => {
  const { labId } = req.params;
  const activities = await StaffActivity.find({ labId })
    .populate("staffId", "name email role")
    .sort({ createdAt: -1 });

  res.json({ success: true, activities });
};
//get Activities By Staff Id
export const getActivitiesByStaff = async (req, res) => {
  const { labId, staffId } = req.params;

  const activities = await StaffActivity.find({
    staffId,
    labId,
  })
    .populate("staffId", "name email role")
    .sort({ createdAt: -1 });
  res.json({ success: true, activities });
};
export const getStaffActivitiesbyDate = async (req, res) => {
  const { start, end } = req.query;
  const { labId } = req.params;
  if ((!start, !end)) {
    return res.status(400).json({
      success: false,
      message: "Start and end dates are required",
    });
  }

  const activities = await StaffActivity.find({
    labId,
    createdAt: {
      $gte: new Date(start),
      $lte: new Date(end + "T23:59:59"),
    },
  })
    .populate("staffId", "name email role")
    .sort({ createdAt: -1 });
  res.json({ success: true, activities });
};
