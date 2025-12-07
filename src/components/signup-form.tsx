import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Config } from "@/lib/config"
import axios from "axios"
import { Link, useSearchParams } from "react-router"
import { toast } from "sonner"
import { Label } from "./ui/label"
import { Eye, EyeOff, Loader } from "lucide-react"
import { Checkbox } from "./ui/checkbox"

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [params] = useSearchParams();
    const redirect = params.get("redirect") || `${Config.frontend_url}/`;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [privacy, setPrivacy] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const signupWithPassword = async (email: string, password: string) => {
        try {
            if (password.length < 8) {
                toast.warning("Password too short!");
                return                
            }
            if (password !== confirmPassword) {
                toast.warning("Passwords doesn't match!");
                return
            }
            if (!agreeTerms) {
                toast.warning("Agree to Terms and condition to continue!");
                return
            }
            if (!privacy) {
                toast.warning("Agree to Privacy Policies to continue!");
                return 
            }
            setIsLoading(true);
            await axios.post(`${Config.backend_url}/auth/signup?redirect=${redirect}`, { email, password }, {
                withCredentials: true
            });
            window.location.href = redirect;
        }
        catch (err) {
            console.log(err);
            toast.error("Incorrect Email or Password");
            return
        }
        finally {
            setIsLoading(false);
        }

    }


    const handleGoogleAuth = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${Config.backend_url}/auth/google`, {
                withCredentials: true
            });
            if (!data.url) {
                toast.error("something went wrong! Try Again");
                return
            }
            window.location.href = data.url;
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Register New Account</CardTitle>
                    <CardDescription>
                        Signup with your Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        signupWithPassword(email, password);
                    }}>
                        <FieldGroup>
                            <Field>
                                <Button variant="outline" type="button" onClick={handleGoogleAuth} >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Signup with Google
                                </Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>
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

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => {setConfirmPassword(e.target.value)}}
                                        required
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} />
                                    <Label htmlFor="terms" className="text-sm leading-tight">
                                        I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service.</Link> 
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="privacy" checked={privacy} onCheckedChange={(checked) => setPrivacy(checked as boolean)} />
                                    <Label htmlFor="privacy" className="text-sm leading-tight">
                                        I have read <Link to="/privacy" className="text-primary hover:underline">Privacy Policy.</Link>
                                        </Label>
                                </div>

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                                            Creating account...
                                        </>
                                    ) : (
                                        "Create account"
                                    )}
                                </Button>
                            </Field>
                            <Field>
                                <FieldDescription className="text-center">
                                    Already have an account? <a href="/login">Log in</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
