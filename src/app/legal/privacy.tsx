import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
const PrivacyPage = () => {
    return (<>
        <Navbar />
        <AppSidebar />
        <div className="container max-w-3xl mx-auto py-12 px-4">
            <article className="prose prose-neutral dark:prose-invert max-w-none">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

                <p className="text-muted-foreground text-lg mb-8">Last updated: January 15, 2025</p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        At Draft Pilot AI, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                        disclose, and safeguard your information when you use our service. Please read this policy carefully.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        We collect information that you provide directly to us, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Account information (name, email address)</li>
                        <li>Email content you create using our service</li>
                        <li>Usage data and interaction with our AI features</li>
                        <li>Payment information for premium subscriptions</li>
                        <li>Connected email account information (for draft sending)</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Process transactions and send related information</li>
                        <li>Send you technical notices and support messages</li>
                        <li>Train and improve our AI models (with anonymized data)</li>
                        <li>Respond to your comments and questions</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We implement appropriate technical and organizational security measures to protect your personal
                        information. This includes encryption in transit and at rest, regular security audits, and access controls
                        for our team members.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We may share your information with third-party service providers who assist us in operating our service,
                        including payment processors, cloud hosting providers, and analytics services. These providers are
                        contractually obligated to protect your information.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        Depending on your location, you may have certain rights regarding your personal data:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Access to your personal data</li>
                        <li>Correction of inaccurate data</li>
                        <li>Deletion of your data</li>
                        <li>Data portability</li>
                        <li>Objection to processing</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We use cookies and similar tracking technologies to collect information about your browsing activities.
                        You can control cookies through your browser settings, though disabling them may affect your experience
                        with our service.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Our service is not intended for users under the age of 13. We do not knowingly collect personal
                        information from children under 13. If we learn we have collected such information, we will take steps to
                        delete it promptly.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
                        policy on this page and updating the effective date.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us at{" "}
                        <a href="mailto:privacy@draftpilot.ai" className="text-primary hover:underline">
                            privacy@draftpilot.ai
                        </a>
                    </p>
                </section>
            </article>
        </div>
        <Footer />
    </>
    )
}
export default PrivacyPage; 