"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGoogle, FaExchangeAlt } from "react-icons/fa";

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
            <main className="w-full flex justify-center items-center">
                <div className="min-h-screen hero-bg-2 w-screen flex justify-center items-center md:p-0 p-4">
                    <form className="max-w-lg md:p-8 p-4 relative z-10 bg-neutral-700/75" onSubmit={authRegister ? handleRegisterSubmit : handleLoginSubmit}>
                        <h1 className="text-3xl font-medium poppins">{authRegister ? "Create Account" : "Use Existing Account"}</h1>
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

                        <button className="bg-orange-500" type="submit">{authRegister ? "Sign Up" : "Sign In"}</button>

                        <button className="inset-ring-1 bg-black/50" type="button" onClick={() => signIn("google")}>
                            <FaGoogle className="me-2 inline-flex" />
                            Sign In With Google
                        </button>

                        <button
                            className="inset-ring-1 bg-black/50"
                            type="button"
                            onClick={() => setAuthRegister(!authRegister)}
                        >
                            <FaExchangeAlt className="me-2 inline-flex" /> Switch To {authRegister ? "Login" : "Sign Up"}
                        </button>
                    </form>
                </div>

            </main>
        </>
    );
}
