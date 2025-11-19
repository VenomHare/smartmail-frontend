import type React from "react"
import { ThemeProvider } from "./theme-provider"
import { Provider } from "react-redux";
import store from "@/store/store";
import { SidebarProvider } from "./ui/sidebar";

interface Props {
    children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
    return (<>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Provider store={store}>
                <SidebarProvider>
                    {children}
                </SidebarProvider>
            </Provider>
        </ThemeProvider>
    </>)
}