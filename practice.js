import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";
chromium.use(stealth());

async function main() {
  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage({});

  await page.goto(
    "https://wellfound.com/jobs/2498629-frontend-engineer?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic"
  );
  await page.getByRole("button", { name: "More" }).click();
  await page.pause();

  const innerHTML = await page.$eval("h1", (el) => el.innerHTML);

  console.log(innerHTML);
}

main();
