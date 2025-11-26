import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { MailX } from "lucide-react";
import { AppSidebar } from "../app-sidebar";


export const MailNotFound = () => {
    return (<>
        <Navbar />
        <AppSidebar/>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-center p-8">
            <Card className="w-full max-w-sm">
                <CardContent className="flex flex-col items-center text-center py-8">
                    <MailX className="w-12 h-12 text-slate-400 mb-3" />
                    <h3 className="font-semibold text-lg mb-1">Mail Not Found</h3>
                    <p className="text-sm text-slate-500">
                        This email doesn't exist or has been deleted
                    </p>
                </CardContent>
            </Card>
        </div>
    </>)
}
export const RequestInQueue = () => {
    return (<>
        <Navbar />
        <AppSidebar/>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-center p-8">
            <Card className="w-full max-w-sm">
                <CardContent className="flex flex-col items-center text-center py-8">
                    <Spinner className="w-12 h-12 text-slate-400 mb-3" />
                    <h3 className="font-semibold text-lg mb-1">You are in queue.</h3>
                    <p className="text-sm text-slate-500">
                        Wait for the Queue to clear or Purchase Premium
                    </p>
                </CardContent>
            </Card>
        </div>
    </>)
}
export const RequestProcessing = () => {
    return (<>
        <Navbar />
        <AppSidebar/>
        <div className="w-full max-w-7xl px-5 mx-auto">
            <Item variant={"muted"} className="my-3">
                <ItemMedia>
                    <Spinner />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle className="line-clamp-1">Processing Information...</ItemTitle>
                </ItemContent>
            </Item>
        </div>
    </>)
}

export const LoadingMail = () => {
    return (<>
        <Navbar />
        <AppSidebar/>
        <div className="w-full max-w-7xl px-5 mx-auto">
            <Item variant={"muted"} className="my-3">
                <ItemMedia>
                    <Spinner />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle className="line-clamp-1">Loading ...</ItemTitle>
                </ItemContent>
            </Item>
        </div>
    </>)
}
