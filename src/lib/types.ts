export type LLMQuestions = {
    question: string
    select: false
    textarea: boolean
} | {
    question: string
    select: true
    options: string[]
    textarea: boolean
}

export type MailResponse = {
    uuid: string,
    status: "loading"
} | {
    uuid: string
    status: "inqueue"
} | {
    uuid: string
    status: "processing"
} | {
    uuid: string
    status: "processed"
    response: {
        type: "questions"
        llmMessage: string
        questions: LLMQuestions[]
    }
} | {
    uuid: string
    status: "processed"
    response: {
        type: "mail"
        llmMessage: string
        html: string
        subject: string
    }
}

export type ChatMessage = {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

export interface User {
    id: string,
    full_name?: string,
    avatar_url?: string,
    username?: string,
    bio?: string,
}

export interface MailHistoryItem {
    uuid: string,
    subject: string,
}

export interface LinkedMail {
    mail: string
    linkedAt: string
}