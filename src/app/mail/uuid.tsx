
import { AppSidebar } from "@/components/app-sidebar";
import { useStatusPolling } from "@/components/hooks/use-status-polling";
import LLMQuestionnaire from "@/components/mail/llm-questionnaire";
import {
  LoadingMail,
  MailNotFound,
  RequestInQueue,
  RequestProcessing,
} from "@/components/mail/screens";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Config } from "@/lib/config";
import type { ChatMessage } from "@/lib/types";
import { addUserChat } from "@/store/generation";
import type { RootState } from "@/store/store";
import axios from "axios";
import { Copy, MailPlus, Send } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const scrollbar_css = `
    [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:bg-accent-foreground
    [&::-webkit-scrollbar-thumb]:bg-accent
    dark:[&::-webkit-scrollbar-track]:bg-accent-foreground
    dark:[&::-webkit-scrollbar-thumb]:bg-accent
`;

const EmailUUID = () => {

    const params = useParams();
    const uuid = params["uuid"];
    const navigate = useNavigate();

    if (!uuid) {
        navigate("/generate")
        return (<MailNotFound />)
    }

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { llmResponse, sendExtraAnswers, sendChat } = useStatusPolling(uuid, setLoading);
    const { chats } = useSelector((state: RootState) => state.generation);

    const sendChatMessage = async (message: string) => {
        dispatch(addUserChat(message));
        sendChat(message);
    }

    if (llmResponse.status == "loading") {
        return (<LoadingMail />)
    }

    if (llmResponse.status == "inqueue") {
        return (<RequestInQueue />)
    }

    if (llmResponse.status == "processing") {
        return (<RequestProcessing />)
    }

    if (llmResponse.status == "processed" && llmResponse.response.type == "questions") {
        return (<LLMQuestionnaire questions={llmResponse.response.questions} handleSubmit={sendExtraAnswers} loading={loading} />)
    }

    const copyMailToClipBoard = () => {
        try {

            if (llmResponse.response.type !== "mail") { return }
            const HTMLBlob = new Blob([llmResponse.response.html], {
                type: "text/html"
            });
            const PlainBlob = new Blob(["Just Paste (Ctrl + V) in Compose Box of you Mailbox to use this Amazing Mail"], {
                type: "text/plain"
            })
            const HtmlItem = new ClipboardItem({ ["text/html"]: HTMLBlob, ["text/plain"]: PlainBlob });
            window.navigator.clipboard.write([HtmlItem])
            toast.success("Copied Mail! Paste it in Compose box!")
        }
        catch(err){
            console.log(err);
            toast.warning("Failed to Copy mail")
        }
    }

    if (llmResponse.status == "processed" && llmResponse.response.type == "mail") {
        return (<>
            <Navbar />
            <AppSidebar />
            <div className="max-w-7xl mx-auto px-5 flex items-center justify-center p-8">
                <div className="w-full md:h-[80svh] gap-3 flex flex-col justify-center items-center md:flex-row md:justifty-between">
                    <MailPreview html={llmResponse.response.html} />
                    <AIChatSection chats={chats} sendMessage={sendChatMessage} copyMailToClipBoard={copyMailToClipBoard} />
                </div>
            </div>
        </>)
    }
}

const MailPreview = ({ html }: { html: string }) => {
    return (<>
        <div className="w-full md:w-2/3 h-full flex flex-col items-center justify-between">
            <h2 className="bold text-3xl text-center">Mail Preview</h2>
            <div className={"w-full min-h-[40dvh] shadow border max-h-[75dvh] overflow-auto " + scrollbar_css}
                dangerouslySetInnerHTML={{ __html: html }}>
            </div>
        </div>
    </>)
}

interface ChatSectionProps {
    chats: ChatMessage[]
    sendMessage: (message: string) => Promise<void>
    copyMailToClipBoard: () => void
}

const AIChatSection = ({
    chats,
    sendMessage,
    copyMailToClipBoard,
}: ChatSectionProps) => {
    const [input, setInput] = useState("");
    const { processingChat } = useSelector(
        (state: RootState) => state.generation,
    );

    return (
        <>
            <div className="min-h-[40dvh] md:w-1/3 flex flex-col items-center justify-between gap-2">
                <div className="w-full h-[10dvh] shadow border bg-background flex items-center justify-evenly">
                    <SendToGmailDrawer />
                    <Button
                        size={"lg"}
                        variant={"ghost"}
                        className="flex flex-col h-fit py-2"
                        onClick={copyMailToClipBoard}
                    >
                        <Copy />
                        Copy to Clipboard
                    </Button>
                    <Link to={"/generate"}>
                        <Button
                            size={"lg"}
                            variant={"ghost"}
                            className="flex flex-col h-fit py-2"
                        >
                            <MailPlus />
                            Create New Mail
                        </Button>
                    </Link>
                </div>
                <div className="w-full h-[70dvh] shadow border p-2 flex flex-col justify-between items-center overflow-clip bg-background">
                <h3 className="text-accent-foreground text-xl text-center">
                    Chat with AI
                </h3>
                <div className={"w-full h-9/10 py-2 flex flex-col gap-2 overflow-y-auto overflow-x-clip " + scrollbar_css}>
                    {/* Messages here */}
                    {
                        chats.map(c => {
                            if (c.role == "assistant") {
                                return (<AssistantMessage message={c.message} />);
                            }
                            else {
                                return (<UserMessage message={c.message} />);
                            }
                        })
                    }
                    {
                        processingChat &&
                        <AssistantProcessing />
                    }
                </div>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    await sendMessage(input);
                    setInput("");

                }} className="my-1 h-1/10 w-full flex items-center justify-around gap-2">
                    <Textarea
                        placeholder="Enter Changes here"
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                        value={input}
                        className={"h-full resize-none " + scrollbar_css}
                    />
                    <Button type={"submit"} className="h-full">
                        <Send size={"xl"} />
                    </Button>
                </form>
                </div>
            </div>
        </>
    );
}

type LinkedGmailAccount = {
    email: string;
};

// Handles the Gmail linking-and-sending UX so other parts of the page stay lean.
const SendToGmailDrawer = () => {
    const [accounts, setAccounts] = useState<LinkedGmailAccount[]>([]);
    const [loadingList, setLoadingList] = useState(false);
    const [sendingId, setSendingId] = useState<string | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const params = useParams();
    const uuid = params["uuid"];

    // Fetch linked Gmail accounts whenever the drawer opens.
    const loadAccounts = async () => {
        try {
            setLoadingList(true);
            const { data } = await axios.get(
                `${Config.backend_url}/gmail/accounts`,
                { withCredentials: true },
            );
            if (Array.isArray(data)) {
                setAccounts(data);
            }
        } catch {
            toast.error("Failed to load Gmail accounts");
        } finally {
            setLoadingList(false);
        }
    };

    const handleSendDraft = async (accountMail: string) => {
        try {
            setSendingId(accountMail);
            await axios.post(
                `${Config.backend_url}/gmail/send-draft`,
                { mail: accountMail, id: uuid },
                { withCredentials: true },
            );
            setConfirmOpen(true);
        } catch {
            toast.error("Failed to send draft to Gmail");
        } finally {
            setSendingId(null);
        }
    };

    const handleNewLink = async () => {
        try {
            const { data } = await axios.get(`${Config.backend_url}/gmail/add`, {
                withCredentials: true
            });
            window.open(data.url);
        }
        catch(err) {
            toast.error("Failed while initiating new account link")
        }
    }

    return (
        <>
            <Drawer
                direction="right"
                onOpenChange={(open) => open && loadAccounts()}
            >
                <DrawerTrigger asChild>
                    <Button
                        size={"lg"}
                        variant={"ghost"}
                        className="flex flex-col h-fit py-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        <Send />
                        Send to Gmail
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="bg-linear-to-br from-primary/5 via-background to-background">
                        <DrawerTitle>Send as Gmail draft</DrawerTitle>
                        <DrawerDescription>
                            Choose a linked account, we&apos;ll drop the email
                            inside its Drafts instantly.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="space-y-3 px-4 pb-4">
                        {loadingList ? (
                            <div className="flex items-center gap-2 rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground animate-pulse">
                                <Spinner className="h-4 w-4" />
                                Loading linked Gmail accounts...
                            </div>
                        ) : accounts.length === 0 ? (
                            <div className="rounded-md border px-3 py-6 text-center text-sm text-muted-foreground shadow-sm">
                                No Gmail accounts linked yet.
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {accounts.map((account, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between rounded-lg border bg-card/60 px-3 py-2 text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                                    >
                                        <span>{account.email}</span>
                                        <Button
                                            size="sm"
                                            disabled={sendingId === account.email}
                                            onClick={() =>
                                                handleSendDraft(account.email)
                                            }
                                        >
                                            {sendingId === account.email ? (
                                                <span className="flex items-center gap-2">
                                                    <Spinner className="h-3 w-3" />
                                                    Sending...
                                                </span>
                                            ) : (
                                                "Send as draft"
                                            )}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <DrawerFooter>
                        <Button
                            variant="outline"
                            className="w-full transition-colors duration-200 hover:bg-primary/10"
                            onClick={handleNewLink}
                        >
                            Link new Gmail account
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Draft sent to Gmail
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Check your Gmail Drafts folder — your email should
                            be there now. You can edit it, change recipients,
                            and send it whenever you&apos;re ready.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>Got it</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

const AssistantMessage = ({ message }: { message: string }) => {
    return (<>
        <div className="w-fit max-w-[90%] h-fit shadow border bg-primary text-primary-foreground p-2">
            {message}
        </div>
    </>)
}

const AssistantProcessing = () => {
    return (<>
        <div className="w-fit max-w-[90%] h-fit shadow border bg-primary text-primary-foreground p-2">
            <div className="flex items-center gap-1 select-none px-2 py-1">
                <span className="w-2 h-2 bg-secondary-foreground/90 rounded-full animate-bounce [animation-delay:0ms]"></span>
                <span className="w-2 h-2 bg-secondary-foreground/60 rounded-full animate-bounce [animation-delay:120ms]"></span>
                <span className="w-2 h-2 bg-secondary-foreground/40 rounded-full animate-bounce [animation-delay:240ms]"></span>
            </div>
        </div>
    </>)
}


const UserMessage = ({ message }: { message: string }) => {
    return (<>
        <div className="w-full flex justify-end">
            <div className="w-fit max-w-[90%] h-fit shadow border bg-secondary text-secondary-foreground p-2 ">
                {message}
            </div>
        </div>
    </>)
}


export default EmailUUID;

/*

    The user will reach this page if and only the request to llm has made 
    User will poll requests until the status becomes processed
    possiblities of status = inqueue | processing | processed
     
    ```
    inqueue response 
    {
        uuid : "42fe6055-c111-4bb9-933f-b3c5ffd05f78"
        status: "inqueue"
    }
    ```
    
    ```
    processing response 
    {
        uuid : "42fe6055-c111-4bb9-933f-b3c5ffd05f78"
        status: "processing"
    }
    ```
    
    Processed Response
    ```
    {
        uuid: "42fe6055-c111-4bb9-933f-b3c5ffd05f78",
        status: "processed",
        response: {
            type: "questions",
            llmMessage: "asdsadas",
            questions: [
                {
                    question: "what is xyz ",
                    select: true //for selection based questions
                    options: ["sdka", "sadasd", "sdad"]
                    textarea: true // false for normal input field (for other option)
                },
                {
                    question: "what is logo url ",
                    textarea: true // false for normal input field
                }
            ]
        }
    }
    ```
    OR
    ```
    {
        uuid: "42fe6055-c111-4bb9-933f-b3c5ffd05f78",
        status: "processed",
        response: {
            type: "mail",
            llmMessage: "asdsadas",
            html: "<h1>Email Content</h1>"
            subject: "ABC inc"
        }
    }
    ```

    
*/