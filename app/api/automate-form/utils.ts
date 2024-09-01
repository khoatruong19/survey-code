import { Browser } from "puppeteer";

export const initBrowser = async () => {
  let browser: Browser | undefined | null;
  if (process.env.NODE_ENV !== "development") {
    const chromium = require("@sparticuz/chromium");
    // Optional: If you'd like to disable webgl, true is the default.
    chromium.setGraphicsMode = false;
    const puppeteer = require("puppeteer-core");
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar"
      ),
      headless: true,
    });
  } else {
    const puppeteer = require("puppeteer");
    browser = await puppeteer.launch({ headless: false });
  }

  return browser;
};
