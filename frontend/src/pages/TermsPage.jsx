import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { CONTACT_EMAILS } from '../lib/constants'
import SEO from '../components/SEO'

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Terms of Service - Does it Fit?"
        description="Read our Terms of Service. Understand your rights and responsibilities when using our AI-powered personal styling service."
        keywords="terms of service, terms and conditions, user agreement, service terms, user rights, user responsibilities"
        ogUrl="https://doesitfit.dev/terms"
      />
      <div className="flex-1 px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="mb-20">
            <Link to="/" className="text-sm text-gray-500 hover:text-black transition-colors inline-block mb-8">
              ← Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-500 font-light">
              Last Updated: January 28, 2026</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing or using Does it Fit? ("Service," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you do not have permission to access the Service.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms apply to all visitors, users, and others who access or use the Service. By using the Service, you represent that you are at least 18 years of age, or if you are under 18, that you have obtained parental or guardian consent to use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Service Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Does it Fit? is an AI-powered digital service that provides personalized fashion and styling recommendations. Our Service includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>AI-based body type and feature analysis using uploaded photos</li>
                <li>Personal color and palette recommendations</li>
                <li>Clothing style and fashion item suggestions</li>
                <li>AI-generated hairstyle visualizations and recommendations</li>
                <li>Downloadable and shareable digital style reports</li>
              </ul>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 my-6">
                <p className="text-gray-900 leading-relaxed font-semibold mb-3">
                  Important Disclaimer:
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The Service is provided for informational and entertainment purposes only. AI-generated recommendations are suggestions based on algorithmic analysis and should not be considered professional fashion advice, medical advice, or psychological assessment. Results may vary based on photo quality, lighting, and other factors.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. User Eligibility and Registration</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Service does not require account registration. However, by using the Service, you represent and agree that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>You are at least 18 years old, or have parental/guardian consent if under 18</li>
                <li>You will provide accurate and complete information when requested</li>
                <li>You will use the Service only for lawful purposes</li>
                <li>You will not attempt to circumvent any security features of the Service</li>
                <li>You will not use the Service in any way that could damage or impair the Service</li>
                <li>You have the legal capacity to enter into this agreement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. User Content and Uploads</h2>

              <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Photo Uploads</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                By uploading photos to our Service, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>You own the photo or have the necessary rights and permissions to upload it</li>
                <li>The photo is of yourself, or you have explicit consent from the person depicted</li>
                <li>The photo does not contain inappropriate, offensive, or illegal content</li>
                <li>The photo does not infringe on any third-party intellectual property rights</li>
                <li>You have all necessary rights to grant us the license described below</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Prohibited Content</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to upload content that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Contains nudity, sexually explicit material, or inappropriate content</li>
                <li>Depicts minors without appropriate parental consent</li>
                <li>Violates any applicable laws, regulations, or third-party rights</li>
                <li>Contains malware, viruses, or other harmful code</li>
                <li>Is defamatory, harassing, threatening, or promotes violence</li>
                <li>Impersonates another person or misrepresents your identity</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">4.3 License Grant</h3>
              <p className="text-gray-700 leading-relaxed">
                By uploading content, you grant us a limited, non-exclusive, worldwide, royalty-free license to process your content solely for the purpose of providing the Service. We do not claim ownership of your content and do not use it for any purpose other than delivering the requested service. This license terminates when your content is deleted from our systems (typically within 5 minutes after processing).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Payment Terms</h2>

              <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Pricing</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Service fee: $3.99 USD per consultation</li>
                <li>All prices are in US Dollars and include applicable processing fees</li>
                <li>Prices are subject to change with reasonable notice</li>
                <li>Applicable taxes may be added based on your jurisdiction</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Payment Processing</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Payments are processed securely through Polar (polar.sh), our third-party payment processor. By making a purchase, you also agree to Polar's Terms of Service and Privacy Policy. We do not store your full payment card details on our servers.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Billing and Receipts</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Payment is required before receiving analysis results. You will receive a digital receipt via email from Polar upon successful payment. Please retain this receipt for your records.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">5.4 Currency</h3>
              <p className="text-gray-700 leading-relaxed">
                All transactions are processed in US Dollars (USD). If your payment method uses a different currency, your bank or payment provider may apply currency conversion fees.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Service Delivery</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Upon successful payment verification, AI analysis will begin automatically. Results are typically generated within 1-3 minutes. Digital delivery is considered complete when results are displayed in your browser.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Due to the instantaneous digital nature of the service and the immediate consumption of computational resources, delivery cannot be "returned" once processing begins. This is consistent with digital content delivery practices and applicable consumer protection laws regarding digital goods.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Refunds</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our comprehensive refund policy is detailed in our separate <Link to="/refund" className="text-primary hover:underline font-semibold">Refund Policy</Link>. Key points include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Automatic full refunds are provided for technical failures that prevent service delivery</li>
                <li>Refunds for successfully delivered services are limited due to the digital nature of the product</li>
                <li>Refund requests must be made within 7 days of purchase</li>
                <li>EU consumers have specific rights under the Consumer Rights Directive</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Intellectual Property Rights</h2>

              <h3 className="text-xl font-semibold mb-3 mt-6">8.1 Our Intellectual Property</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Service, including its original content, features, functionality, design, software, algorithms, and underlying technology, is owned by Does it Fit? and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">8.2 Your Rights to Generated Content</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You retain ownership of any photos you upload. The AI-generated reports and recommendations provided to you are licensed for your personal, non-commercial use. You may save, download, print, and share your results for personal purposes.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">8.3 Restrictions</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Reproduce, modify, distribute, or create derivative works of the Service</li>
                <li>Reverse engineer, decompile, or attempt to extract the source code</li>
                <li>Use the Service or its outputs for commercial purposes without written authorization</li>
                <li>Remove any copyright, trademark, or proprietary notices</li>
                <li>Use automated systems to access the Service (scraping, bots, etc.)</li>
                <li>Resell or redistribute the Service or access to it</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Privacy and Data Protection</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your privacy is important to us. Please review our <Link to="/privacy" className="text-primary hover:underline font-semibold">Privacy Policy</Link>, which explains in detail how we collect, use, protect, and handle your personal information, including compliance with GDPR, CCPA/CPRA, CalOPPA, and other applicable data protection regulations.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using the Service, you consent to our privacy practices as described in the Privacy Policy. If you do not agree with our privacy practices, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Disclaimers and Warranties</h2>

              <h3 className="text-xl font-semibold mb-3 mt-6">10.1 "As Is" Basis</h3>
              <p className="text-gray-700 leading-relaxed mb-4 uppercase font-semibold">
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">10.2 No Guarantees</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not warrant or guarantee that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>The Service will meet your specific requirements or expectations</li>
                <li>The Service will be uninterrupted, timely, secure, or error-free</li>
                <li>The AI-generated results will be accurate, reliable, complete, or satisfactory</li>
                <li>Any errors or defects in the Service will be corrected</li>
                <li>The Service is free of viruses or other harmful components</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">10.3 AI Technology Limitations</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                AI technology has inherent limitations. Results are algorithmically generated based on pattern recognition and may not accurately reflect professional styling advice. Factors such as photo quality, lighting, angle, and resolution can significantly affect results. The Service should not be used as a substitute for professional consultation when needed.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">10.4 Not Professional Advice</h3>
              <p className="text-gray-700 leading-relaxed">
                The Service does not provide medical, psychological, dermatological, or professional fashion advice. Always consult appropriate professionals for health-related or professional styling decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Limitation of Liability</h2>
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 my-4">
                <p className="text-gray-900 leading-relaxed mb-4 uppercase font-bold">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL DOES IT FIT?, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Loss of profits, revenue, data, use, goodwill, or other intangible losses</li>
                  <li>Damages resulting from your access to or use of (or inability to use) the Service</li>
                  <li>Damages resulting from any conduct or content of any third party</li>
                  <li>Damages resulting from unauthorized access, use, or alteration of your content</li>
                  <li>Any other damages arising from your use of the Service</li>
                </ul>
                <p className="text-gray-900 leading-relaxed mt-4 uppercase font-bold">
                  OUR TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE GREATER OF: (A) THE AMOUNT YOU PAID FOR THE SERVICE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED US DOLLARS ($100 USD).
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm italic">
                Some jurisdictions do not allow the exclusion or limitation of certain damages. If these laws apply to you, some or all of the above limitations may not apply, and you may have additional rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to defend, indemnify, and hold harmless Does it Fit? and its officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorney's fees) arising out of or relating to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Your violation of these Terms</li>
                <li>Your use or misuse of the Service</li>
                <li>Your violation of any third-party rights, including intellectual property rights</li>
                <li>Any content you upload or submit to the Service</li>
                <li>Your violation of any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Governing Law and Dispute Resolution</h2>

              <h3 className="text-xl font-semibold mb-3 mt-6">13.1 Governing Law</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">13.2 Dispute Resolution</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Any disputes arising from these Terms or the Service shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration or in courts of competent jurisdiction, as permitted by applicable law.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">13.3 Class Action Waiver</h3>
              <p className="text-gray-700 leading-relaxed mb-4 uppercase font-semibold">
                TO THE EXTENT PERMITTED BY LAW, YOU AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS WILL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">13.4 EU Consumer Rights</h3>
              <p className="text-gray-700 leading-relaxed">
                If you are a consumer in the European Union, you retain any mandatory consumer protection rights under the laws of your country of residence. Nothing in these Terms affects your statutory rights as a consumer. You may also use the EU Online Dispute Resolution platform at <a href="https://ec.europa.eu/consumers/odr/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">14. International Users</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Service is intended for users worldwide. If you access the Service from outside the United States, you do so at your own initiative and are responsible for compliance with local laws to the extent applicable. By using the Service, you consent to the transfer and processing of your information in the United States and other countries, which may have different data protection rules.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We make no representation that the Service is appropriate or available for use in all locations. Access to the Service from territories where its contents are illegal is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">15. Modifications to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify or replace these Terms at any time at our sole discretion. For material changes, we will provide at least 30 days' notice before the new terms take effect. Notice may be provided by posting the updated Terms on our website or through other reasonable means.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Your continued use of the Service after the effective date of any changes constitutes acceptance of the modified Terms. If you do not agree to the new terms, you must stop using the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">16. Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms. Upon termination, your right to use the Service will cease immediately.
              </p>
              <p className="text-gray-700 leading-relaxed">
                All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">17. General Provisions</h2>

              <h3 className="text-xl font-semibold mb-3 mt-6">17.1 Severability</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                If any provision of these Terms is held to be unenforceable or invalid by a court of competent jurisdiction, such provision will be modified to the minimum extent necessary to make it enforceable, or if modification is not possible, will be severed. The remaining provisions will continue in full force and effect.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">17.2 Waiver</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                No waiver of any term or condition of these Terms shall be deemed a further or continuing waiver of such term or any other term. Our failure to enforce any right or provision shall not constitute a waiver of that right or provision.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">17.3 Assignment</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign our rights and obligations under these Terms without restriction.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">17.4 Entire Agreement</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms, together with our Privacy Policy and Refund Policy, constitute the entire agreement between you and Does it Fit? regarding the Service and supersede all prior agreements, representations, and understandings.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">17.5 Force Majeure</h3>
              <p className="text-gray-700 leading-relaxed">
                We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including acts of God, natural disasters, war, terrorism, labor disputes, government actions, or internet service failures.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">18. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, or complaints about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2">
                  <strong>General Inquiries:</strong>
                </p>
                <p className="text-gray-700 mb-4">
                  Email: <a href={`mailto:${CONTACT_EMAILS.support}`} className="text-primary hover:underline font-semibold">{CONTACT_EMAILS.support}</a>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Legal Matters:</strong>
                </p>
                <p className="text-gray-700">
                  Email: <a href={`mailto:${CONTACT_EMAILS.legal}`} className="text-primary hover:underline font-semibold">{CONTACT_EMAILS.legal}</a>
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-6">
                We will make reasonable efforts to address your concerns promptly.
              </p>
            </section>

            <div className="text-center mt-12 p-6 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 italic">
                These Terms of Service were last updated on January 28, 2026. Please review periodically for any changes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
