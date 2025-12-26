import mongoose, { Types } from "mongoose";

const fieldSchema = new mongoose.Schema({
  parameter: { type: String, required: true },
  unit: { type: String, default: "" },
  referenceRange: { type: String, default: "" },
});

const testTempleteSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    testName: { type: String, required: true },
    testType: { type: String, enum: ["single", "complex"], required: true },
    singleUnit: { type: String, default: "" },
    singleReferenceRange: { type: String, default: "" },
    parameters: [fieldSchema],
    sample: { type: String, required: true },
    price: { type: Number, required: true },
    labId: { type: mongoose.Schema.Types.ObjectId, ref: "Lab" },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TestTemplete", testTempleteSchema);
