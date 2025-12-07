import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { DraftPilotLogo } from "@/components/ui/draft-mail-icon";
import { Config } from "@/lib/config";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Loader, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const CallbackPage = () => {

    const [error, setError] = useState(false);
    const [params] = useSearchParams();
    const code = params.get("code");
    const navigate = useNavigate();

    useEffect(() => { loginRequest() }, [])

    const loginRequest = async () => {
        if (!code) {
            return
        }
        try {
            await axios.post(`${Config.backend_url}/auth/callback`, {
                code
            }, {
                withCredentials: true
            })
            navigate("/");
        }
        catch (err) {
            console.log(err);
            setError(true);
        }
    }

    return (<>
        <div className="min-h-screen bg-background flex flex-col">

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="flex flex-col items-center justify-center text-center space-y-6">
                    <div className="relative">
                        <DraftPilotLogo className="h-20 w-20" />
                        <div className={cn(
                            "absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center",
                            error && "bg-red-500"
                        )}>
                            {
                                error
                                    ? <X className="h-4 w-4 text-primary-foreground" />
                                    : <Loader className="h-4 w-4 animate-spin text-primary-foreground" />
                            }
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">
                            {
                                error
                                    ? <>
                                        Failed while Authenticating.
                                    </>
                                    : <>
                                        Signing you in...
                                    </>
                            }
                        </h2>
                        {
                            !error &&
                            <p className="text-muted-foreground">
                                Please wait while we complete the authentication
                            </p>
                        }
                        {
                            error && <Button variant={"outline"} className="mt-4" onClick={() => {navigate("/login")}}>
                                Try Again
                            </Button>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    </>)
}

export default CallbackPage