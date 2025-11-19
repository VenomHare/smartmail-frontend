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

export function AppSidebar() {
    const { user } = useSelector((state: RootState) => state.userdata);

    const { open } = useSidebar();

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
                            <Input className="mr-2"/>
                        }
                    </SidebarMenuItem>
                </SidebarGroup>
                {
                    open &&
                    <SidebarGroup>
                        <SidebarGroupLabel>Recent Mails</SidebarGroupLabel>
                        {
                            Array.from({ length: 10 }).map((_, i) =>
                                <SidebarMenuItem className="flex flex-row-reverse items-center gap-2">
                                    <SidebarMenuButton className="truncate mr-5 mt-2">
                                        {
                                            i % 2 == 0 ?
                                                "Unleash the Ultimate Upgrade: Limited Edition LGI Modz Patch is Here!"
                                                :
                                                "Confirm Your Email Address for SmartMail AI"
                                        }
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
                    email: user?.username || "",
                    name: user?.full_name || ""
                }} />
            </SidebarFooter>
        </Sidebar>
    )
}