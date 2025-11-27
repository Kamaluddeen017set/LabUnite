import mongoose, { Schema, Types } from "mongoose";

const testParameterSchema = new mongoose.Schema({
  parameter: { type: String, default: true },
  unit: { type: String, default: true },
  referenceRange: { type: String, default: true },
  result: { type: String, default: "" },
});
const testSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  method: { type: String, default: "" },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  testTempleteId: { type: mongoose.Schema.Types.ObjectId, ref: "TestTemplete" },
  testType: { type: String, enum: ["single", "complex"], required: true },
  sampleType: { type: String, default: "" },
  category: { type: String, required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  labId: { type: mongoose.Schema.Types.ObjectId, ref: "Lab" },
  testId: { type: String, unique: true },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  singleUnit: { type: String, default: "" },
  singleReferenceRange: { type: String, default: "" },
  singleResult: { type: String, default: "" },
  parameters: [testParameterSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Test", testSchema);
