import { NextRequest } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const codes = body.code.split("-");
    const review = body.review ?? "";

    const browser = await puppeteer.launch({ headless: false });
    if (!browser)
      return new Response(JSON.stringify({ error: "An error occurred" }), {
        status: 500,
      });
    const page = await browser.newPage();
    await page.goto("https://www.mcdvoice.com");

    await page.type("#CN1", codes[0]);
    await page.type("#CN2", codes[1]);
    await page.type("#CN3", codes[2]);
    await page.type("#CN4", codes[3]);
    await page.type("#CN5", codes[4]);
    await page.type("#CN6", codes[5]);

    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    await page.click('input[value="1"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    await page.click('input[value="1"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    await page.click('input[value="5"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    await page.click('input[value="1"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    await page.evaluate(() => {
      const checkboxes: any = document.querySelectorAll('input[value="1"]');
      checkboxes.forEach((checkbox: any) => {
        checkbox?.click();
      });
    });
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    await page.evaluate(() => {
      const checkboxes: any = document.querySelectorAll('input[value="5"]');
      checkboxes.forEach((checkbox: any) => {
        checkbox?.click();
      });
    });
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    await page.evaluate(() => {
      const checkboxes: any = document.querySelectorAll('input[value="5"]');
      checkboxes.forEach((checkbox: any) => {
        checkbox?.click();
      });
    });
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    await page.click('input[value="1"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    await page.click('input[value="1"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    await page.click('input[value="5"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    await page.click('input[value="2"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    await page.evaluate(() => {
      const checkboxes: any = document.querySelectorAll('input[value="5"]');
      checkboxes.forEach((checkbox: any) => {
        checkbox?.click();
      });
    });
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    // write review
    await page.type("#S081000", review);
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    await page.click('input[value="1"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    await page.click('input[value="3"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    await page.click('input[value="4"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    await page.click('input[value="5"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click("#NextButton"),
    ]);
    // await browser.close();
    return new Response(JSON.stringify({ message: "Form submitted" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
}
