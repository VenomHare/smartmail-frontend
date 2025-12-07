import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Copy, Loader, Mail, Plus, Send } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { ScrollArea } from "../ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import useAppDispatch from "../hooks/use-app-dispatch"
import { getLinkedAccounts } from "@/store/auth"
import { Config } from "@/lib/config"
import axios from "axios"


interface MailActionsProps {
    html?: string
    onSendDraft?: (accountId: string) => Promise<void>
}

export function MailActions({ html, onSendDraft }: MailActionsProps) {
    const [sendingTo, setSendingTo] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const { linkedAccounts } = useSelector((state: RootState) => state.userdata);
    const appDispatch = useAppDispatch();

    useEffect(() => {
        if (linkedAccounts.length == 0) {
            appDispatch(getLinkedAccounts());
        }
    }, [])

    const handleCopyToClipboard = async () => {
        if (!html) return

        try {
            // Create a blob with the HTML content
            const blob = new Blob([html], { type: "text/html" })
            const clipboardItem = new ClipboardItem({ "text/html": blob })
            await navigator.clipboard.write([clipboardItem])

            toast.success(
                "Copied to clipboard! Paste this in your email compose box"
            )
        } catch {
            toast.error(
                "Copy failed! Please try again or use another browser"
            )
        }
    }

    const handleSendDraft = async (accountId: string) => {
        if (!onSendDraft) return

        setSendingTo(accountId)
        try {
            await onSendDraft(accountId)
            toast.success(
                "Draft sent! Check your Gmail drafts folder"
            )
            setDialogOpen(false)
        } catch {
            toast.error("Failed to send draft! Please try again")
        } finally {
            setSendingTo(null)
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

    return (
        <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleCopyToClipboard} disabled={!html} className="gap-2 bg-transparent">
                <Copy className="h-4 w-4" />
                Copy to Clipboard
            </Button>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button disabled={!html} className="gap-2">
                        <Send className="h-4 w-4" />
                        Draft to Gmail
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Send Draft to Gmail</DialogTitle>
                        <DialogDescription>Choose a linked Gmail account to save this email as a draft</DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="max-h-[300px]">
                        <div className="space-y-2">
                            {linkedAccounts.length > 0 ? (
                                linkedAccounts.map((account) => (
                                    <div
                                        key={account.mail}
                                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={"/placeholder.svg"} alt={account.mail} />
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {/* {account.charAt(0).toUpperCase()} */}
                                                    {account.mail[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium">{account.mail}</span>
                                        </div>
                                        <Button size="sm" onClick={() => handleSendDraft(account.mail)} disabled={sendingTo === account.mail}>
                                            {sendingTo === account.mail ? <Loader className="h-4 w-4 animate-spin" /> : "Send Draft"}
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <div className="py-8 text-center text-muted-foreground">
                                    <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>No linked accounts</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <Button variant="outline" onClick={initateNewAccountLink} className="w-full gap-2 mt-2 bg-transparent">
                        <Plus className="h-4 w-4" />
                        Link New Gmail Account
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}
