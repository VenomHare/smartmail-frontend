import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const TermsPage = () =>  {
    return (<>
        <Navbar />
        <AppSidebar />
        <div className="container max-w-3xl mx-auto py-12 px-4">
            <article className="prose prose-neutral dark:prose-invert max-w-none">
                <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>

                <p className="text-muted-foreground text-lg mb-8">Last updated: January 15, 2025</p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        By accessing and using Draft Pilot AI ("Service"), you accept and agree to be bound by the terms and
                        provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Draft Pilot AI is an artificial intelligence-powered email drafting service that helps users compose
                        professional emails. The service includes email generation, AI-assisted editing, and integration with
                        email providers.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        To access certain features of the Service, you must create an account. You are responsible for maintaining
                        the confidentiality of your account credentials and for all activities that occur under your account.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">4. Subscription and Payments</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Certain features of the Service require a paid subscription. Subscription fees are billed in advance on a
                        monthly or annual basis. You may cancel your subscription at any time, but no refunds will be provided for
                        partial billing periods.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">You agree not to use the Service to:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Generate spam, phishing, or malicious content</li>
                        <li>Violate any applicable laws or regulations</li>
                        <li>Infringe on the rights of others</li>
                        <li>Distribute harmful or illegal content</li>
                        <li>Attempt to access unauthorized areas of the Service</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The Service and its original content, features, and functionality are owned by Draft Pilot AI and are
                        protected by international copyright, trademark, and other intellectual property laws.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Draft Pilot AI shall not be liable for any indirect, incidental, special, consequential, or punitive
                        damages resulting from your use of the Service. We make no guarantees regarding the accuracy or
                        appropriateness of AI-generated content.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We reserve the right to modify these terms at any time. We will notify users of any material changes by
                        posting the new Terms on this page and updating the "Last updated" date.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        If you have any questions about these Terms, please contact us at{" "}
                        <a href="mailto:legal@draftpilot.ai" className="text-primary hover:underline">
                            legal@draftpilot.ai
                        </a>
                    </p>
                </section>
            </article>
        </div>
        <Footer />
    </>
    )
}
export default TermsPage;