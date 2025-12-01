import { getBrowser } from "../lip/puppeteerBrowser.js";
import ejs from "ejs";
import path from "path";
export async function generateReportPDF(report, lab, qrCodeBase64) {
  const browser = await getBrowser();

  const page = await browser.newPage();

  const templetePath = path.resolve("templates/officialReportTemplate.ejs");

  const html = await ejs.renderFile(
    templetePath,
    { report, lab, qrCodeBase64 },
    { async: true }
  );

  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.emulateMediaType("screen");

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "10mm",
      bottom: "10mm",
      left: "10mm",
      right: "10mm",
    },
  });
  await page.close();
  return pdf;
}
