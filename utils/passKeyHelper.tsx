import { encryptString } from "@/lib/encryptString";

export async function setPasskey(passKeyInput: string) {
    const encryptedString = await encryptString("passKey-test", passKeyInput);
    sessionStorage.setItem("passKey", passKeyInput);

    return encryptedString;
}

// export async function testPasskey(passKeyInput: string, encryptedTest: string, salt: string, iv: string) {

//     const decrypted = await decryptString(encryptedTest, iv, salt, );

//     return decrypted === "passKey-test";
// }


export function clearKey() {
  sessionStorage.removeItem("passKey");
}
