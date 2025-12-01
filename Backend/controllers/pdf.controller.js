import Lab from "../models/Lab.js";
import Test from "../models/Test.js";
import { labBranding } from "../services/labBrading.js";
import { generateReportPDF } from "../services/pdfGenerator.js";
import QRCode from "qrcode";

export const generateTestPdf = async (req, res) => {
  try {
    const { labId, testId } = req.params;
    const lab = await Lab.findById(labId).lean();

    const report = await Test.findOne({ labId: labId, _id: testId })
      .lean()
      .populate("patientId", "name age gender patientId phone address")
      .populate("labId", "name")
      .populate("staffId", "name role");

    if (!lab || !report) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    const branding = labBranding(lab);
    const verificationLink = `http:5000/official/${labId}/repports/${testId}`;
    const qrCodeBase64 = await QRCode.toDataURL(verificationLink, {
      width: 300,
      margin: 2,
    });
    const pdf = await generateReportPDF(report, branding, qrCodeBase64);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline;filename=${testId}.pdf`,
    });
    res.send(pdf);
  } catch (error) {
    console.error(error);
    res.status(500).send("PDF generation failed");
  }
};
