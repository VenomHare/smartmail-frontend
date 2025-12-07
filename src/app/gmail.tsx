import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { DraftPilotLogo } from "@/components/ui/draft-mail-icon"
import { Config } from "@/lib/config"
import axios from "axios"
import { AlertCircle, CheckCircle, Loader, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { toast } from "sonner"

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
  const [status, setStatus] = useState<GmailStatus>("loading");

  const handleClose = () => {
    window.close()
  }

  const handleRetry = async () => {
    try {
      setStatus("loading");
      const { data } = await axios.get(`${Config.backend_url}/gmail/add`, {
        withCredentials: true
      });
      window.location.href = data.url;
    }
    catch (err) {
      toast.error("Failed to initiate new Account link! Try Again Later.")
      setStatus("error");
    }
  }

  useEffect(() => {
    const makeConnection = async () => {
      try {
        await axios.post(`${Config.backend_url}/gmail/creds`, { code }, { withCredentials: true });
        setStatus("success");
      }
      catch {
        setStatus("error")
      }
    }
    makeConnection();
  }, [code])

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-md">
        {/* Logos */}
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-card border border-border flex items-center justify-center">
            <DraftPilotLogo className="h-10 w-10" />
          </div>
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="h-16 w-16 rounded-2xl bg-card border border-border flex items-center justify-center">
            <GmailLogo className="h-10 w-10" />
          </div>
        </div>

        {/* Status Content */}
        <div className="space-y-4">
          {status === "loading" && (
            <>
              <div className="flex items-center justify-center">
                <Loader className="h-8 w-8 animate-spin text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Linking Gmail Account</h2>
              <p className="text-muted-foreground">Please wait while we connect your Gmail account to Draft Pilot AI</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold">Successfully Linked!</h2>
              <p className="text-muted-foreground">
                Your Gmail account has been connected. You can now send drafts directly to your inbox.
              </p>
              <Button onClick={handleClose} className="mt-4">
                Close Window
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <h2 className="text-2xl font-semibold">Linking Failed</h2>
              <p className="text-muted-foreground">
                We couldn't connect your Gmail account. Please try again or contact support if the issue persists.
              </p>
              <div className="flex gap-2 justify-center mt-4">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleRetry}>Try Again</Button>
              </div>
            </>
          )}
        </div>
      </div>

    </>
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