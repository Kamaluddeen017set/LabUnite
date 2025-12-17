import mongoose, { Types } from "mongoose";
const labSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  code: String,
  active: { type: Boolean, default: false },
  patientCounter: { type: Number, default: 0 },
  testCounter: { type: Number, default: 0 },
  staffCounter: { type: Number, default: 0 },
  testTempletes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "TestTemplete" },
  ],
  address: String,
  phone: String,
});
export default mongoose.model("Lab", labSchema);
