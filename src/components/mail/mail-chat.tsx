import { cn } from "@/lib/utils"
import { MessageSquare, Send, Sparkles, User } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Badge } from "../ui/badge"
import { ScrollArea } from "../ui/scroll-area"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { Config } from "@/lib/config"
import useAppDispatch from "../hooks/use-app-dispatch"
import { updateChats } from "@/store/generation"

interface MailChatProps {
    mail_id: string,
    onSendMessage?: (message: string) => void
    className?: string
}

export const MailChat = ({
    mail_id,
    onSendMessage,
    className,
}: MailChatProps) => {
    const [input, setInput] = useState("")
    const scrollRef = useRef<HTMLDivElement>(null)
    const appDispatch = useAppDispatch();

    const { chats, remainingChats, processingChat } = useSelector((state: RootState) => state.generation);


    useEffect(() => {
        if (chats.length == 0) {
            appDispatch(updateChats(mail_id));
        }
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [chats])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim() && onSendMessage && remainingChats > 0) {
            onSendMessage(input.trim())
            setInput("")
        }
    }

    return (
        <div className={cn("flex h-full flex-col bg-card rounded-lg border border-border", className)}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <span className="font-semibold">AI Chat</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                    {remainingChats}/{Config.MAX_CHATS} chats left
                </Badge>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 h-2" ref={scrollRef}>
                <div className="space-y-4">
                    {chats.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                            <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
                            <p className="font-medium">Chat with AI</p>
                            <p className="text-sm">Ask questions or request changes to your email</p>
                        </div>
                    )}
                    {chats.map((message) => (
                        <div key={message.id} className={cn("flex gap-3", message.role === "user" && "flex-row-reverse")}>
                            <Avatar className="h-8 w-8 shrink-0">
                                {message.role === "assistant" ? (
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        <Sparkles className="h-4 w-4" />
                                    </AvatarFallback>
                                ) : (
                                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                                        <User className="h-4 w-4" />
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <div
                                className={cn(
                                    "max-w-[80%] w-fit sm:max-w-[75vw] wrap-break-word rounded-lg px-4 py-2 overflow-hidden",
                                    message.role === "assistant"
                                        ? "bg-secondary text-secondary-foreground"
                                        : "bg-primary text-primary-foreground",
                                )}
                                style={{
                                    wordBreak: "break-word",
                                    overflowWrap: "break-word",
                                }}
                            >
                                <p className="text-sm whitespace-pre-wrap wrap-break-word overflow-hidden">{message.content}</p>
                            </div>
                        </div>
                    ))}
                    {processingChat && (
                        <div className="flex gap-3">
                            <Avatar className="h-8 w-8 shrink-0">
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    <Sparkles className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="bg-secondary rounded-lg px-4 py-3">
                                <div className="flex gap-1">
                                    <span
                                        className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                                        style={{ animationDelay: "0ms" }}
                                    />
                                    <span
                                        className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                                        style={{ animationDelay: "150ms" }}
                                    />
                                    <span
                                        className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                                        style={{ animationDelay: "300ms" }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-border p-4">
                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={remainingChats > 0 ? "Ask AI to modify your email..." : "No chats remaining today"}
                        disabled={remainingChats <= 0 || processingChat}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={!input.trim() || remainingChats <= 0 || processingChat}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                {remainingChats <= 0 && (
                    <p className="mt-2 text-xs text-muted-foreground text-center">
                        <a href="/pricing" className="text-primary hover:underline">
                            Upgrade
                        </a>{" "}
                        for more chats
                    </p>
                )}
            </form>
        </div>
    )
}
