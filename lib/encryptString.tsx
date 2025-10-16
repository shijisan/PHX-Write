import { deriveAesKey } from "./deriveAesKey";

export async function encryptContent(rawContent: string, passKey: string) {

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
    const userSaltBuffer = crypto.getRandomValues(new Uint8Array(16));
    const contentIvBuffer = crypto.getRandomValues(new Uint8Array(12));

    const contentIvText = uint8ToB64(contentIvBuffer);
    const userSaltText = uint8ToB64(userSaltBuffer);

    const aesKey = await deriveAesKey(passKeyBuffer, userSaltBuffer);

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

        const encryptContentText = uint8ToB64(new Uint8Array(encryptContent));

        return { encryptContentText, userSaltText, contentIvText };

    } catch (err) {
        console.error("Failed to encrypt", err);
    }
}