import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { decrypt, encrypt } from "../utils/CyptoJSUtils";
import { decryptEnvFile, encryptEnvFile } from "../utils/EncryptEnvFile";
import logger from "../utils/LoggerUtils";
import { generateFakeUsers, exportFakeUsersToJson, exportFakeUsersToCsv } from "../utils/FakerDataUtils";

// to execute test in serial mode, add .serial to test
test.describe.configure({ mode: "serial" });

const authFile = "src/data/auth.json";


test.skip("Login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.fillUsername(decrypt(process.env.user_id!));
    await loginPage.fillPassword(decrypt(process.env.password!));
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleToBeVisible();
    logger.info("Login Test is completed successfully");
    await page.context().storageState({ path: authFile });
});

test("Login with auth file", async ({ browser }) => {
    const context = await browser.newContext({storageState: authFile});
    const page = await context.newPage();
    await page.goto("https://orgfarm-64efd58fb4-dev-ed.develop.lightning.force.com/lightning/page/home");
    await expect(page.locator("a[title='Home']").first()).toBeVisible({ timeout: 120000 });
});

test.skip("Testing ENV", async ({ page }) => {
    console.log(process.env.NODE_ENV);
    console.log("Test");
    console.log(process.env.password);

});

test.skip("Sample env test", async ({ page }) => {

    // const plaintext = "Hello, World!";
    // const encrypted = encrypt(plaintext);

    // console.log("SALT ",process.env.SALT);
    // console.log("Encrypted: ", encrypted);

    // const decrypted = decrypt(encrypted);
    // console.log("Decrypted: ", decrypted);

    encryptEnvFile();

});

test.skip("Testing faker", async () => {
    // console.log("Fake User: ", generateFakeUser());
    const testData = generateFakeUsers(20);

    // Export Data to JSON file
    exportFakeUsersToJson(testData, "fake_users.json");

    //Export Data to CSV file
    exportFakeUsersToCsv(testData, "fake_users.csv");
});



