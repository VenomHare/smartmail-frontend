import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { Clock, MailX, Sparkles } from "lucide-react";
import { AppSidebar } from "../app-sidebar";
import { cn } from "@/lib/utils";


export const MailNotFound = () => {
    return (<>
        <Navbar />
        <AppSidebar />
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

interface MailStatusLoaderProps {
    status: "inqueue" | "processing"
}

export const MailStatusLoader = ({ status }: MailStatusLoaderProps) => {
    return (
        <>
            <Navbar />
            <AppSidebar />
            <div className="flex flex-col items-center justify-center h-[80vh] min-h-[400px] p-8">
                <div className="relative">
                    {/* Outer ring animation */}
                    <div className="absolute inset-0 h-32 w-32 rounded-full border-4 border-primary/20 animate-ping" />
                    <div className="absolute inset-0 h-32 w-32 rounded-full border-4 border-primary/30 animate-pulse" />

                    {/* Main circle */}
                    <div className="relative h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center">
                        {status === "inqueue" ? (
                            <Clock className="h-12 w-12 text-primary animate-pulse" />
                        ) : (
                            <Sparkles className="h-12 w-12 text-primary animate-bounce" />
                        )}
                    </div>
                </div>

                <div className="mt-8 text-center space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                        {status === "inqueue" ? "In Queue" : "Generating Your Email"}
                    </h3>
                    <p className="text-muted-foreground max-w-md">
                        {status === "inqueue"
                            ? "Your request is waiting to be processed. Upgrade to a paid plan for priority access."
                            : "Our AI is crafting the perfect email for you. This usually takes a few seconds."}
                    </p>
                </div>

                {/* Progress dots */}
                <div className="flex gap-2 mt-6">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-2 w-2 rounded-full bg-primary transition-all duration-300",
                                status === "processing" && "animate-bounce",
                            )}
                            style={{ animationDelay: `${i * 150}ms` }}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export const LoadingMail = () => {
    return (<>
        <Navbar />
        <AppSidebar />
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
