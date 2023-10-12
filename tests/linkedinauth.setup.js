import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("https://www.linkedin.com/");
  await page.locator(".text-input").first().click();
  await page.getByLabel("Email or phone").fill("email");
  await page.getByLabel("Password", { exact: true }).click();
  await page.getByLabel("Password", { exact: true }).fill("password");
  await page.getByRole("button", { name: "Sign in" }).click();

  await page.context().storageState({ path: authFile });
});
