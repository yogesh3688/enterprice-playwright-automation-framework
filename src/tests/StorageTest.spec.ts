import { test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.beforeAll(() => {
    console.log("Before All");
});

test.beforeEach(() => {
    console.log("Before Each");
});

test.afterEach(() => {
    console.log("After Each");
})  

test.afterAll(() => {
    console.log("After All");
});

test.use({myFixture: async (use) => {
    console.log("Setting up fixture");
    
    console.log("Tearing down fixture");
    await use(myFixture);
}});

test("Testing local storage", async ({ page, myFixture}) => {
    console.log("Testing local storage");
});


test("Test Two", async ({ page }) => {
    console.log("Test Two");
});

test("Test Three", async ({ page }) => {
    console.log("Test Three");
});