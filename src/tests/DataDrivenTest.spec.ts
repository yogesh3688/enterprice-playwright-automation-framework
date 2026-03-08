import {test} from "@playwright/test";
import ct from "../data/contacts.json";
import logger from "../utils/LoggerUtils";

for (const contact of ct) {
    test(`Testing data driven with ${contact.first_name} ${contact.last_name}`, async ({ page }) => {
        logger.info(`Testing with contact: ${contact.first_name} ${contact.last_name}`);

    });
}