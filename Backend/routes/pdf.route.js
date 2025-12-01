import express from "express";
import { generateTestPdf } from "../controllers/pdf.controller.js";

const router = express.Router();

router.get("/:labId/report/:testId/pdf", generateTestPdf);

export default router;
