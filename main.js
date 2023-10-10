import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";
chromium.use(stealth());

async function main() {
  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage({
    // bypassCSP: true,
  });

  await page.goto(
    "https://wellfound.com/jobs/2498629-frontend-engineer?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic"
  );
  //   await page.pause();
  //   await page.waitForTimeout(10000);
  // await page.getByAltText("More").click();
  // await page.waitForFunction(() => {
  //   const repoCards = document.querySelectorAll("article.border");
  //   return repoCards.length > 20;
  // });

  // Extract data from the page. Selecting all 'article' elements
  // will return all the repository cards we're looking for.
  const innerHTML = await page.$eval("h1", (el) => el.innerHTML);

  // Print the results
  console.log(innerHTML);

  // await page.waitForTimeout(10000);
  // await browser.close();
}

main();
