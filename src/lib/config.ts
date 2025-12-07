import type { LLMQuestions } from "./types";

export const Config = {
    backend_url: "http://localhost:3001",
    frontend_url: "http://localhost:3000",
    status_polling_delay: 3000,

    MAX_CHATS: 5

};

export const InitQuestions: LLMQuestions[] = [
    {
        question: "What is the goal or purpose of this email?",
        textarea: false,
        select: true,
        options: [
            "Product promotion",
            "Newsletter update",
            "Event invitation",
            "Company announcement",
            "Product launch",
            "Customer onboarding",
            "Seasonal offer"
        ]
    },
    {
        question: "Who is the target audience?",
        textarea: false,
        select: true,
        options: [
            "Existing customers",
            "New leads / potential clients",
            "Newsletter subscribers",
            "Business partners",
            "Internal team / employees"
        ]
    },
    {
        question: "What should be the main headline or title of the email?",
        textarea: true,
        select: false,

    },
    {
        question: "What is the core message or offer you want to communicate?",
        textarea: true,
        select: false,

    },
    {
        question: "What is the primary Call-To-Action (CTA)?",
        textarea: false,
        select: true,
        options: [
            "Learn More",
            "Shop Now",
            "Register Today",
            "Get Started",
            "Explore Now",
            "View Details",
            "None"
        ]
    },
    {
        question: "What is the sender name and company/brand that should appear in the email?",
        textarea: false,
        select: false,

    },
    {
        question: "Do you want to include a logo or banner image?",
        textarea: false,
        select: true,
        options: [
            "Yes, include my brand logo",
            "Yes, include a custom banner",
            "No, use a color gradient header"
        ]
    },
    {
        question: "Do you want to use any specific brand colors or should the AI auto-generate a palette?",
        textarea: false,
        select: true,
        options: [
            "Auto-generate a modern professional palette",
            "Use my brand colors (I'll specify them)",
            "Match the email to product theme"
        ]
    },
    {
        question: "Do you have a preferred tone for this email?",
        textarea: false,
        select: true,
        options: [
            "Professional and polished",
            "Friendly and conversational",
            "Elegant and minimal",
            "Bold and energetic"
        ]
    },
]
