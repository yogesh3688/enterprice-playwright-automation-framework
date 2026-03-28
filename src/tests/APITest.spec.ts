import {test,expect} from "@playwright/test";

test("API Test One", async ({request}) => {
    const response = await request.get("https://jsonplaceholder.typicode.com/posts/1");
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
});

test("API Test Two", async ({page}) => {
    const context = page.request;
    const response = await (await context.get("/users")).json();
    console.log(response);
    for (const user of response) {
        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("name");
        expect(user).toHaveProperty("company");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("phone");
        expect(user).toHaveProperty("zip");
        expect(user).toHaveProperty("state");
        expect(user).toHaveProperty("photo");
    

    }
});