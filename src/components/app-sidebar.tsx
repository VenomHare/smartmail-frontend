
import { Input } from "./ui/input";
import { useEffect, useMemo, useState } from "react";
import { cn, scrollbar_hidden_css } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Button } from "./ui/button";
import { getHistory, setSidebar } from "@/store/sidebar";
import { ChevronLeft, ChevronRight, CreditCard, FileText, LogOut, Mail, Search, User } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DraftPilotLogo } from "./ui/draft-mail-icon";
import useAppDispatch from "./hooks/use-app-dispatch";
import { toast } from "sonner";
import { getUserData } from "@/store/auth";

export function AppSidebar() {
    const [searchQuery, setSearchQuery] = useState("")

    const { open, history } = useSelector((state: RootState) => state.sidebar);
    const { user } = useSelector((state: RootState) => state.userdata);

    const filteredMails = useMemo(() => history.filter((mail) => mail.subject.toLowerCase().includes(searchQuery.toLowerCase())), [searchQuery]);

    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();

    useEffect(() => {
        if (history.length == 0) {
            appDispatch(getHistory());
        }
        if (user == undefined) {
            appDispatch(getUserData());
        }
    }, [history.length, user])

    const getPlanBadge = (plan: string) => {
        switch (plan) {
            case "gold":
                return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Gold</Badge>
            case "platinum":
                return <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30">Platinum</Badge>
            default:
                return <Badge variant="secondary">Free</Badge>
        }
    }

    const redirectToMail = (uuid: string) => {
        setSidebar(false);
        if (window.location.pathname !== `/mail/${uuid}`) {
            toast("Redirecting!")
            window.location.href = `/mail/${uuid}`;
        }
    }

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300 animate-slide-left-right",
                !open ? "hidden md:block w-16" : "w-64",
            )}
        >
            <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
                    <Link to="/" className="flex items-center gap-3">
                        <DraftPilotLogo className="h-8 w-8 shrink-0" />
                        {open && <span className="text-lg font-semibold text-sidebar-foreground truncate">Draft Pilot</span>}
                    </Link>
                    {
                        open &&
                        <Button variant="ghost" size="icon" onClick={() => { dispatch(setSidebar(!open)) }} className="h-8 w-8 shrink-0">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    }
                </div>

                {/* Search */}
                {(open && user) && (
                    <div className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search mails..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 bg-sidebar-accent border-sidebar-border"
                            />
                        </div>
                    </div>
                )}
                {
                    !open &&
                    <Button variant="ghost" size="icon" onClick={() => { dispatch(setSidebar(!open)) }} className="h-8 w-8 shrink-0 mx-auto my-2">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                }
                {/* Recent Mails */}
                {user !== undefined && (
                    <ScrollArea className="flex-1 px-2">
                        {open && (
                            <div className="px-2 py-2">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recent Mails</span>
                            </div>
                        )}
                        {open &&
                            <div className={cn("space-y-1 py-2 overflow-y-auto h-[70dvh]", scrollbar_hidden_css)}>
                                {filteredMails.length > 0
                                    ? filteredMails.map((mail) => (
                                        <div
                                            key={mail.uuid}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer active:cursor-grabbing",
                                                window.location.pathname === `/mail/${mail.uuid}`
                                                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                                            )}
                                            onClick={() => redirectToMail(mail.uuid)}
                                        >
                                            <Mail className="h-4 w-4 shrink-0" />
                                            <div className="flex-1 w-4 overflow-hidden">
                                                <span className="truncate">{mail.subject}</span>
                                            </div>
                                            {
                                                // open && mail.status !== "processed" && (
                                                //     <Loader className="h-3 w-3 animate-spin text-muted-foreground" />
                                                // )
                                            }
                                        </div>
                                    ))
                                    : open && (
                                        <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                                            {searchQuery ? "No mails found" : "No recent mails"}
                                        </div>
                                    )}
                            </div>
                        }
                    </ScrollArea>
                )}

                {/* Spacer for non-logged in users */}
                {!user && <div className="flex-1" />}

                {/* User Section */}
                <div className="border-t border-sidebar-border p-4">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={cn("w-full justify-start gap-3 h-auto py-2", !open && "justify-center px-2")}
                                >
                                    <Avatar className="h-8 w-8 shrink-0">
                                        <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.full_name} />
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            {user.full_name?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    {open && (
                                        <div className="flex flex-col items-start text-left">
                                            <span className="text-sm font-medium">{user.full_name}</span>
                                            <span className="text-xs text-muted-foreground">{getPlanBadge("platinum")}</span>
                                        </div>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel className="flex items-center justify-between">
                                    My Account
                                    {getPlanBadge("free")}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to="/drafts">
                                        <FileText className="mr-2 h-4 w-4" />
                                        Drafts
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/account">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/pricing">
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Upgrade
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className={cn("flex gap-2", !open && "flex-col")}>
                            <Button asChild variant="outline" size={!open ? "icon" : "sm"} className="flex-1 bg-transparent">
                                <Link to="/login">{!open ? <User className="h-4 w-4" /> : "Sign In"}</Link>
                            </Button>
                            {open && (
                                <Button asChild size="sm" className="flex-1">
                                    <Link to="/signup">Sign Up</Link>
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </aside>
    )
}