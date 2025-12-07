
import { AppSidebar } from "@/components/app-sidebar";
import { useStatusPolling } from "@/components/hooks/use-status-polling";
import {
    MailNotFound,
    MailStatusLoader,
} from "@/components/mail/screens";
import Navbar from "@/components/navbar";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MailQuestions } from "@/components/mail/llm-questionnaire";
import { MailActions } from "@/components/mail/mail-actions";
import { MailPreview } from "@/components/mail/mail-preview";
import { MailChat } from "@/components/mail/mail-chat";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EmailUUID = () => {

    const params = useParams();
    const uuid = params["uuid"];
    const navigate = useNavigate();

    if (!uuid) {
        navigate("/generate")
        return (<MailNotFound />)
    }

    const [loading, setLoading] = useState(false);
    const { llmResponse, sendExtraAnswers, sendChat } = useStatusPolling(uuid, setLoading);

    if (llmResponse.status == "loading") {
        return (<MailStatusLoader status={"inqueue"} />)
    }

    if (llmResponse.status == "inqueue" || llmResponse.status == "processing") {
        return (<MailStatusLoader status={llmResponse.status} />)
    }

    if (llmResponse.status == "processed" && llmResponse.response.type == "questions") {
        return (<MailQuestions questions={llmResponse.response.questions} handleSubmit={sendExtraAnswers} loading={loading} />)
    }

    if (llmResponse.status == "processed" && llmResponse.response.type == "mail") {
        return (<>
            <Navbar />
            <AppSidebar />
            <div className="flex">
                {/* Sidebar dummy */}
                <div className="hidden md:block w-16 h-[90vh]"></div>
                <div className="h-[92vh] w-full flex flex-col">
                    <>
                        {/* Actions Bar */}
                        <div className="border-b border-border p-4 flex items-center justify-between gap-4 flex-wrap">
                            <MailActions
                                html={llmResponse.response.html}
                                onSendDraft={async (accountId) => {
                                    await new Promise((resolve) => setTimeout(resolve, 1000))
                                }}
                            />
                        </div>

                        {/* Main Content - Tabs for smaller screens, side-by-side for xl+ */}
                        <div className="flex-1 overflow-hidden">
                            {/* Tabs view for screens smaller than xl */}
                            <div className="xl:hidden h-full flex flex-col">
                                <Tabs defaultValue="preview" className="flex-1 flex flex-col overflow-hidden">
                                    <div className="flex items-center justify-center w-full border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-10 py-4">
                                        <TabsList className="w-full max-w-md mx-auto h-12 px-1">
                                            <TabsTrigger 
                                                value="preview" 
                                                className="text-base font-semibold px-6 py-2.5 flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
                                            >
                                                Preview
                                            </TabsTrigger>
                                            <TabsTrigger 
                                                value="chat" 
                                                className="text-base font-semibold px-6 py-2.5 flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
                                            >
                                                Chat
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>
                                    <TabsContent value="preview" className="flex-1 overflow-x-hidden overflow-y-auto p-4 mt-0">
                                        <MailPreview subject={llmResponse.response.subject} html={llmResponse.response.html} />
                                    </TabsContent>
                                    <TabsContent value="chat" className="flex-1 overflow-auto p-4 mt-0">
                                        <MailChat
                                            mail_id={uuid}
                                            onSendMessage={sendChat}
                                            className="h-full"
                                        />
                                    </TabsContent>
                                </Tabs>
                            </div>

                            {/* Side-by-side view for xl+ screens */}
                            <div className="hidden xl:flex h-[85vh] flex-1 overflow-hidden ">
                                {/* Mail Preview */}
                                <div className="flex-1 w-3/5 p-4 overflow-auto">
                                    <MailPreview subject={llmResponse.response.subject} html={llmResponse.response.html} />
                                </div>

                                {/* Chat */}
                                <div className="w-2/5 border-l border-border p-4">
                                    <MailChat
                                        mail_id={uuid}
                                        onSendMessage={sendChat}
                                        className="h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </>

                </div>
            </div>
        </>)
    }
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