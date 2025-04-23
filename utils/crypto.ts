// utils/crypto.ts
import crypto from "crypto";

export const generateEncryptionKey = (encryptedKey: string, salt: string) => {
    return crypto.scryptSync(encryptedKey, salt, 32).toString("hex");
};


export const encryptText = (text: string, encryptionKey: string): string => {
    const iv = crypto.randomBytes(16); 
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(encryptionKey, "hex"), iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return iv.toString("hex") + ":" + encrypted;
};

export const decryptText = (encryptedText: string, encryptionKey: string): string => {
    const [ivHex, encryptedData] = encryptedText.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(encryptionKey, "hex"), iv);
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};

