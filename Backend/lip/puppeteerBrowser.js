import puppeteer from "puppeteer";

let browser = null;

export async function getBrowser() {
  if (!browser || !browser.isConnected()) {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
  }
  return browser;
}
