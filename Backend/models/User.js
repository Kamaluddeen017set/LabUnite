import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String },
    age: { type: Number },
    active: { type: Boolean, default: false },
    address: { type: String },
    phone: { String },
    StaffId: { type: String, unique: true },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "lab_scientist", "lab_technician"],
      default: "lab_technician",
    },
    labId: { type: mongoose.Schema.Types.ObjectId, ref: "Lab", required: true },
  },
  { timestamps: true }
);

////=====hash password before saving======/////////
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//password check
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
