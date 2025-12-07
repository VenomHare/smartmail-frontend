import type { LLMQuestions } from "@/lib/types";
import { Button } from "../ui/button";
import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Loader, Send, Sparkles } from "lucide-react";
import QuestionBlock from "../questions";
import { toast } from "sonner";
import Navbar from "../navbar";
import { AppSidebar } from "../app-sidebar";

interface Props {
    questions: LLMQuestions[]
    loading: boolean
    handleSubmit: (ans: string) => Promise<void>
    llmMessage?: string
}



export function MailQuestions({ llmMessage, questions, handleSubmit, loading }: Props) {
    const [answers, setAnswers] = React.useState<{
        question: string,
        answer: string
    }[]>(questions.map(q => ({
        question: q.question,
        answer: ""
    })))


    const onSubmit = async () => {
        if (allAnswered) {
            await handleSubmit(answers.map((q, i) => (`${i + 1}. ${q.question} : ${q.answer}`)).join(" "));
        }
    }
    const handleAnswerChange = (index: number, value: string) => {
        setAnswers((a) => {
            a[index].answer = value;
            return a;
        })

    }

    const allAnswered = answers.every((answer) => {
        return answer.answer?.trim().length > 0
    });

    return (<>
        <Navbar />
        <AppSidebar />
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle>Additional Information Needed</CardTitle>
                        <CardDescription>{llmMessage || "Please answer these questions to continue"}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {questions.map((q, index) => (
                    <QuestionBlock question={q} index={index.toString()} onChange={(value) => {
                        handleAnswerChange(index, value);
                    }} />
                ))}

                <Button onClick={onSubmit} disabled={!allAnswered || loading} className="w-full gap-2" size="lg">
                    {loading ? (
                        <>
                            <Loader className="h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4" />
                            Continue
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    </>
    )
}
