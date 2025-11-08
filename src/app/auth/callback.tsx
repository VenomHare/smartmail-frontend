import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

const CallbackPage = () => {

    const [error, setError] = useState(false);
    const [params] = useSearchParams();
    const code = params.get("code");


    useEffect(() => { loginRequest() }, [])

    const loginRequest = async () => {
        if (!code) {
            return
        }
        try {
            const { data, error } = await supabase.auth.exchangeCodeForSession(code);
            if (error) {
                alert("something went wrong! Try Again");
                return
            }
            console.log(data);
            // navigate("/");
        }
        catch (err) {
            console.log(err);
            setError(true);
        }
    }

    return (<>
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center text-accent-foreground font-bold text-2xl">
                    <div className="text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <img src="/vite.svg" alt="Smartmail Logo" />
                    </div>
                    SmartMail AI
                </a>
                <div className={cn("flex flex-col gap-6")}>
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Welcome back</CardTitle>
                            <CardDescription>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {
                                error
                                    ? <>
                                        <div className="flex flex-col items-center gap-3">
                                            <p className="text-xl font-semibold text-accent-foreground text-center">
                                                Login Failed.
                                            </p>
                                            <Link to={"/login"}>
                                                <Button variant={"secondary"}>Retry</Button>
                                            </Link>
                                        </div>
                                    </>
                                    :
                                    <div className="flex items-center justify-center gap-3">
                                        <LoaderIcon
                                            role="status"
                                            aria-label="Loading"
                                            className={cn("size-4 animate-spin text-accent")}
                                        />
                                        <p className="text-xl font-semibold text-accent-foreground">
                                            Logging you in..
                                        </p>
                                    </div>
                            }
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </>)
}

export default CallbackPage