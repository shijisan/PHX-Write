"use client";

import { Card, CardContent, CardFooter } from "../ui/card";
import { Field, FieldLegend, FieldDescription, FieldSet, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

export default function Encryption({ onSuccess }: { onSuccess?: (key: string) => void }) {
	const [form, setForm] = useState({
		passKey: "",
		confirmPasskey: "",
	});
	const [errorMsg, setErrorMsg] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!form.passKey || !form.confirmPasskey) {
			setErrorMsg("Fields incomplete!");
			return;
		}

		if (form.confirmPasskey !== form.passKey) {
			setErrorMsg("Fields do not match!");
			return;
		}

		try {
			const res = await fetch("/api/passKey", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ passKey: form.passKey }),
			});

			if (res.ok) {
				sessionStorage.setItem("passKey", form.passKey);
				onSuccess?.(form.passKey); // ✅ notify parent immediately
			} else {
				setErrorMsg("Failed to confirm passkey");
			}
		} catch (err) {
			console.error("Failed to confirm passkey", err);
			setErrorMsg("Failed to confirm passkey");
		}
	};

    return (
        <>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldSet>
                            <FieldLegend>Create Encryption Passkey</FieldLegend>
                            <FieldDescription>Remember this passkey to be able to access your notes.</FieldDescription>
                            <Field>
                                <FieldLabel>Passkey</FieldLabel>
                                <Input type="password" placeholder="********" name="passKey" value={form.passKey} onChange={handleChange} />
                            </Field>
                            <Field>
                                <FieldLabel>Confirm Passkey</FieldLabel>
                                <Input type="password" placeholder="********" name="confirmPasskey" value={form.confirmPasskey} onChange={handleChange} />
                            </Field>
                            <Button type="submit">
                                Submit
                            </Button>
                        </FieldSet>
                    </form>
                </CardContent>
                {errorMsg !== "" && (
                    <CardFooter>
                        <p
                        className="text-center w-full text-xs"
                        >
                            {errorMsg}
                        </p>
                    </CardFooter>
                )}

            </Card>
        </>
    )
}