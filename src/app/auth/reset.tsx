import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Config } from "@/lib/config";
import { cn } from "@/lib/utils";
import axios from "axios";
import { CircleCheckBig } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";


export default function ResetPage() {

    const [email, setEmail] = useState("");
    const [linkSent, setLinkSent] = useState(false);

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${Config.backend_url}/auth/reset`, {
                email
            });
            setLinkSent(true);
        }
        catch(err) {
            toast.error("Something went wrong! Try Again!")
        }
    }

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center text-accent-foreground font-bold text-2xl">
                    <div className="text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <img src="/vite.svg" alt="Smartmail Logo" />
                    </div>
                    SmartMail AI
                </a>
                <div className={cn("flex flex-col gap-6")}>
                    {
                        linkSent
                            ?
                            <Card>
                                <CardContent>
                                    <div className="flex items-center justify-center flex-col gap-3">

                                        <CircleCheckBig className="text-primary" size={50} />
                                        <h2 className="text-xl text-balance text-center text-primary">Password Reset Link Sent!</h2>
                                        <p className="text-sm text-balance text-center text-accent-foreground">We've sent you an email with a password reset link. It should arrive in a few moments. Don't forget to check your spam or junk folder! </p>
                                    </div>
                                </CardContent>
                            </Card>
                            :
                            <Card>
                                <CardHeader className="text-center">
                                    <CardTitle className="text-xl">Forgot Password?</CardTitle>
                                    <CardDescription>
                                        We'll send Password Reset Link to your email
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handlePasswordReset}>
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="m@example.com"
                                                    value={email}
                                                    onChange={(e) => { setEmail(e.target.value) }}
                                                    required
                                                />
                                            </Field>
                                            <Field>
                                                <Button type="submit">Send Passowrd Reset Link</Button>
                                            </Field>
                                        </FieldGroup>
                                    </form>
                                </CardContent>
                            </Card>
                    }
                </div>
            </div>
        </div>
    )
}
