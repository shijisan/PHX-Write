import { deriveAesKey } from "./deriveAesKey";

export async function decryptString(encryptedContent: string, b64ContentIv: string, b64UserSalt: string) {

    function b64ToUint8(b64: string) {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
        return arr;
    }

    const passKey = sessionStorage.getItem("passKey");

    if (!encryptedContent || !b64ContentIv || !b64UserSalt || !passKey) {
        return;
    }

    const passKeyBuffer = b64ToUint8(passKey);
    const userSaltBuffer = b64ToUint8(b64UserSalt);
    const contentIvBuffer = b64ToUint8(b64ContentIv);

    const encryptedContentBuffer = b64ToUint8(encryptedContent);
    const aesKey = await deriveAesKey(passKeyBuffer, userSaltBuffer);

    if (!aesKey) {
        return;
    }

    try {
        
        const decryptedStringBuffer = await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: contentIvBuffer,
            },
            aesKey,
            encryptedContentBuffer,
        )

        const decoder = new TextDecoder();

        const decryptedStringText = decoder.decode(decryptedStringBuffer);

        return decryptedStringText;

    } catch (err) {
        console.error("Failed to decrypt", err);
        return null;
    }

}