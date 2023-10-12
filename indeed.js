import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";
chromium.use(stealth());

async function main() {
  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage({});

  await page.goto(
    "https://www.indeed.com/jobs?q=front+end+developer&l=san+francisco%2C+ca&sc=0kf%3Aattr%28DSQF7%29%3B&radius=100&pp=gQAAAAAAAAAAAAAAAAACE76pWQADAAABAAA&vjk=c71d3fc8e4d88f45"
  );

  await await page.pause();
}

main();
