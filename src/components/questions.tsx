import type { LLMQuestions } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";


interface InitProps {
    index: string,
    question: LLMQuestions,
    onChange: (e: string) => void,
    bold?: boolean
    
}
const QuestionBlock = ({ index, question, onChange, bold }: InitProps) => {

    const [hasOtherSelected, setHasOtherSelected] = useState(false);

    return (<div key={index} className="md:space-y-3 w-full shrink-0 snap-center">
        <Label className={cn(
            bold 
            ? "text-2xl font-bold tracking-tight text-foreground text-center md:text-3xl lg:text-4xl text-balance mb-4" 
            : "text-base font-medium"
        )}>{question.question}</Label>

        {question.select && question.options ? (
            <div className="md:space-y-3">
                <RadioGroup onValueChange={(value) => {
                    if (value == "__other__") {
                        onChange("");
                        setHasOtherSelected(true);
                    }
                    else {
                        onChange(value)
                        setHasOtherSelected(false);
                    }
                }}>
                    {question.options.map((option, optIndex) => (
                        <div
                            key={optIndex}
                            className="flex items-center space-x-3 rounded-lg border border-border p-3 hover:bg-accent/40 transition-colors"
                        >
                            <RadioGroupItem value={option} id={`q${index}-opt${optIndex}`} />
                            <Label htmlFor={`q${index}-opt${optIndex}`} className="flex-1 cursor-pointer">
                                {option}
                            </Label>
                        </div>
                    ))}
                    {(
                        <div className="flex items-center space-x-3 rounded-lg border border-border p-3 hover:bg-accent transition-colors">
                            <RadioGroupItem value="__other__" id={`q${index}-other`} />
                            <Label htmlFor={`q${index}-other`} className="cursor-pointer">
                                Other
                            </Label>
                        </div>
                    )}
                </RadioGroup>
                {hasOtherSelected && (
                    question.textarea ?
                        (
                            <Textarea
                                placeholder="Please specify..."
                                onChange={(e) => { onChange(e.target.value) }}
                                className="mt-2"
                            />
                        )
                        :
                        (

                            <Input
                                placeholder="Please specify..."
                                onChange={(e) => onChange(e.target.value)}
                            />
                        )
                )}

            </div>
        ) : question.textarea ? (
            <Textarea
                placeholder="Enter your answer..."
                onChange={(e) => onChange(e.target.value)}
                className="min-h-[100px]"
            />
        ) : (
            <Input
                placeholder="Enter your answer..."
                onChange={(e) => onChange(e.target.value)}
            />
        )}
    </div>)
}
export default QuestionBlock;