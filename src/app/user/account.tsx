import { AppSidebar } from "@/components/app-sidebar"
import useAppDispatch from "@/components/hooks/use-app-dispatch"
import Navbar from "@/components/navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Config } from "@/lib/config"
import { getLinkedAccounts } from "@/store/auth"
import type { RootState } from "@/store/store"
import axios from "axios"
import { Loader, Mail, Plus, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router"
import { toast } from "sonner"

// Mock user data
const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "",
    plan: "free" as const,
    linkedAccounts: [
        { id: "1", email: "john@gmail.com", linkedAt: "2024-01-10" },
        { id: "2", email: "john.doe@gmail.com", linkedAt: "2024-01-12" },
    ],
}

export default function AccountPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: mockUser.name,
        email: mockUser.email,
    })
    const [notifications, setNotifications] = useState({
        emailUpdates: true,
        marketingEmails: false,
    })

    const { linkedAccounts } = useSelector((state: RootState) => state.userdata)
    const appDispatch = useAppDispatch();

    useEffect(() => {
        if (linkedAccounts.length == 0) {
            appDispatch(getLinkedAccounts());
        }
    }, [])

    const handleSaveProfile = async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)
        toast("Your changes have been saved successfully.")
    }

    const handleUnlinkAccount = async (accountId: string) => {
        toast("The Gmail account has been disconnected.")
    }

    const getPlanInfo = (plan: string) => {
        switch (plan) {
            case "gold":
                return { label: "Gold", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30" }
            case "platinum":
                return { label: "Platinum", color: "bg-purple-500/10 text-purple-500 border-purple-500/30" }
            default:
                return { label: "Free", color: "bg-secondary text-secondary-foreground" }
        }
    }

    const initateNewAccountLink = async () => {
        try {
            const { data } = await axios.get(`${Config.backend_url}/gmail/add`, {
                withCredentials: true
            });
            window.open(data.url, "_blank");
        }
        catch (err) {
            toast.error("Failed to initiate new Account link! Try Again Later.")
        }
    }

    const planInfo = getPlanInfo(mockUser.plan)

    return (
        <>
            <Navbar />
            <AppSidebar />
            <div className="container max-w-4xl mx-auto py-8 px-4">
                <div className="space-y-8">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold">Account Settings</h1>
                        <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
                    </div>

                    {/* Profile Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>Update your personal information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* <div className="flex items-center gap-6">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                                        {mockUser.name.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <Button variant="outline" size="sm">
                                        Change Avatar
                                    </Button>
                                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max 2MB.</p>
                                </div>
                            </div> */}

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        disabled
                                        value={formData.email}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSaveProfile} disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Subscription Section */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Subscription</CardTitle>
                                    <CardDescription>Manage your subscription and billing</CardDescription>
                                </div>
                                <Badge className={planInfo.color}>{planInfo.label}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                                <div>
                                    <p className="font-medium">Current Plan: {planInfo.label}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {mockUser.plan === "free"
                                            ? "1 mail/day, 3 chats/day, 1 Gmail account"
                                            : mockUser.plan === "gold"
                                                ? "Unlimited mails, 20 chats/day, 10 Gmail accounts"
                                                : "Unlimited everything"}
                                    </p>
                                </div>
                                <Button asChild variant={mockUser.plan === "free" ? "default" : "outline"}>
                                    <Link to="/pricing">{mockUser.plan === "free" ? "Upgrade" : "Manage Plan"}</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Linked Gmail Accounts */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Linked Gmail Accounts</CardTitle>
                            <CardDescription>Manage your connected Gmail accounts for sending drafts</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {linkedAccounts.map((account) => (
                                <div key={account.mail} className="flex items-center justify-between p-4 rounded-lg border border-border">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                                            <Mail className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{account.mail}</p>
                                            <p className="text-xs text-muted-foreground">
                                                Linked on {new Date(account.linkedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => handleUnlinkAccount(account.mail)}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}

                            <Button
                                variant="outline"
                                className="w-full gap-2 bg-transparent"
                                onClick={initateNewAccountLink}
                            >
                                <Plus className="h-4 w-4" />
                                Link New Gmail Account
                            </Button>

                            {mockUser.plan === "free" && mockUser.linkedAccounts.length >= 1 && (
                                <p className="text-sm text-muted-foreground text-center">Upgrade to link more accounts</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
