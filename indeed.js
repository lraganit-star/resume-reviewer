import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";
chromium.use(stealth());

async function main() {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext({
    viewport: null,
  });

  const page = await context.newPage({});
  await page.goto(
    "https://www.indeed.com/jobs?q=front+end+developer&l=san+francisco%2C+ca&sc=0kf%3Aattr%28DSQF7%29%3B&radius=100&pp=gQAAAAAAAAAAAAAAAAACE76pWQADAAABAAA&vjk=c71d3fc8e4d88f45"
  );

  const cards = await page.$$("#mosaic-provider-jobcards .css-5lfssm");

  // This makes it to where we click a card and then go back since the full job description doesn't appear until this is done
  const companyInfo_0 = await cards[0].$(".resultContent");
  await page.waitForTimeout(1000);
  await companyInfo_0.click();
  await page.goBack({ waitUntil: "load" });
  await page.waitForTimeout(3000);

  const reloadedCards = await page.$$("#mosaic-provider-jobcards .css-5lfssm");
  const reloadedCompanyInfo_0 = await reloadedCards[0].$(".resultContent");
  await reloadedCompanyInfo_0.click();

  await page.pause();

  await page.waitForTimeout(1000);
  const jobComponentHeader = await page.$(".jobsearch-HeaderContainer");
  // console.log(jobComponent);

  const jobInfo = [];
  const jobComponentHeaderInfo = await jobComponentHeader.innerText();
  console.log(jobComponentHeaderInfo);
  jobInfo.push(jobComponentHeaderInfo.split("\n"));

  const jobComponentBody = await page.$(".jobsearch-embeddedBody");
  const jobComponentBodyInfo = await jobComponentBody.innerText();
  console.log(jobComponentBodyInfo);
  jobInfo.push(jobComponentBodyInfo.split("\n"));

  //   const companyInfo = await card.$(".resultContent");
  //   if (companyInfo) {
  //     await companyInfo.click();
  //   }
  // }

  // console.log(jobInfo);
  // await page.waitForTimeout(10000);
  await context.close();
  await browser.close();
}

main();
