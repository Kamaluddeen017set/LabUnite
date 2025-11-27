// models/Patient.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    address: String,
    gender: String,
    age: String,
    password: { type: String, required: true },
    patientId: { type: String, unique: true },
    labId: { type: mongoose.Schema.Types.ObjectId, ref: "Lab", required: true },
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }],
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

// Hash password before save
patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare password
patientSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export model AFTER methods are defined
const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
