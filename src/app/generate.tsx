import Navbar from "@/components/navbar"
import TextareaTemplate from "@/components/textarea-template"
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { Config } from "@/lib/config";
import { useState } from "react"

const answerData = {
    goal: {
        question: "What is the goal or purpose of this email?",
        answer: ""
    },
    audience: {
        question: "Who is the target audience?",
        answer: ""
    },
    headline: {
        question: "What should be the main headline or title of the email?",
        answer: ""
    },
    message: {
        question: "What is the core message or offer you want to communicate?",
        answer: ""
    },
    cta: {
        question: "What is the primary Call-To-Action (CTA)?",
        answer: ""
    },
    sender: {
        question: "What is the sender name and company/brand that should appear in the email?",
        answer: ""
    },
    logo: {
        question: "Do you want to include a logo or banner image?",
        answer: ""
    },
    color: {
        question: "Do you want to use any specific brand colors or should the AI auto-generate a palette?",
        answer: ""
    },
    tone: {
        question: "Do you have a preferred tone for this email?",
        answer: ""
    }
}

const Generate = () => {

    const [initialQuestionData, setIntialQuestionData] = useState(answerData);

    return (<>
        <Navbar />
        <form className="w-full max-w-7xl mx-auto my-10 px-5" onSubmit={(e) => {
            e.preventDefault();
            console.log(Object.entries(initialQuestionData).map((data, i)=> {
                return `${i+1}. ${data[1].question} : ${data[1].answer}`;
            }).join(" "));  
        }}>
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
                    input={initialQuestionData.goal.answer}
                    setInput={(e) => {setIntialQuestionData((prev) => {
                        const newObj = {...prev};
                        newObj.goal.answer = e;
                        return newObj;
                    })}}
                    label={Config.goalQuestion.question}
                    id="goal"
                    inputType={{
                        select: true,
                        textarea: Config.goalQuestion.textarea,
                        options: Config.goalQuestion.options
                    }}
                />
            </FieldGroup>

            <FieldGroup>
                <TextareaTemplate
                    input={initialQuestionData.audience.answer}
                    setInput={(e) => {setIntialQuestionData((prev) => {
                        const newObj = {...prev};
                        newObj.audience.answer = e;
                        return newObj;
                    })}}
                    label={Config.audienceQuestion.question}
                    id="audience"
                    inputType={{
                        select: true,
                        textarea: Config.audienceQuestion.textarea,
                        options: Config.audienceQuestion.options
                    }}
                />
            </FieldGroup>

            <FieldGroup>
                <TextareaTemplate
                    input={initialQuestionData.headline.answer}
                    setInput={(e) => {setIntialQuestionData((prev) => {
                        const newObj = {...prev};
                        newObj.headline.answer = e;
                        return newObj;
                    })}}
                    label={Config.headlineQuestion.question}
                    id="headline"
                    inputType={{
                        select: true,
                        textarea: Config.headlineQuestion.textarea,
                        options: Config.headlineQuestion.options
                    }}
                />
            </FieldGroup>

            <FieldGroup>
                <TextareaTemplate
                    input={initialQuestionData.message.answer}
                    setInput={(e) => {setIntialQuestionData((prev) => {
                        const newObj = {...prev};
                        newObj.message.answer = e;
                        return newObj;
                    })}}
                    label={Config.messageQuestion.question}
                    id="message"
                    
                />
            </FieldGroup>

            <FieldGroup>
                <TextareaTemplate
                    input={initialQuestionData.cta.answer}
                    setInput={(e) => {setIntialQuestionData((prev) => {
                        const newObj = {...prev};
                        newObj.cta.answer = e;
                        return newObj;
                    })}}
                    label={Config.ctaQuestion.question}
                    id="cta"
                    inputType={{
                        select: true,
                        textarea: Config.ctaQuestion.textarea,
                        options: Config.ctaQuestion.options
                    }}
                />
            </FieldGroup>

            <FieldGroup>
                <TextareaTemplate
                    input={initialQuestionData.sender.answer}
                    setInput={(e) => {setIntialQuestionData((prev) => {
                        const newObj = {...prev};
                        newObj.sender.answer = e;
                        return newObj;
                    })}}
                    label={Config.senderQuestion.question}
                    id="sender"
                    inputType={{
                        select: true,
                        textarea: Config.senderQuestion.textarea,
                        options: Config.senderQuestion.options
                    }}
                />
            </FieldGroup>

            <FieldGroup>
                <TextareaTemplate
                    input={initialQuestionData.logo.answer}
                    setInput={(e) => {setIntialQuestionData((prev) => {
                        const newObj = {...prev};
                        newObj.logo.answer = e;
                        return newObj;
                    })}}
                    label={Config.logoQuestion.question}
                    id="logo"
                    inputType={{
                        select: true,
                        textarea: Config.logoQuestion.textarea,
                        options: Config.logoQuestion.options
                    }}
                />
            </FieldGroup>

            <FieldGroup>
                <TextareaTemplate
                    input={initialQuestionData.color.answer}
                    setInput={(e) => {setIntialQuestionData((prev) => {
                        const newObj = {...prev};
                        newObj.color.answer = e;
                        return newObj;
                    })}}
                    label={Config.colorQuestion.question}
                    id="color"
                    inputType={{
                        select: true,
                        textarea: Config.colorQuestion.textarea,
                        options: Config.colorQuestion.options
                    }}
                />
            </FieldGroup>

            <FieldGroup>
                <TextareaTemplate
                    input={initialQuestionData.tone.answer}
                    setInput={(e) => {setIntialQuestionData((prev) => {
                        const newObj = {...prev};
                        newObj.tone.answer = e;
                        return newObj;
                    })}}
                    label={Config.toneQuestion.question}
                    id="tone"
                    inputType={{
                        select: true,
                        textarea: Config.toneQuestion.textarea,
                        options: Config.toneQuestion.options
                    }}
                />
            </FieldGroup>
            <Button type="submit">Generate</Button>
        </form>
    </>
    )
}

export default Generate