"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

// Debugging: Check the environment variable
console.log('NEXT_PUBLIC_NEXTAUTH_URL:', process.env.NEXT_PUBLIC_NEXTAUTH_URL);

export default function Auth() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState(""); // Add username state
    const [authRegister, setAuthRegister] = useState(true);

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username, password }),
            });
    
            if (res.ok) {
                console.log("Registration successful, signing in...");
    
                await signIn("credentials", { email, password, redirect: true });
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
        }
    };
    
    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        await signIn("credentials", { email, password, redirect: true });
    
    };
    

    return (
        <>
            <main className="min-h-screen w-full flex justify-center items-center">
                <form onSubmit={authRegister ? handleRegisterSubmit : handleLoginSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />

                    {authRegister && (
                        <>
                            <input
                                type="text"
                                value={username}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </>
                    )}

                    {!authRegister && (
                        <input
                            type="password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    )}

                    <button type="submit">{authRegister ? "Sign Up" : "Sign In"}</button>

                    <button type="button" onClick={() => signIn("google")}>
                        Sign In With Google
                    </button>

                    <button
                        type="button"
                        onClick={() => setAuthRegister(!authRegister)}
                    >
                        Switch To {authRegister ? "Login" : "Sign Up"}
                    </button>
                </form>
            </main>
        </>
    );
}
