"use client";

import { Card, CardContent } from "../ui/card";
import { Field, FieldLegend, FieldDescription, FieldSet, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Encryption(){
    return(
        <>
        <Card>
            <CardContent>
                <form>
                    <FieldSet>
                        <FieldLegend>Create Encryption Password</FieldLegend>
                        <FieldDescription>Remember this password to be able to access your notes.</FieldDescription>
                        <Field>
                            <FieldLabel>Password</FieldLabel>
                            <Input type="password" placeholder="********" />
                        </Field>
                        <Field>
                            <FieldLabel>Confirm Password</FieldLabel>
                            <Input type="password" placeholder="********" />
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