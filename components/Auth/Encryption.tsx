"use client";

import { Card, CardContent } from "../ui/card";
import { Field, FieldLegend, FieldDescription, FieldSet, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

export default function Encryption(){

    const [form, setForm] = useState({
        passKey: "",
        confirmPasskey: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        if (!form.passKey || !form.confirmPasskey) {
            console.error("Fields incomplete");
        }

        if (form.confirmPasskey !== form.passKey) {
            console.error("Fields do not match");
            return;
        }

        const res = await fetch("/api/passKey", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(
                {
                    passKey: form.passKey,
                },
            ),
        });

        if (res.ok) {
            sessionStorage.setItem("passKey", form.passKey);
        }

        
    }

    return(
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
        </Card>
        </>
    )
}