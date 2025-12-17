import StaffActivity from "../models/StaffActivity.js";

export async function logActivity(staffId, labId, action, details, ip) {
  try {
    await StaffActivity.create({
      staffId,
      labId,
      action,
      details,
      ipAddress: ip,
    });
  } catch (err) {
    console.log("Activity log error", err);
  }
}
