import { Browser } from "puppeteer";

export const initBrowser = async () => {
  let browser: Browser | undefined | null;
  if (process.env.NODE_ENV !== "development") {
    const puppeteer = require("puppeteer-core");
    browser = await puppeteer.launch({
      headless: true,
    });
  } else {
    const puppeteer = require("puppeteer");
    browser = await puppeteer.launch({ headless: false });
  }

  return browser;
};
