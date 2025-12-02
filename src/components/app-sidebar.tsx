import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux"
import { NavUser } from "./nav-user";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { Config } from "@/lib/config";
import type { MailHistoryItem } from "@/lib/types";

export function AppSidebar() {
    const { user } = useSelector((state: RootState) => state.userdata);
    const [history, setHistory] = useState<MailHistoryItem[]>([]);

    const { open } = useSidebar();
    useEffect(() => {
        const main = async () => {
            try {
                const { data } = await axios.get(`${Config.backend_url}/history`, {
                    withCredentials: true
                });
                if (Array.isArray(data)) {
                    setHistory(data);
                }
            }
            catch (err) {
                console.log("Failed to load Mail History")
            }
        }
        main();
    }, [])

    const redirectToMail = (uuid: string) => {
        if (!window.location.pathname.startsWith(`/mail/${uuid}`)) {
            window.location.href = `/mail/${uuid}`;
        }
    }

    return (
        <Sidebar collapsible={"icon"} variant={"sidebar"}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <a href="/">
                            <SidebarMenuButton className="py-6">
                                <img src="/testlogo3.svg" alt="logo" width={30} height={30} />
                                <span className="text-2xl font-bold text-foreground px-2">SmartMail AI</span>
                            </SidebarMenuButton>
                        </a>
                    </SidebarMenuItem>
                </SidebarMenu>

            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup title="Search">
                    {/* <SidebarGroupLabel>Search Mails</SidebarGroupLabel> */}
                    <SidebarMenuItem className="flex flex-row items-center gap-2">
                        <SidebarTrigger size={"lg"} />
                        {open &&
                            <Input className="mr-2" />
                        }
                    </SidebarMenuItem>
                </SidebarGroup>
                {
                    open &&
                    <SidebarGroup>
                        <SidebarGroupLabel>Recent Mails</SidebarGroupLabel>
                        {
                            history.map((mail) =>
                                <SidebarMenuItem className="flex flex-row-reverse items-center gap-2" key={mail.uuid}>
                                    <SidebarMenuButton className="truncate mr-5 mt-2" onClick={() => { redirectToMail(mail.uuid) }}>
                                        {mail.subject}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        }
                    </SidebarGroup>
                }
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{
                    avatar: user?.avatar_url || "",
                    plan: "Free Plan",
                    name: user?.full_name || ""
                }} />
            </SidebarFooter>
        </Sidebar>
    )
}