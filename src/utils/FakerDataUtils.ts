import {faker} from '@faker-js/faker';

import path from 'path';
import * as fs from 'fs';
import * as createCSVWriter from 'csv-writer';

interface UserData {
    name : string;
    email : string;
    password : string;
    userid : string;
    age : number;
    gender : string;
    address : string;
}

// function to generate fake user data
const generateFakeUser = (): UserData =>{
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        userid: faker.string.uuid(),
        age: faker.number.int({ min: 18, max: 80 }),
        gender: faker.person.sex(),
        address: faker.location.streetAddress(),
    };
}

// function to generate an array fake user data
export const generateFakeUsers = (numRecords: number): UserData[] => {
    const testData: UserData[] = faker.helpers.multiple(generateFakeUser, { count:numRecords });
    return testData;
}

const currentDir = __dirname;

//Go to pne level up from current directory
// const dataDir = path.join(currentDir, "..", "data");
const scrDir = path.resolve(currentDir,"..");

// change the config folder
const testdataDir = path.resolve(scrDir, "data");

// function to export fake user data to json file
export const exportFakeUsersToJson = (data: UserData[], fileName: string) => {
    fs.writeFileSync('${testdataDir}\\${fileName}', JSON.stringify(data, null, 2));
    console.log(`Fake user data exported to ${testdataDir}\\${fileName} successfully.`);
}

// function to export fake user data to csv file
export const exportFakeUsersToCsv = (data: UserData[], fileName: string) => {
    const csvWriter = createCSVWriter.createObjectCsvWriter({
        path: `${testdataDir}\\${fileName}`,
        header: [
            { id: 'name', title: 'Name' },
            { id: 'email', title: 'Email' },
            { id: 'password', title: 'Password' },
            { id: 'userid', title: 'UserID' },
            { id: 'age', title: 'Age' },
            { id: 'gender', title: 'Gender' },
            { id: 'address', title: 'Address' },
        ],
    });

    csvWriter.writeRecords(data).then(() => {
        console.log(`Fake user data exported to ${testdataDir}\\${fileName} successfully.`);
    }).catch((error: Error) => {
        console.error('Error exporting fake user data to CSV:', error);
    });

    

