import { deriveAesKey } from "./deriveAesKey";

export async function encryptString(rawContent: string, passKey: string) {

    if (!passKey || !rawContent) {
        return;
    }

    function uint8ToB64(bytes: Uint8Array) {
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        };
        return btoa(binary);
    };

    const encoder = new TextEncoder();
    const contentBuffer = encoder.encode(rawContent);
    const passKeyBuffer = encoder.encode(passKey);
    const saltBuffer = crypto.getRandomValues(new Uint8Array(16));
    const contentIvBuffer = crypto.getRandomValues(new Uint8Array(12));

    const contentIvText = uint8ToB64(contentIvBuffer);
    const saltText = uint8ToB64(saltBuffer);

    const aesKey = await deriveAesKey(passKeyBuffer, saltBuffer);

    if (!aesKey) {
        return;
    }

    try {
        const encryptContent = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: contentIvBuffer,
            },
            aesKey,
            contentBuffer
        );

        const encryptedContentText = uint8ToB64(new Uint8Array(encryptContent));

        return { encryptedContentText, saltText, contentIvText }; 
        
    } catch (err) {
        console.error("Failed to encrypt", err);
    }
}