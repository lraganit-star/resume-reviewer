import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";
chromium.use(stealth());

async function main() {
  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage({});

  await page.goto("https://www.linkedin.com/");
}

main();
