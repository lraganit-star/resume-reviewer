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
  const companyInfo_0 = await cards[0].$(".resultContent");
  await page.waitForTimeout(1000);
  await companyInfo_0.click();
  await page.goBack({ waitUntil: "load" });

  // const jobInfo = [];
  // for (let card of cards) {
  //   const cardInfo = await card.innerText();
  //   jobInfo.push(cardInfo.split("\n"));

  //   const companyInfo = await card.$(".resultContent");
  //   if (companyInfo) {
  //     await companyInfo.click();
  //   }
  // }

  await page.pause();
  // console.log(jobInfo);
  // await page.waitForTimeout(10000);
  await context.close();
  await browser.close();
}

main();
