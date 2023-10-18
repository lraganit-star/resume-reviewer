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
  const jobInfo = await page.$eval(
    "#mosaic-provider-jobcards",
    (headerCard) => {
      const data = [];
      const listCards = headerCard.getElementsByClassName("css-5lfssm");
      Array.from(listCards).forEach((card) => {
        data.push(card.innerText.split("\n"));
      });
      return data;
    }
  );
  //   await page.pause();
  console.log(jobInfo);
}

main();
