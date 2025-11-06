import type { LLMQuestions } from "@/lib/types";
import { Button } from "../ui/button";
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "../ui/field";
import TextareaTemplate from "../textarea-template";
import Navbar from "../navbar";
import { useState } from "react";

interface Props {
    questions: LLMQuestions[]
}

const LLMQuestionnaire = ({ questions }: Props) => {



    const [answers, setAnswers] = useState<{question: string, answer: string}[]>(
        questions.map(q => ({
            question: q.question,
            answer: ""
        }))
    );

    return (<>

        <Navbar />
        <form className="w-full max-w-7xl mx-auto my-10 px-5" onSubmit={(e) => {
            e.preventDefault();
            console.log(answers)
            alert(answers.map((q,i)=> (`${i+1}. ${q.question} : ${q.answer}`)).join(" "));
        }}>
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>A Few more Questions</FieldLegend>
                    <FieldDescription>
                        Answer the following for more information
                    </FieldDescription>
                </FieldSet>
            </FieldGroup>
            {
                questions.map((q, i) => {
                    if (q.select) {
                        return <>
                            <FieldGroup>
                                <TextareaTemplate
                                    input={answers[i].answer}
                                    setInput={(e) => {
                                        setAnswers((prev) => {
                                            const newArr = [...prev];
                                            newArr[i] = { ...newArr[i], answer: e };
                                            return newArr;
                                        })
                                    }}
                                    label={q.question}
                                    id={"llm-question-" + i}
                                    inputType={{
                                        select: true,
                                        textarea: q.textarea,
                                        options: q.options
                                    }}
                                />
                            </FieldGroup>
                        </>
                    }
                    else {
                        return (<>
                            <FieldGroup>
                                <TextareaTemplate
                                    input={answers[i].answer}
                                    setInput={(e) => {
                                        setAnswers((prev) => {
                                            const newArr = [...prev];
                                            newArr[i] = { ...newArr[i], answer: e };
                                            return newArr;
                                        })
                                    }}
                                    label={q.question}
                                    id={"llm-question-" + i}
                                />
                            </FieldGroup>
                        </>)
                    }
                })
            }
            <Button type="submit">Generate</Button>
        </form>
    </>)

}

export default LLMQuestionnaire;