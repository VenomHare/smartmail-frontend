import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Loader, Sparkles } from "lucide-react"
import { useState, type FormEvent } from "react"

const Onboarding = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

  }

  return (<>
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Welcome to Draft Pilot AI</CardTitle>
            <CardDescription>Let's get your profile set up in just a few seconds</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">This will be used in your email signatures</p>
              </div>

              <Button type="submit" className="w-full gap-2" disabled={isLoading || !fullName.trim()}>
                {isLoading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  <>
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>

  </>)
}
export default Onboarding