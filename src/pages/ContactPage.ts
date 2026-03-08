import { Page,expect } from "@playwright/test";
import logger from "../utils/LoggerUtils";

export default class ContactPage {
    private readonly contactsLink = "a[title='Contacts']";
    private readonly newButtonLocator = "button[name='NewContact']";
    private readonly serviceTitleSelector = "a[title='Home']";
    private readonly lastNameInputSelector = "input[placeholder='Last Name']";
    private readonly firstNameInputSelector = "input[placeholder='First Name']";
    private readonly saveButtonLocator = "button[name='SaveEdit']";
    private readonly contactFullNameLabelLocator = "sfa-output-name-with-hierachy-icon-wrapper";


    constructor(private page: Page) {
    }

    async createNewContact(firstName: string, lastName: string) {
        await this.page.locator(this.contactsLink).first().click();
        logger.info("Clicked on Contacts link");
        await this.page.locator(this.newButtonLocator).first().click();
        logger.info("Clicked on New button");
        await this.page.locator(this.lastNameInputSelector).first().fill(lastName);
        logger.info("Filled last name");
        await this.page.locator(this.firstNameInputSelector).first().fill(firstName);
        logger.info("Filled first name");
        await this.page.locator(this.saveButtonLocator).first().click();
        logger.info("Clicked on Save button");
    }

    async expectServiceTitleToBeVisible() {
        await expect(this.page.locator(this.serviceTitleSelector).first()).toBeVisible({timeout: 120000});
        logger.info("Service title is visible");
    }
}
