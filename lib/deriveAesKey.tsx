export async function deriveAesKey(passKeyBuffer: Uint8Array, saltBuffer: Uint8Array) {

    if (!passKeyBuffer || !saltBuffer) return;

    // re-set passkeybuffer type to buffer to make typescript not error

    const passKeySource: BufferSource = new Uint8Array(passKeyBuffer);
    const saltSource: BufferSource = new Uint8Array(saltBuffer);

    try {
        const baseKey = await crypto.subtle.importKey(
            "raw",
            passKeySource,
            "PBKDF2",
            false,
            ["deriveKey"]
        );

        const aesKey = await crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                hash: "SHA-256",
                salt: saltSource,
                iterations: 100000,
            },
            baseKey,
            {
                name: "AES-GCM",
                length: 256,
            },
            false,
            ["encrypt", "decrypt"]
        );

        return aesKey;

    } catch (err) {
        console.error("Failed to derive key", err);
    }
}
