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

    const baseKey = await crypto.subtle.importKey(
        "raw",
        passKeyBuffer,
        "PBKDF2",
        false,
        ["deriveKey"],
    );

    const aesKey = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            hash: "SHA-256",
            salt: userSaltBuffer,
            iterations: 100000,
        },
        baseKey,
        { 
            name: "AES-GCM", 
            length: 256 
        },
        false,
        ["encrypt", "decrypt"],
        
    );

    const encryptContent = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: contentIvBuffer,
        },
        aesKey,
        contentBuffer
    );

    const encryptContentText = uint8ToB64(new Uint8Array(encryptContent));

    return {encryptContentText, userSaltText, contentIvText};
}