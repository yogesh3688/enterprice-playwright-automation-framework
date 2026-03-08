import {Page,expect} from "@playwright/test";
import LoginPage from "./loginPage";


export default class HomePage {
    private readonly serviceTitleSelector = "a[title='Home']";
    // private readonly userProfileMenuSelectoruser-profile-menu";
    // private readonly userProfileNameSelector = "#user-profile-name";

    constructor(private page: Page) {
    }

    async expectServiceTitleToBeVisible() {
        await expect(this.page.locator(this.serviceTitleSelector).first()).toBeVisible({timeout: 120000});
    }
}