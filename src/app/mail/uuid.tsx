
import { useStatusPolling } from "@/components/hooks/use-status-polling";
import LLMQuestionnaire from "@/components/mail/llm-questionnaire";
import { MailNotFound, RequestInQueue, RequestProcessing } from "@/components/mail/screens";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ChatMessage } from "@/lib/types";
import { Copy, MailPlus, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

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

    const [loading, setLoading] = useState(false);
    const { llmResponse, sendExtraAnswers } = useStatusPolling(uuid, setLoading);

    const [chats, setChats] = useState<ChatMessage[]>([{
        role: "assistant",
        message: "here's your perfect mail"
    }]);

    const sendChatMessage = async (message: string) => {
        setChats((prev) => {
            const obj = [...prev];
            obj.push({
                role: "user",
                message
            })
            return obj
        })
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

    if (llmResponse.status == "processed" && llmResponse.response.type == "mail") {
        return (<>
            <Navbar />
            <div className="max-w-7xl mx-auto px-5 flex items-center justify-center p-8">
                <div className="w-full md:h-[80svh] gap-3 flex flex-col justify-center items-center md:flex-row md:justifty-between">
                    <MailPreview html={llmResponse.response.html} />
                    <AIChatSection chats={chats} sendMessage={sendChatMessage} />
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
}

const AIChatSection = ({ chats, sendMessage }: ChatSectionProps) => {
    const [input, setInput] = useState("");

    return (<>
        <div className="min-h-[40dvh] md:w-1/3 flex flex-col items-center justify-between gap-2">
            <div className="w-full h-[10dvh] shadow border bg-background flex items-center justify-evenly">
                <Button size={"lg"} variant={"ghost"} className="flex flex-col h-fit py-2">
                    <Send />
                    Send to Gmail
                </Button>
                <Button size={"lg"} variant={"ghost"} className="flex flex-col h-fit py-2">
                    <Copy />
                    Copy to Clipboard
                </Button>
                <Button size={"lg"} variant={"ghost"} className="flex flex-col h-fit py-2">
                    <MailPlus />
                    Create New Mail
                </Button>
            </div>
            <div className="w-full h-[70dvh] shadow border p-2 flex flex-col justify-between items-center overflow-clip bg-background">
                <h3 className="text-accent-foreground text-xl text-center">
                    Chat with AI
                </h3>
                <div className="w-full h-9/10 py-2 flex flex-col gap-2">
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
                    <Button type={"submit"} className="h-full"><Send size={"xl"} /></Button>
                </form>
            </div>
        </div>
    </>)
}

const AssistantMessage = ({ message }: { message: string }) => {
    return (<>
        <div className="w-fit max-w-[90%] h-fit shadow border bg-primary text-primary-foreground p-2">
            {message}
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