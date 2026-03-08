let CryptoJSUtil = require('crypto-js');
let fs = require('fs');
let path = require('path');

const SALT = process.env.SALT || 'default_salt_value';
const currentDir = __dirname;

// Go one level up to the root directory
const srcDir = path.resolve(currentDir, '..');

//change the config folder
const configDir = path.resolve(srcDir, 'config');
const envFilePath = path.resolve(configDir, '.env');

if (process.env.NODE_ENV) {
    const envFilePathWithEnv = path.resolve(configDir, `.env.${process.env.NODE_ENV}`);
}

console.log("ENV FILE PATH ", envFilePath);

export function encryptEnvFile() {
    //Read the .env file
    const envFileContent = fs.readFileSync(envFilePath, 'utf-8');
    const lines = envFileContent.split('\n');

    //Encrypt each line and store in an array
    const encryptedLines = lines.map(line => {
        console.log("Processing line: ", line);
        if (line.trim() === '' || line.startsWith('#')) {
            return line; // Skip empty lines and comments
        }
        const [key, value] = line.split('=');
        if (value) {
            const encryptedValue = CryptoJSUtil.AES.encrypt(value, SALT).toString();
            return `${key}=${encryptedValue}`;
        }
        return line; // Return the line as is if it doesn't contain a key-value pair        
    });
    //join the line and write to a new file back .env file
    const updatedEnvFileContent = encryptedLines.join('\n');
    fs.writeFileSync(envFilePath, updatedEnvFileContent, 'utf-8');
    console.log(`Encrypted .env file has been saved to ${envFilePath}`);

}

export function decryptEnvFile() {
    const envFileContent = fs.readFileSync(envFilePath, 'utf-8');
    const lines = envFileContent.split('\n');
    const decryptedLines = lines.map(line => {
        const [key, value] = line.split('=');
        if (value) {
            try {
                const decryptedValue = CryptoJSUtil.AES.decrypt(value, SALT).toString(CryptoJSUtil.enc.Utf8);
                return `${key}=${decryptedValue}`;
            } catch (error) {
                console.error(`Error decrypting value for key ${key}:`, error);
                return line; // Return the original line if decryption fails
            }
        }
        return line; // Return the line as is if it doesn't contain a key-value pair

        const updatedEnvFileContent = decryptedLines.join('\n');
        fs.writeFileSync(envFilePath, updatedEnvFileContent, 'utf-8');
        console.log(`Decrypted .env file has been saved to ${envFilePath}`);
    });
}




