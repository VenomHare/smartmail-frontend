import { useState } from "react"
import { Field, FieldLabel } from "./ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"

type InputType = {
    select: true
    options: string[]
    textarea: boolean
}

type Props = {
    id: string
    label: string
    placeholder?: string
    input: string,
    setInput: (e: string) => void
    inputType?: InputType
    optional?: boolean
    disabled?: boolean
}

const TextareaTemplate = ({ label, placeholder, input, setInput, id, inputType, optional, disabled }: Props) => {

    if (inputType == undefined) {
        return (<>
            <Field className="grid w-full max-w-2xl gap-3 my-5">
                <FieldLabel htmlFor={id}>{label}</FieldLabel>
                <Textarea
                    required={!(optional !== undefined || optional)}
                    placeholder={placeholder} id={id} value={input}
                    onChange={(e) => { setInput(e.target.value) }}
                    disabled={disabled}
                />
            </Field>
        </>)
    }
    else if (inputType.select) {
        const [otherSelected, setOtherSelected] = useState(false);
        return (<>
            <Field className="grid w-full max-w-2xl gap-3 my-5">
                <FieldLabel htmlFor={id}>{label}</FieldLabel>
                <Select onValueChange={(e) => {
                    if (e == "other") {
                        setOtherSelected(true)
                    }
                    else {
                        setOtherSelected(false);
                        setInput(e);
                    }
                }}
                    required={!(optional !== undefined || optional)}
                    disabled={disabled}
                >
                    <SelectTrigger id={id}>
                        <SelectValue placeholder="Select Option" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            inputType.options.map((inp) => (
                                <SelectItem value={inp}>{inp}</SelectItem>
                            ))
                        }
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
                {
                    otherSelected && (
                        inputType.textarea ?
                            <Textarea disabled={disabled} required={!(optional !== undefined || optional)} placeholder={"Enter Details"} id={id} onChange={(e) => { setInput(e.target.value) }} />
                            :
                            <Input disabled={disabled} required={!(optional !== undefined || optional)} placeholder={"Enter Details"} id={id} onChange={(e) => { setInput(e.target.value) }} />
                    )
                }
            </Field>
        </>)
    }
}

export default TextareaTemplate