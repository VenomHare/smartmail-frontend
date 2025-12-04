import Navbar from "@/components/navbar"
import TextareaTemplate from "@/components/textarea-template"
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { Config } from "@/lib/config";
import React, { useState } from "react"
import axios, { AxiosError } from 'axios'
import { useNavigate } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { AppSidebar } from "@/components/app-sidebar";
import { toast } from "sonner";

const Generate = () => {

    const [answers, setAnswers] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreation = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data }= await axios.post(`${Config.backend_url}/create`, {
                answers
            }, {
                headers: {
                    "Content-Type":"application/json"
                },
                withCredentials: true   
            })

            if (!data.uuid) {
                throw new Error("UUID not Found");
            }
            
            navigate(`/mail/${data.uuid}`);
        }
        catch(err) {
            if (err instanceof AxiosError) {
                toast.error((err as any).data.message);
            }
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    return (<>
        <Navbar />
        <AppSidebar />
        <form className="w-full max-w-7xl mx-auto my-10 px-5" onSubmit={handleCreation}>
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>Generate Email</FieldLegend>
                    <FieldDescription>
                        Select options for generating perfect mail
                    </FieldDescription>
                </FieldSet>
            </FieldGroup>
            <FieldGroup>
                <TextareaTemplate
                    input={answers[0]}
                    setInput={(e) => {setAnswers((prev) => {
                        const newObj = [...prev];
                        newObj[0] = e;
                        return newObj;
                    })}}
                    label={Config.goalQuestion.question}
                    id="goal"
                    inputType={{
                        select: true,
                        textarea: Config.goalQuestion.textarea,
                        options: Config.goalQuestion.options
                    }}
                    disabled={loading}
                />
            </FieldGroup>
            <FieldGroup>
                <TextareaTemplate
                    input={answers[1]}
                    setInput={(e) => {setAnswers((prev) => {
                        const newObj = [...prev];
                        newObj[1] = e;
                        return newObj;
                    })}}
                    label={Config.audienceQuestion.question}
                    id="audience"
                    inputType={{
                        select: true,
                        textarea: Config.audienceQuestion.textarea,
                        options: Config.audienceQuestion.options
                    }}
                    disabled={loading}
                />
            </FieldGroup>
            <FieldGroup>
                <TextareaTemplate
                    input={answers[2]}
                    setInput={(e) => {setAnswers((prev) => {
                        const newObj = [...prev];
                        newObj[2] = e;
                        return newObj;
                    })}}
                    label={Config.headlineQuestion.question}
                    id="headline"
                    inputType={{
                        select: true,
                        textarea: Config.headlineQuestion.textarea,
                        options: Config.headlineQuestion.options
                    }}
                    disabled={loading}
                />
            </FieldGroup>
            <FieldGroup>
                <TextareaTemplate
                    input={answers[3]}
                    setInput={(e) => {setAnswers((prev) => {
                        const newObj = [...prev];
                        newObj[3] = e;
                        return newObj;
                    })}}
                    label={Config.messageQuestion.question}
                    id="message"
                    disabled={loading}
                    
                />
            </FieldGroup>
            <FieldGroup>
                <TextareaTemplate
                    input={answers[4]}
                    setInput={(e) => {setAnswers((prev) => {
                        const newObj = [...prev];
                        newObj[4] = e;
                        return newObj;
                    })}}
                    label={Config.ctaQuestion.question}
                    id="cta"
                    inputType={{
                        select: true,
                        textarea: Config.ctaQuestion.textarea,
                        options: Config.ctaQuestion.options
                    }}
                    disabled={loading}
                />
            </FieldGroup>
            <FieldGroup>
                <TextareaTemplate
                    input={answers[5]}
                    setInput={(e) => {setAnswers((prev) => {
                        const newObj = [...prev];
                        newObj[5] = e;
                        return newObj;
                    })}}
                    label={Config.senderQuestion.question}
                    id="sender"
                    disabled={loading}
                />
            </FieldGroup>
            <FieldGroup>
                <TextareaTemplate
                    input={answers[6]}
                    setInput={(e) => {setAnswers((prev) => {
                        const newObj = [...prev];
                        newObj[6] = e;
                        return newObj;
                    })}}
                    label={Config.logoQuestion.question}
                    id="logo"
                    inputType={{
                        select: true,
                        textarea: Config.logoQuestion.textarea,
                        options: Config.logoQuestion.options
                    }}
                    disabled={loading}
                />
            </FieldGroup>
            <FieldGroup>
                <TextareaTemplate
                    input={answers[7]}
                    setInput={(e) => {setAnswers((prev) => {
                        const newObj = [...prev];
                        newObj[7] = e;
                        return newObj;
                    })}}
                    label={Config.colorQuestion.question}
                    id="color"
                    inputType={{
                        select: true,
                        textarea: Config.colorQuestion.textarea,
                        options: Config.colorQuestion.options
                    }}
                    disabled={loading}
                />
            </FieldGroup>
            <FieldGroup>
                <TextareaTemplate
                    input={answers[8]}
                    setInput={(e) => {setAnswers((prev) => {
                        const newObj = [...prev];
                        newObj[8] = e;
                        return newObj;
                    })}}
                    label={Config.toneQuestion.question}
                    id="tone"
                    inputType={{
                        select: true,
                        textarea: Config.toneQuestion.textarea,
                        options: Config.toneQuestion.options
                    }}
                    disabled={loading}
                />
            </FieldGroup>
            <Button type="submit" disabled={loading}>
                {
                    loading
                    ? <><Spinner/> </>
                    : <>Generate</>
                }
            </Button>
        </form>
    </>
    )
}

export default Generate