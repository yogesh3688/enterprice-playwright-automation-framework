import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { decrypt, encrypt } from "../utils/CyptoJSUtils";
import { decryptEnvFile, encryptEnvFile } from "../utils/EncryptEnvFile";


test("Login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.fillUsername(decrypt(process.env.user_id!));
    await loginPage.fillPassword(decrypt(process.env.password!));
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleToBeVisible();
});

test.skip("Testing ENV", async ({ page }) => {
    console.log(process.env.NODE_ENV);
    console.log();
    console.log(process.env.password);

});

test.skip("Sample env test",async({page})=>{
    
    // const plaintext = "Hello, World!";
    // const encrypted = encrypt(plaintext);
    
    // console.log("SALT ",process.env.SALT);
    // console.log("Encrypted: ", encrypted);

    // const decrypted = decrypt(encrypted);
    // console.log("Decrypted: ", decrypted);

    encryptEnvFile();

});