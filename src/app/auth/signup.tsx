import { SignupForm } from "@/components/signup-form";
import { Link } from "react-router";


export default function SignupPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center text-accent-foreground font-bold text-2xl">
          <div className="text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <img src="/testlogo3.svg" alt="Smartmail Logo" />
          </div>
          Draft Pilot AI
        </Link>
        <SignupForm />
      </div>
    </div>
  )
}
