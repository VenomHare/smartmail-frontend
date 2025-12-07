import { AppSidebar } from "@/components/app-sidebar"
import Navbar from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Check, Crown, Infinity, X, Zap } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"

const plans = [
    {
        id: "free",
        name: "Free",
        description: "Perfect for trying out Draft Pilot AI",
        price: { monthly: 0, yearly: 0 },
        features: [
            { text: "1 mail generation daily", included: true },
            { text: "3 AI chat messages daily", included: true },
            { text: "1 Gmail account", included: true },
        ],
        cta: "Current Plan",
        popular: false,
        icon: Zap,
    },
    {
        id: "gold",
        name:  "Gold",
        description: "For professionals who need more power",
        price: { monthly: 19, yearly: 190 },
        features: [
            { text: "Unlimited mail generation", included: true },
            { text: "20 AI chat messages daily", included: true },
            { text: "10 Gmail accounts", included: true },
        ],
        cta: "Upgrade to Gold",
        popular: true,
        icon: Crown,
    },
    {
        id: "platinum",
        name: "Platinum",
        description: "For teams and power users",
        price: { monthly: 49, yearly: 490 },
        features: [
            { text: "Unlimited mail generation", included: true },
            { text: "Unlimited AI chat messages", included: true },
            { text: "Unlimited Gmail accounts", included: true },
        ],
        cta: "Upgrade to Platinum",
        popular: false,
        icon: Infinity,
    },
]

const PricingPage = () => {
    const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

    return (<>
        <Navbar />
        <AppSidebar />

        <div className="flex">
            {/* Sidebar dummy */}
            <div className="hidden md:block w-16 h-[90vh]"></div>

            <div className="container max-w-6xl mx-auto py-12 px-4">
                {/* Header */}
                <div className="text-center space-y-4 mb-12">
                    {/* <Badge variant="secondary" className="mb-2">
                        Pricing
                    </Badge> */}
                    <h1 className="text-4xl font-bold tracking-tight text-balance">Choose the perfect plan for you</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Start for free and upgrade as you grow. All plans include our core AI email drafting features.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center mb-8">
                    <Tabs value={billingPeriod} onValueChange={(v) => setBillingPeriod(v as "monthly" | "yearly")}>
                        <TabsList className="grid w-[240px] grid-cols-2">
                            <TabsTrigger value="monthly">Monthly</TabsTrigger>
                            <TabsTrigger value="yearly" className="relative">
                                Yearly
                                <Badge className="absolute -top-3 -right-3 text-[10px] px-1.5 py-0.5 bg-green-500 text-white border-0">
                                    -17%
                                </Badge>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Plans Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {plans.map((plan) => {
                        const Icon = plan.icon
                        return (
                            <Card
                                key={plan.id}
                                className={cn("relative flex flex-col", plan.popular && "border-primary shadow-lg shadow-primary/10")}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                                    </div>
                                )}
                                <CardHeader className="text-center pb-2">
                                    <div
                                        className={cn(
                                            "mx-auto h-12 w-12 rounded-xl flex items-center justify-center mb-4",
                                            plan.id === "free" && "bg-secondary",
                                            plan.id === "gold" && "bg-yellow-500/10",
                                            plan.id === "platinum" && "bg-purple-500/10",
                                        )}
                                    >
                                        <Icon
                                            className={cn(
                                                "h-6 w-6",
                                                plan.id === "free" && "text-muted-foreground",
                                                plan.id === "gold" && "text-yellow-500",
                                                plan.id === "platinum" && "text-purple-500",
                                            )}
                                        />
                                    </div>
                                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                                    <CardDescription>{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="text-center mb-6">
                                        <div className="flex items-baseline justify-center gap-1">
                                            <span className="text-4xl font-bold">${plan.price[billingPeriod]}</span>
                                            {plan.price[billingPeriod] > 0 && (
                                                <span className="text-muted-foreground">/{billingPeriod === "monthly" ? "mo" : "yr"}</span>
                                            )}
                                        </div>
                                        {billingPeriod === "yearly" && plan.price.yearly > 0 && (
                                            <p className="text-sm text-muted-foreground mt-1">
                                                ${Math.round(plan.price.yearly / 12)}/month billed annually
                                            </p>
                                        )}
                                    </div>

                                    <ul className="space-y-3">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                {feature.included ? (
                                                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                ) : (
                                                    <X className="h-5 w-5 text-muted-foreground/50 shrink-0 mt-0.5" />
                                                )}
                                                <span className={cn("text-sm", !feature.included && "text-muted-foreground")}>
                                                    {feature.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full"
                                        variant={plan.popular ? "default" : "outline"}
                                        disabled={plan.id === "free"}
                                    >
                                        {plan.cta}
                                    </Button>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>

                {/* FAQ or Additional Info */}
                <div className="mt-16 text-center">
                    <p className="text-muted-foreground">
                        Have questions?{" "}
                        <Link to="mailto:support@draftpilot.ai" className="text-primary hover:underline">
                            Contact us
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </>
    )
}
export default PricingPage;