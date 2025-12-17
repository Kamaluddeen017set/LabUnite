import mongoose from "mongoose";
const staffActivitySchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  labId: { type: mongoose.Schema.Types.ObjectId, ref: "Lab", required: true },
  action: { type: String, required: true },
  details: { type: String },
  ipAddress: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("StaffActivity", staffActivitySchema);
