import {Page} from "@playwright/test";
import HomePage from "./homePage";
import logger from "../utils/LoggerUtils";

export default class LoginPage {
    // private readonly usernameInputSelector = "input[placeholder='Enter your username...']";
    // private readonly passwordInputSelector = "input[placeholder='Enter your password...']";
    // private readonly loginButtonSelector = "//button/span[text()='Login']";

    private readonly usernameInputSelector = "#username";
    private readonly passwordInputSelector = "#password";
    private readonly loginButtonSelector = "#Login";

    constructor(private page: Page) {
    }

    async navigate() {
        await this.page.goto("/");
    }

    async fillUsername(username: string) {
        console.log("Filling username: ", username);
        await this.page.locator(this.usernameInputSelector).first().fill(username);
        logger.info("Filled username");
    }

    async fillPassword(password: string) {
        console.log("Filling password: ", password);
        await this.page.locator(this.passwordInputSelector).first().fill(password);
        logger.info("Filled password");
    }

    async clickLoginButton() {
        await this.page.locator(this.loginButtonSelector)
        .first()
        .click()
        .catch((error) => {
            logger.error("Error clicking login button: ${error}");
            console.error("Error clicking login button:", error);
            throw error;
        });
        logger.info("Clicked on Login button");

        const homePage = new HomePage(this.page);
        return homePage;
    }

}
