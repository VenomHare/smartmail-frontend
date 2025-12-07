import type React from "react"
import { ThemeProvider } from "./theme-provider"
import { Provider } from "react-redux";
import store from "@/store/store";
import { Toaster } from "./ui/sonner";

interface Props {
    children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
    return (<>
        <Toaster position={"top-center"} />
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Provider store={store}>
                {children}
            </Provider>
        </ThemeProvider>
    </>)
}