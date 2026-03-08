let CyptoJSUtil = require('crypto-js');

const SALT = process.env.SALT || 'default_salt_value';

export function encrypt(text: string){
    const ciphertext = CyptoJSUtil.AES.encrypt(text, SALT).toString();
    return ciphertext;
}

export function decrypt(ciphertext: string){
    const bytes = CyptoJSUtil.AES.decrypt(ciphertext, SALT);
    const originalText = bytes.toString(CyptoJSUtil.enc.Utf8);
    return originalText;
}