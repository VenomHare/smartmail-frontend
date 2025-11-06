export const Config = {
    goalQuestion: {
        question: "What is the goal or purpose of this email?",
        textarea: false,
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
    audienceQuestion: {
        question: "Who is the target audience?",
        textarea: false,
        options: [
            "Existing customers",
            "New leads / potential clients",
            "Newsletter subscribers",
            "Business partners",
            "Internal team / employees"
        ]
    },
    headlineQuestion: {
        question: "What should be the main headline or title of the email?",
        textarea: true,
        options: [
            "Introducing Something Exciting from Our Team",
            "A New Update You'll Love",
            "Your Monthly Company Newsletter",
            "We've Got Something Special for You"
        ]
    },
    messageQuestion: {
        question: "What is the core message or offer you want to communicate?",
        textarea: true,
        options: [
            "We're thrilled to share our latest update that brings more value, performance, and ease to your experience.",
            "Discover how our new product makes your workflow faster and smarter.",
            "Stay up-to-date with our latest announcements and improvements.",
            "Here's an exclusive offer just for you — limited time only!"
        ]
    },
    ctaQuestion: {
        question: "What is the primary Call-To-Action (CTA)?",
        textarea: false,
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
    senderQuestion: {
        question: "What is the sender name and company/brand that should appear in the email?",
        textarea: true,
        options: [
            "The Marketing Team, Your Company Name",
            "Customer Success Team, Your Brand",
            "The Communications Team, Your Organization"
        ]
    },
    logoQuestion: {
        question: "Do you want to include a logo or banner image?",
        textarea: false,
        options: [
            "Yes, include my brand logo",
            "Yes, include a custom banner",
            "No, use a color gradient header"
        ]
    },
    colorQuestion: {
        question: "Do you want to use any specific brand colors or should the AI auto-generate a palette?",
        textarea: false,
        options: [
            "Auto-generate a modern professional palette",
            "Use my brand colors (I'll specify them)",
            "Match the email to product theme"
        ]
    },
    toneQuestion: {
        question: "Do you have a preferred tone for this email?",
        textarea: false,
        options: [
            "Professional and polished",
            "Friendly and conversational",
            "Elegant and minimal",
            "Bold and energetic"
        ]
    },
};
