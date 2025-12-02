import { AppSidebar } from "@/components/app-sidebar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Config } from "@/lib/config"
import axios from "axios"
import { AlertCircle, CheckCircle2, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"

type GmailStatus = "loading" | "success" | "error"

const GmailLink = () => {
  return (
    <>
      <AppSidebar />

      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <GmailConnectCard />
      </div>
    </>
  )
}

const GmailConnectCard = () => {
  const [params] = useSearchParams()
  const code = params.get("code");

  const [screen, setScreen] = useState<GmailStatus>("loading");

  useEffect(() => {
    const makeConnection = async () => {
      try {
        await axios.post(`${Config.backend_url}/gmail/creds`, { code }, { withCredentials: true });
        setScreen("success");
      }
      catch {
        setScreen("error")
      }
    }
    makeConnection();
  }, [code])

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <CardTitle className="text-2xl">Connect Gmail</CardTitle>
        <CardDescription>
          Securely link Gmail so Draftfolio can help you manage emails.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <img
              src="/testlogo3.svg"
              alt="DraftPilot logo"
              className="h-7 w-7"
            />
          </div>
          <Plus className="h-6 w-6 text-muted-foreground" />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <GmailLogo className="h-7 w-7" />
          </div>
        </div>

        {screen == "loading" && (
          <div className="flex flex-col items-center gap-3">
            <Spinner className="h-5 w-5 text-accent" />
            <p className="text-sm font-medium text-accent-foreground">
              DraftPilot is connecting to Gmail…
            </p>
          </div>
        )}

        {screen == "success" && (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            <p className="text-sm font-medium text-accent-foreground">
              You&apos;re all set! DraftPilot is now connected to Gmail.
            </p>
          </div>
        )}

        {screen == "error" && (
          <div className="flex flex-col items-center gap-3">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <p className="text-sm font-medium text-accent-foreground">
              We couldn&apos;t connect to Gmail. Please go back and try again.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const GmailLogo = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="52 42 88 66" className={className}>
    <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
    <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
    <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
    <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
    <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
  </svg>
)

export default GmailLink