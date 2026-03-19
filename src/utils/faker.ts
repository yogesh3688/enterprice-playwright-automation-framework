import {faker} from '@faker-js/faker';

export function generateFakeUser() {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        avatar: faker.image.avatar(),
    };
}

// console.log(generateFakeUser());