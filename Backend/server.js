import express from "express";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import labRoutes from "./routes/labRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import testTempleteRoutes from "./routes/testTempleteRoutes.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:3001",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked: Origin not allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
//Routes
app.use("/api/users", userRoutes);
app.use("/api/labs", labRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/test-templetes", testTempleteRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server runing on port${PORT}`));
