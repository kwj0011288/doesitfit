import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { CONTACT_EMAILS } from '../lib/constants'
import SEO from '../components/SEO'

export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Refund Policy - Does it Fit?"
        description="Our comprehensive Refund Policy explains when refunds are available, the refund process, and your consumer rights under GDPR and CCPA."
        keywords="refund policy, refund request, money back guarantee, refund process, refund eligibility, consumer rights, refund rights, GDPR refund rights, CCPA refund rights, return policy, refund terms, refund conditions, how to get refund, refund procedure, refund timeline, refund process, customer refund, service refund, app refund, online refund, digital refund, refund guarantee, satisfaction guarantee, money back, refund information, refund details"
        ogUrl="https://doesitfit.dev/refund"
      />
      <div className="flex-1 px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="mb-20">
            <Link to="/" className="text-sm text-gray-500 hover:text-black transition-colors inline-block mb-8">
              ← Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-4">
              Refund Policy
            </h1>
            <p className="text-xl text-gray-500 font-light">
              Last Updated: January 28, 2026</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Our Commitment</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Does it Fit?, we strive to provide a high-quality AI-powered styling service. We want you to be completely satisfied with your experience. This Refund Policy explains the circumstances under which refunds may be issued, our refund procedures, and your consumer rights.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This Policy should be read in conjunction with our <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. By using our Service, you acknowledge and agree to this Refund Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Understanding Digital Goods and Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Service provides instant digital content delivery. Once you complete payment, our AI system immediately processes your photos and generates your personalized style report. This typically occurs within 1-3 minutes.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Important Distinction:</strong> Digital goods differ from physical products. Once digital content is delivered and consumed, it cannot be "returned" in the traditional sense. Our refund policy reflects the unique nature of digital services while maintaining fair consumer protection practices.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-4">
                <p className="text-gray-700 leading-relaxed font-semibold">
                  Key Point: We are committed to fair refunds for technical failures and legitimate issues, but we cannot provide refunds based solely on subjective disagreement with AI-generated styling recommendations.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Refund Eligibility</h2>

              <h3 className="text-xl font-semibold mb-4 mt-6 text-green-700">3.1 Eligible for Full Refund</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are eligible for an automatic full refund in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li>
                  <strong>Technical Failure to Deliver:</strong> You completed payment but did not receive your style report due to a technical error on our end, and the issue could not be resolved within 48 hours
                </li>
                <li>
                  <strong>Duplicate Charges:</strong> You were charged multiple times for the same transaction due to a payment processing error
                </li>
                <li>
                  <strong>Unauthorized Transaction:</strong> Your payment method was used without your authorization (subject to verification)
                </li>
                <li>
                  <strong>Service Unavailability:</strong> The Service was completely unavailable due to extended downtime (more than 48 hours after payment) and you were unable to receive your report
                </li>
                <li>
                  <strong>Critical Technical Defects:</strong> The generated report is completely blank, corrupted, unreadable, or failed to generate due to a system error (not due to photo quality issues)
                </li>
                <li>
                  <strong>Payment but No Processing:</strong> You paid but the AI processing never started, and manual intervention cannot initiate it
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-8 text-yellow-700">3.2 Case-by-Case Review (Partial or Full Refund Possible)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The following situations will be reviewed individually. Refunds may be granted at our discretion:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li>
                  <strong>Significant Service Delays:</strong> Processing took substantially longer than expected (more than 30 minutes) due to system issues
                </li>
                <li>
                  <strong>Incomplete Report Generation:</strong> The report generated but is missing major sections (e.g., color analysis completely absent when promised)
                </li>
                <li>
                  <strong>Processing Errors:</strong> Clear evidence of systematic processing errors affecting report quality (not AI interpretation differences)
                </li>
                <li>
                  <strong>Documented Technical Issues:</strong> You experienced persistent technical problems that significantly impaired service delivery, with supporting evidence (screenshots, error messages)
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4 italic">
                For these cases, please contact us within 7 days with detailed information and supporting documentation. We will investigate and respond within 3-5 business days.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-8 text-red-700">3.3 NOT Eligible for Refund</h3>
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 my-4">
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Refunds will NOT be issued in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li>
                    <strong>Subjective Disagreement:</strong> You disagree with the AI's style recommendations, color analysis, or outfit suggestions. AI recommendations are inherently subjective and based on algorithmic analysis.
                  </li>
                  <li>
                    <strong>Different Expectations:</strong> The results don't match what you personally expected, hoped for, or preferred, but the Service was delivered as described.
                  </li>
                  <li>
                    <strong>Photo Quality Issues:</strong> Poor results due to low-quality photos, poor lighting, improper angles, or inappropriate photos uploaded by you. The AI can only work with the photo quality provided.
                  </li>
                  <li>
                    <strong>User-Provided Errors:</strong> Inaccurate measurements, incorrect information, or inappropriate occasion selections provided by you that affected the recommendations.
                  </li>
                  <li>
                    <strong>Change of Mind:</strong> You simply changed your mind after receiving the complete, functional style report.
                  </li>
                  <li>
                    <strong>Buyer's Remorse:</strong> You regret the purchase after the Service was successfully delivered.
                  </li>
                  <li>
                    <strong>Successfully Delivered Service:</strong> You received a complete, functional style report with all promised sections, regardless of your personal opinion of the recommendations.
                  </li>
                  <li>
                    <strong>Alternative Opinions:</strong> You obtained a different opinion from another source (human stylist, different AI service, etc.) and prefer that opinion.
                  </li>
                  <li>
                    <strong>AI Interpretation Differences:</strong> The AI's analysis differs from your self-perception or how others have described you.
                  </li>
                  <li>
                    <strong>Delayed Refund Requests:</strong> Refund requests made more than 7 days after purchase without valid extenuating circumstances.
                  </li>
                  <li>
                    <strong>Violation of Terms:</strong> You violated our Terms of Service (e.g., uploaded inappropriate content, provided false information).
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Refund Request Process</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                To request a refund, follow these steps carefully:
              </p>

              <div className="space-y-6">
                <div className="bg-gray-50 border-l-4 border-primary p-6">
                  <h4 className="font-bold text-lg mb-2">Step 1: Contact Us Promptly</h4>
                  <p className="text-gray-700 mb-2">
                    Email us at <a href={`mailto:${CONTACT_EMAILS.refunds}`} className="text-primary hover:underline font-semibold">{CONTACT_EMAILS.refunds}</a> within <strong>7 days</strong> of your purchase date.
                  </p>
                  <p className="text-gray-700 text-sm">
                    Subject Line: "Refund Request - [Your Transaction/Checkout ID]"
                  </p>
                </div>

                <div className="bg-gray-50 border-l-4 border-primary p-6">
                  <h4 className="font-bold text-lg mb-2">Step 2: Provide Required Information</h4>
                  <p className="text-gray-700 mb-3">
                    Include the following in your email:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Your full name and email address used for purchase</li>
                    <li>Transaction/Checkout ID (from your email receipt)</li>
                    <li>Purchase date and amount</li>
                    <li>Detailed explanation of the technical issue or problem encountered</li>
                    <li>What specifically went wrong (be specific - "I didn't like it" is insufficient)</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border-l-4 border-primary p-6">
                  <h4 className="font-bold text-lg mb-2">Step 3: Provide Supporting Evidence</h4>
                  <p className="text-gray-700 mb-3">
                    If applicable, attach:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Screenshots of error messages or technical problems</li>
                    <li>Screen recording showing the issue (if possible)</li>
                    <li>Payment receipt or confirmation email</li>
                    <li>Any correspondence with our support team</li>
                  </ul>
                  <p className="text-gray-700 text-sm mt-3 italic">
                    Note: Failure to provide adequate evidence may delay or prevent refund approval.
                  </p>
                </div>

                <div className="bg-gray-50 border-l-4 border-primary p-6">
                  <h4 className="font-bold text-lg mb-2">Step 4: Review and Investigation</h4>
                  <p className="text-gray-700">
                    Our team will review your request within <strong>3-5 business days</strong>. We may:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                    <li>Request additional information or clarification</li>
                    <li>Ask for additional supporting evidence</li>
                    <li>Verify the technical issue with our system logs</li>
                    <li>Attempt to resolve the issue before processing a refund</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border-l-4 border-primary p-6">
                  <h4 className="font-bold text-lg mb-2">Step 5: Decision Notification</h4>
                  <p className="text-gray-700">
                    You will receive an email with our decision, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                    <li>Approval or denial of refund request</li>
                    <li>Reason for the decision</li>
                    <li>Refund amount (full or partial, if approved)</li>
                    <li>Expected refund timeline</li>
                    <li>Instructions for next steps (if applicable)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Refund Processing and Timeline</h2>

              <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Approval and Processing Time</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Once your refund is approved:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Refunds are processed within <strong>5-7 business days</strong> of approval</li>
                <li>You will receive a confirmation email once the refund is initiated</li>
                <li>Refunds are issued to your original payment method</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Bank/Card Issuer Processing</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                After we process the refund:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>It may take an additional <strong>5-10 business days</strong> for the refund to appear in your account</li>
                <li>Processing time varies by bank, card issuer, and country</li>
                <li>Credit card refunds typically appear as a credit on your next statement</li>
                <li>Debit card refunds may take longer (up to 14 business days)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Refund Amount</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Full refunds include the service fee ($3.99 USD)</li>
                <li>Payment processor fees (if applicable) may not be refundable</li>
                <li>Currency conversion fees charged by your bank are not refundable</li>
                <li>Partial refunds will be clearly explained in our decision email</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">5.4 Refund Methods</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We issue refunds only to the original payment method used for purchase:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Credit/Debit Card: Refunded to the original card</li>
                <li>Digital Wallet: Refunded to the original wallet (PayPal, Apple Pay, etc.)</li>
                <li>We cannot refund to alternative payment methods</li>
                <li>We cannot issue refunds as cash, check, or store credit</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Chargebacks and Payment Disputes</h2>
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 my-4">
                <h3 className="text-xl font-semibold mb-4">⚠️ Please Contact Us BEFORE Initiating a Chargeback</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We strongly encourage you to contact us directly before filing a chargeback with your bank or card issuer. Most issues can be resolved quickly and fairly through our refund process.
                </p>

                <h4 className="font-semibold text-gray-900 mb-3 mt-4">Why Contact Us First?</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Faster resolution (chargebacks can take 60-90 days)</li>
                  <li>Avoid complications with your payment provider</li>
                  <li>We can often provide immediate solutions or refunds</li>
                  <li>Better customer service experience</li>
                </ul>

                <h4 className="font-semibold text-gray-900 mb-3 mt-4">If You File a Chargeback Without Contacting Us:</h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We reserve the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Contest the chargeback with evidence of service delivery (transaction logs, delivery confirmation, IP addresses)</li>
                  <li>Report potentially fraudulent chargebacks to payment processors and fraud prevention services</li>
                  <li>Terminate your access to current and future services</li>
                  <li>Pursue collection for illegitimate chargebacks (fraudulent claims)</li>
                  <li>Take legal action if appropriate</li>
                </ul>

                <p className="text-gray-700 leading-relaxed mt-4 font-semibold">
                  Chargebacks for successfully delivered services may be considered fraud and reported accordingly.
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-3 mt-6">Legitimate Chargeback Situations</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You should file a chargeback if:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>You believe the transaction was fraudulent or unauthorized</li>
                <li>We failed to respond to your refund request within a reasonable time (30 days)</li>
                <li>We unfairly denied your legitimate refund request and you have exhausted all options</li>
                <li>We went out of business and failed to deliver the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Special Circumstances and Exceptions</h2>

              <h3 className="text-xl font-semibold mb-3 mt-6">7.1 Medical or Emergency Situations</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you experience a medical emergency, serious illness, or other extenuating circumstances that prevented you from using the Service or requesting a timely refund, please contact us with documentation. We will review on a case-by-case basis.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">7.2 Accidental Purchases</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you accidentally purchased the Service and have not yet uploaded photos or received results, contact us immediately. We may be able to cancel and refund your order before processing begins.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">7.3 Technical Issues Beyond Our Control</h3>
              <p className="text-gray-700 leading-relaxed">
                We are not responsible for refunds due to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>Your internet connectivity problems</li>
                <li>Your device compatibility issues (we recommend Chrome or Safari)</li>
                <li>Browser extensions or ad blockers interfering with the Service</li>
                <li>Third-party service outages (payment processor, AI provider) beyond our reasonable control</li>
                <li>Force majeure events (natural disasters, war, etc.)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                However, we will work with you to resolve technical issues when possible.
              </p>
            </section>

            <section className="bg-green-50 border-2 border-green-300 rounded-lg p-8 my-8">
              <h2 className="text-2xl font-bold mb-6">8. Consumer Rights by Region</h2>

              <h3 className="text-xl font-semibold mb-4 text-green-900">8.1 European Union (EU/EEA) Consumers</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Under the EU Consumer Rights Directive (2011/83/EU), you have the right to withdraw from online purchases within <strong>14 days</strong> without giving a reason.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Important Exception for Digital Content:</strong>
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The right of withdrawal does NOT apply to digital content if:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Performance has begun with your prior express consent</li>
                <li>You acknowledged that you will lose your right of withdrawal once performance begins</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                By clicking "Purchase" or "Generate," you expressly consent to immediate service delivery and acknowledge that you waive your right of withdrawal once AI processing begins. This waiver is permitted under Article 16(m) of the Consumer Rights Directive.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4 font-semibold">
                However, EU consumers retain all other statutory rights. If the Service is defective or not as described, you are entitled to remedies under EU consumer protection laws.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-6 text-green-900">8.2 United Kingdom (UK) Consumers</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                UK consumers have similar rights under the Consumer Contracts Regulations 2013, with the same exception for digital content delivered immediately with express consent.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-6 text-green-900">8.3 California and U.S. Consumers</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                California Civil Code Section 1789.3 and federal law provide that consumers have the right to dispute charges and seek refunds for services not delivered as described.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Digital goods are generally exempt from traditional "cooling off" periods once delivered. However, you retain rights under consumer protection laws if the Service is defective or fraudulent.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-6 text-green-900">8.4 Australian Consumers</h3>
              <p className="text-gray-700 leading-relaxed">
                Under Australian Consumer Law, you are entitled to a refund if the Service fails to meet consumer guarantees (e.g., services are not provided with due care and skill, or are not fit for purpose). Our refund policy does not limit these statutory guarantees.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Service Guarantee</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While we cannot guarantee satisfaction with subjective AI recommendations, we guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Complete Delivery:</strong> You will receive a style report with all promised sections (color analysis, body type, outfits, hairstyles)</li>
                <li><strong>Timely Delivery:</strong> Results within 5 minutes of successful payment (or refund)</li>
                <li><strong>Service Availability:</strong> 99% uptime (excluding scheduled maintenance)</li>
                <li><strong>Data Security:</strong> Industry-standard encryption and secure payment processing</li>
                <li><strong>Photo Privacy:</strong> Photos are not permanently stored (deleted within 5 minutes)</li>
                <li><strong>Fair Treatment:</strong> Honest evaluation of all refund requests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Non-Refundable Items and Fees</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The following are non-refundable:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Payment processor transaction fees (charged by Polar.sh, not us)</li>
                <li>Currency conversion fees charged by your bank or payment provider</li>
                <li>International transaction fees imposed by your financial institution</li>
                <li>Chargeback fees resulting from illegitimate disputes</li>
                <li>Services used in violation of our Terms of Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Questions and Disputes</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions about our Refund Policy or want to dispute a refund decision:
              </p>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">For Refund Requests:</p>
                  <p className="text-gray-700">
                    Email: <a href={`mailto:${CONTACT_EMAILS.refunds}`} className="text-primary hover:underline font-semibold">{CONTACT_EMAILS.refunds}</a>
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900 mb-2">For General Support:</p>
                  <p className="text-gray-700">
                    Email: <a href={`mailto:${CONTACT_EMAILS.support}`} className="text-primary hover:underline font-semibold">{CONTACT_EMAILS.support}</a>
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900 mb-2">For Disputes or Appeals:</p>
                  <p className="text-gray-700">
                    Email: <a href={`mailto:${CONTACT_EMAILS.disputes}`} className="text-primary hover:underline font-semibold">{CONTACT_EMAILS.disputes}</a>
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mt-6">
                We are committed to resolving all issues fairly and promptly. Most refund requests are reviewed within 3-5 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Policy Changes</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to this page with an updated "Last Updated" date.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Material changes affecting your rights will be communicated via:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Email notification (if you provided an email address)</li>
                <li>Prominent notice on our website</li>
                <li>At least 30 days' advance notice for significant changes</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Continued use of the Service after changes constitutes acceptance of the updated Refund Policy. The policy in effect at the time of your purchase governs that transaction.
              </p>
            </section>

            <div className="text-center mt-12 p-6 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 italic">
                This Refund Policy was last updated on January 28, 2026. We encourage you to review it periodically.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
