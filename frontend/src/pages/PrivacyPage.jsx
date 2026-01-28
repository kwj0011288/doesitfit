import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { CONTACT_EMAILS } from '../lib/constants'
import SEO from '../components/SEO'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Privacy Policy - Does it Fit?"
        description="Read our comprehensive Privacy Policy. Learn how we protect your data, process photos, and comply with GDPR, CCPA, and CalOPPA regulations."
        keywords="privacy policy, data protection, GDPR compliance, CCPA compliance, CalOPPA compliance, photo privacy, data privacy, user privacy, privacy protection, data security, personal data protection, privacy rights, data rights, privacy information, privacy notice, privacy statement, data processing, photo processing privacy, AI privacy, fashion app privacy, styling app privacy, online privacy, digital privacy, privacy compliance, privacy regulations, consumer privacy, user data protection"
        ogUrl="https://doesitfit.dev/privacy"
      />
      <div className="flex-1 px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="mb-20">
            <Link to="/" className="text-sm text-gray-500 hover:text-black transition-colors inline-block mb-8">
              ← Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-500 font-light">
              Last Updated: January 28, 2026</p>
          </div>
          <div className="prose prose-lg max-w-none space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction and Scope</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Does it Fit? ("we," "our," "us," or "Company") is committed to protecting your privacy and ensuring transparency in how we collect, use, store, and share your personal information. This Privacy Policy ("Policy") explains our data practices when you use our AI-powered personal styling service ("Service").
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                This Policy applies to all users globally and incorporates specific provisions required by:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>General Data Protection Regulation (GDPR)</strong> - for users in the European Economic Area (EEA), United Kingdom, and Switzerland</li>
                <li><strong>California Consumer Privacy Act (CCPA)</strong> as amended by the California Privacy Rights Act (CPRA) - for California residents</li>
                <li><strong>California Online Privacy Protection Act (CalOPPA)</strong> - for California residents</li>
                <li><strong>Children's Online Privacy Protection Act (COPPA)</strong> - regarding users under 13</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                By using our Service, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Information You Provide Directly</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information that you voluntarily provide when using our Service:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Photos:</strong> Full-body or portrait photographs you upload for AI analysis</li>
                <li><strong>Physical Measurements:</strong> Height (in cm), weight (optional, in kg)</li>
                <li><strong>Style Preferences:</strong> Occasion type (daily, work, date, etc.), style vibe, fit preferences</li>
                <li><strong>Payment Information:</strong> Processed and stored by our third-party payment processor Polar.sh (we do not directly store full payment card details)</li>
                <li><strong>Communication Data:</strong> If you contact us, we collect your name, email address, and message content</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Information Collected Automatically</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you access our Service, we automatically collect certain technical information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Device Information:</strong> Device type, operating system, browser type and version, screen resolution</li>
                <li><strong>Log Data:</strong> IP address, access times, pages viewed, time spent on pages, referring URL</li>
                <li><strong>Usage Data:</strong> Interactions with the Service, features used, errors encountered</li>
                <li><strong>Location Data:</strong> General geographic location derived from IP address (country/city level, not precise GPS)</li>
                <li><strong>Cookies and Tracking Technologies:</strong> Essential cookies for session management and functionality (see Section 9)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Information from Third Parties</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Payment Processor (Polar.sh):</strong> Payment confirmation, transaction ID, payment status</li>
                <li><strong>AI Service Provider (Google Gemini):</strong> We send your photos to Google's AI service for analysis; their privacy policy applies to this processing</li>
                <li><strong>Infrastructure Provider (Supabase):</strong> Database and backend infrastructure hosting</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use collected information for the following purposes:
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Service Delivery (Primary Purpose)</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Process your photos using AI algorithms to generate style recommendations</li>
                <li>Create personalized color analysis, body type assessment, and outfit suggestions</li>
                <li>Generate and deliver your digital style report</li>
                <li>Verify payment and prevent fraudulent transactions</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Service Improvement and Analytics</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Analyze usage patterns to improve AI algorithms and recommendation quality</li>
                <li>Monitor service performance, identify bugs, and optimize user experience</li>
                <li>Conduct internal research and development</li>
                <li>Generate aggregated, anonymized statistics (cannot identify individuals)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Communication</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Send transaction confirmations and receipts</li>
                <li>Respond to your inquiries, support requests, or feedback</li>
                <li>Send important service updates (changes to Terms, Privacy Policy, or service availability)</li>
                <li>Provide customer support</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">3.4 Legal Compliance and Safety</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Comply with legal obligations, court orders, and regulatory requirements</li>
                <li>Detect, prevent, and address fraud, security issues, or technical problems</li>
                <li>Protect the rights, property, or safety of our users and the public</li>
                <li>Enforce our Terms of Service and other agreements</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">3.5 Legal Basis for Processing (GDPR)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                For users in the EEA, UK, and Switzerland, we process your data based on:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Contractual Necessity:</strong> Processing is necessary to provide the Service you requested</li>
                <li><strong>Legitimate Interests:</strong> Improving our Service, fraud prevention, security</li>
                <li><strong>Legal Obligation:</strong> Complying with laws, regulations, and legal processes</li>
                <li><strong>Consent:</strong> Where explicitly obtained for specific purposes (you may withdraw consent at any time)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Photo Storage and Processing</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-4">
                <p className="text-gray-700 leading-relaxed font-semibold mb-4">
                  IMPORTANT: Your Privacy is Our Priority
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Photos are NOT permanently stored:</strong> Your uploaded photos are processed in-memory and immediately discarded after analysis</li>
                  <li><strong>Temporary browser storage:</strong> Photos are temporarily stored in your browser's local storage during the checkout process only</li>
                  <li><strong>No photo database:</strong> We do not maintain a database of user photos on our servers</li>
                  <li><strong>AI processing:</strong> Photos are sent to Google Gemini AI for analysis and are subject to Google's data processing terms</li>
                  <li><strong>Retention period:</strong> Photos exist in our system for less than 5 minutes during active processing</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, rent, or trade your personal information to third parties. We share information only in the following limited circumstances:
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Service Providers (Data Processors)</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Google LLC (Gemini AI):</strong> AI-powered image analysis and style recommendation generation
                  <ul className="list-circle pl-6 mt-2">
                    <li>Purpose: Photo analysis, AI processing</li>
                    <li>Data shared: Uploaded photos, physical measurements</li>
                    <li>Privacy Policy: <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></li>
                  </ul>
                </li>
                <li><strong>Polar.sh:</strong> Payment processing
                  <ul className="list-circle pl-6 mt-2">
                    <li>Purpose: Secure payment processing, transaction management</li>
                    <li>Data shared: Payment information, transaction amount</li>
                    <li>Compliance: PCI-DSS compliant</li>
                  </ul>
                </li>
                <li><strong>Supabase:</strong> Database and backend infrastructure
                  <ul className="list-circle pl-6 mt-2">
                    <li>Purpose: Data storage, application hosting</li>
                    <li>Data shared: Transaction records, user preferences (not photos)</li>
                  </ul>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                All service providers are contractually bound to process data only as instructed and maintain appropriate security measures. We conduct due diligence on all service providers.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Legal Requirements</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may disclose your information if required by law or in good faith belief that such action is necessary to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Comply with legal obligations, subpoenas, court orders, or legal process</li>
                <li>Enforce our Terms of Service or investigate potential violations</li>
                <li>Protect the rights, property, or safety of our users or the public</li>
                <li>Respond to claims of unlawful content or activity</li>
                <li>Cooperate with law enforcement or regulatory authorities</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Business Transfers</h3>
              <p className="text-gray-700 leading-relaxed">
                In the event of a merger, acquisition, reorganization, bankruptcy, or sale of assets, your information may be transferred to the successor entity. We will notify you via email and/or prominent notice on our website before your information is transferred and becomes subject to a different privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Service is operated from the United States. If you are located outside the United States, please be aware that information we collect will be transferred to, stored, and processed in the United States and other countries where our service providers operate.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                These countries may have data protection laws that differ from those of your country of residence. By using our Service, you consent to the transfer of your information to countries outside your country of residence, including the United States.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">For EEA, UK, and Swiss Users:</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When we transfer personal data outside the EEA, UK, or Switzerland, we ensure appropriate safeguards are in place, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                <li>Adequacy decisions by the European Commission</li>
                <li>Service providers certified under recognized data protection frameworks</li>
                <li>Your explicit consent for specific transfers</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                You may request a copy of the safeguards we have in place by contacting us at {CONTACT_EMAILS.privacy}.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement robust technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction:
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">7.1 Technical Measures</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Encryption:</strong> All data transmission uses TLS/SSL encryption (HTTPS)</li>
                <li><strong>Secure Infrastructure:</strong> Industry-standard cloud infrastructure with regular security updates</li>
                <li><strong>Access Controls:</strong> Role-based access restrictions, multi-factor authentication for administrators</li>
                <li><strong>Data Minimization:</strong> We collect only necessary information and delete photos immediately after processing</li>
                <li><strong>Monitoring:</strong> Continuous monitoring for security threats and vulnerabilities</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">7.2 Organizational Measures</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Employee training on data protection and security best practices</li>
                <li>Limited access to personal data on a need-to-know basis</li>
                <li>Regular security audits and penetration testing</li>
                <li>Incident response plan for data breaches</li>
                <li>Vendor management and due diligence procedures</li>
              </ul>

              <p className="text-gray-700 leading-relaxed mt-4">
                <strong>Important:</strong> While we use industry-standard security measures, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security. You are responsible for maintaining the confidentiality of any account credentials.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">7.3 Data Breach Notification</h3>
              <p className="text-gray-700 leading-relaxed">
                In the unlikely event of a data breach that affects your personal information, we will notify affected users and relevant authorities as required by applicable law, including GDPR (within 72 hours) and CCPA (without unreasonable delay).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">Specific Retention Periods:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Photos:</strong> Less than 5 minutes (deleted immediately after AI processing)</li>
                <li><strong>Transaction Records:</strong> 7 years (for tax and accounting purposes)</li>
                <li><strong>Generated Style Reports:</strong> Not stored on our servers (delivered to you only)</li>
                <li><strong>Usage Logs:</strong> 90 days (for security and debugging)</li>
                <li><strong>Communication Records:</strong> 3 years (for support and legal purposes)</li>
                <li><strong>Browser Local Storage:</strong> Cleared when you complete or abandon the transaction</li>
              </ul>

              <p className="text-gray-700 leading-relaxed mt-4">
                After the retention period expires, we securely delete or anonymize your personal information. Anonymized data (which cannot identify you) may be retained indefinitely for analytics and research.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Cookies and Tracking Technologies</h2>

              <h3 className="text-xl font-semibold mb-3 mt-6">9.1 What We Use</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use essential cookies and browser local storage to provide core Service functionality:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Session Cookies:</strong> Maintain your session during the checkout process (essential)</li>
                <li><strong>Local Storage:</strong> Temporarily store your photo and form data before payment (essential)</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings (essential)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">9.2 What We Don't Use</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We do NOT use advertising or marketing cookies</li>
                <li>We do NOT use third-party analytics tracking (e.g., Google Analytics)</li>
                <li>We do NOT track you across other websites</li>
                <li>We do NOT sell data to advertisers</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">9.3 Your Choices</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Most browsers allow you to refuse cookies or alert you when cookies are being sent. However, if you disable essential cookies, some features of our Service may not function properly.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Chrome: Settings → Privacy and security → Cookies</li>
                <li>Firefox: Settings → Privacy & Security → Cookies and Site Data</li>
                <li>Safari: Preferences → Privacy → Cookies and website data</li>
              </ul>
            </section>

            <section className="bg-green-50 border-2 border-green-300 rounded-lg p-8 my-8">
              <h2 className="text-2xl font-bold mb-6">10. Your Privacy Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Depending on your location, you have specific rights regarding your personal information. We respect and will honor all applicable rights.
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-6 text-green-900">10.1 Rights Under GDPR (EEA, UK, Switzerland)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you are in the European Economic Area, United Kingdom, or Switzerland, you have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your personal data in certain circumstances</li>
                <li><strong>Right to Restriction of Processing:</strong> Request temporary restriction of data processing</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or direct marketing</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for consent-based processing at any time</li>
                <li><strong>Right to Lodge a Complaint:</strong> File a complaint with your local data protection authority</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                To exercise these rights, contact us at <a href={`mailto:${CONTACT_EMAILS.privacy}`} className="text-primary hover:underline font-semibold">{CONTACT_EMAILS.privacy}</a>. We will respond within 30 days (or as required by law).
              </p>

              <h3 className="text-xl font-semibold mb-4 mt-8 text-green-900">10.2 Rights Under CCPA/CPRA (California Residents)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you are a California resident, the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA) grants you the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li><strong>Right to Know:</strong> Request disclosure of the categories and specific pieces of personal information we collected about you in the past 12 months, including:
                  <ul className="list-circle pl-6 mt-2">
                    <li>Categories of personal information collected</li>
                    <li>Sources from which information was collected</li>
                    <li>Business or commercial purposes for collection</li>
                    <li>Categories of third parties with whom we share information</li>
                    <li>Specific pieces of personal information collected</li>
                  </ul>
                </li>
                <li><strong>Right to Delete:</strong> Request deletion of personal information we collected from you (subject to certain exceptions)</li>
                <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information</li>
                <li><strong>Right to Opt-Out of Sale/Sharing:</strong> We do NOT sell or share your personal information for cross-context behavioral advertising. No opt-out necessary.</li>
                <li><strong>Right to Limit Use of Sensitive Personal Information:</strong> Photos are considered sensitive personal information. We use photos only for the intended Service purpose.</li>
                <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA/CPRA rights</li>
              </ul>

              <div className="bg-white rounded-lg p-6 mt-6 border border-green-200">
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  California Notice at Collection:
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We collect the following categories of personal information: identifiers, commercial information, biometric information (photos for AI analysis), internet activity, and inferences drawn from other information.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We collect this information directly from you and automatically from your device. We use this information for the business purposes described in Section 3 of this Policy.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We do NOT sell or share your personal information. We disclose information to service providers as described in Section 5.1.
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-4 mt-8 text-green-900">10.3 Rights Under CalOPPA (California Residents)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                California's Online Privacy Protection Act (CalOPPA) requires us to disclose:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We allow California residents to review and request changes to their personal information</li>
                <li>We honor "Do Not Track" (DNT) browser signals when technically feasible</li>
                <li>Third parties do not collect personally identifiable information about your online activities over time and across different websites when you use our Service</li>
                <li>We will notify you of material changes to this Privacy Policy via email or prominent website notice</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-8 text-green-900">10.4 How to Exercise Your Rights</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To exercise any of the rights described above:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>Email us at <a href={`mailto:${CONTACT_EMAILS.privacy}`} className="text-primary hover:underline font-semibold">{CONTACT_EMAILS.privacy}</a> with the subject line "Privacy Rights Request"</li>
                <li>Include your full name, email address (if applicable), and specific request</li>
                <li>Provide sufficient information to verify your identity (we may request additional verification)</li>
                <li>Specify which right(s) you wish to exercise</li>
              </ol>
              <p className="text-gray-700 leading-relaxed mt-4">
                We will respond to verified requests within the timeframes required by applicable law:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>GDPR: 30 days (extendable to 60 days for complex requests)</li>
                <li>CCPA/CPRA: 45 days (extendable to 90 days with notice)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                You may designate an authorized agent to make requests on your behalf. The agent must provide proof of authorization, and we may require direct confirmation from you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Children's Privacy (COPPA Compliance)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Service is NOT intended for children under the age of 13. We do not knowingly collect personal information from children under 13.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you are under 13 years old, do NOT:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Use or access our Service</li>
                <li>Provide any personal information to us</li>
                <li>Upload photos or make purchases</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                If we learn that we have collected personal information from a child under 13 without verifiable parental consent, we will delete that information as quickly as possible. If you believe we have collected information from a child under 13, please contact us immediately at {CONTACT_EMAILS.privacy}.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                <strong>For Users Aged 13-17:</strong> If you are between 13 and 17 years old, you should review this Privacy Policy with your parent or guardian to ensure you both understand it. We recommend obtaining parental consent before using the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Third-Party Links and Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Service may contain links to third-party websites, applications, or services (e.g., payment processor, AI provider). This Privacy Policy applies only to our Service.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We are not responsible for the privacy practices of third parties. When you leave our Service, we encourage you to read the privacy policies of every website or service you visit.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Relevant third-party privacy policies:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Google Privacy Policy: <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></li>
                <li>Polar.sh Privacy Policy: Check their website for current policy</li>
                <li>Supabase Privacy Policy: <a href="https://supabase.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://supabase.com/privacy</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                When we make changes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We will update the "Last Updated" date at the top of this Policy</li>
                <li>For material changes, we will provide at least 30 days' advance notice via email (if you provided one) or prominent notice on our website</li>
                <li>We may also notify California and EEA users as required by CCPA and GDPR</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Your continued use of the Service after the effective date of the updated Privacy Policy constitutes your acceptance of the changes. If you do not agree with the updated Policy, you must stop using the Service.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">14. Contact Us and Data Protection Officer</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, complaints, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">General Privacy Inquiries:</p>
                  <p className="text-gray-700">
                    Email: <a href={`mailto:${CONTACT_EMAILS.privacy}`} className="text-primary hover:underline font-semibold">{CONTACT_EMAILS.privacy}</a>
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900 mb-2">GDPR-Specific Requests (EEA/UK/Swiss Users):</p>
                  <p className="text-gray-700">
                    Email: <a href={`mailto:${CONTACT_EMAILS.privacy}`} className="text-primary hover:underline font-semibold">{CONTACT_EMAILS.privacy}</a><br />
                    Subject Line: "GDPR Request"
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900 mb-2">CCPA/CPRA Requests (California Residents):</p>
                  <p className="text-gray-700">
                    Email: <a href={`mailto:${CONTACT_EMAILS.privacy}`} className="text-primary hover:underline font-semibold">{CONTACT_EMAILS.privacy}</a><br />
                    Subject Line: "California Privacy Rights Request"<br />
                    Toll-Free Number: [If applicable - add when available]
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900 mb-2">Data Security Incidents:</p>
                  <p className="text-gray-700">
                    Email: <a href={`mailto:${CONTACT_EMAILS.security}`} className="text-primary hover:underline font-semibold">{CONTACT_EMAILS.security}</a>
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mt-6">
                We will make reasonable efforts to respond to all legitimate requests within the timeframes required by applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">15. Supervisory Authorities</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you are in the EEA, UK, or Switzerland and believe we have not adequately addressed your concerns, you have the right to lodge a complaint with your local data protection supervisory authority:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>EU Data Protection Authorities: <a href="https://edpb.europa.eu/about-edpb/board/members_en" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://edpb.europa.eu/about-edpb/board/members_en</a></li>
                <li>UK Information Commissioner's Office (ICO): <a href="https://ico.org.uk/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://ico.org.uk/</a></li>
                <li>Swiss Federal Data Protection and Information Commissioner: <a href="https://www.edoeb.admin.ch/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://www.edoeb.admin.ch/</a></li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                California residents may also contact the California Attorney General's Office regarding privacy concerns.
              </p>
            </section>

            <section className="bg-gray-100 rounded-lg p-8 mt-8">
              <h2 className="text-2xl font-bold mb-4">16. Supplemental Notices</h2>

              <h3 className="text-xl font-semibold mb-3 mt-6">Nevada Residents</h3>
              <p className="text-gray-700 leading-relaxed">
                Nevada law (SB 220) allows Nevada residents to opt-out of the sale of certain personal information. We do not sell personal information as defined under Nevada law. If you have questions, contact {CONTACT_EMAILS.privacy}.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">Australian Users</h3>
              <p className="text-gray-700 leading-relaxed">
                If you are in Australia, you have rights under the Australian Privacy Act 1988. You may access, correct, or request deletion of your personal information by contacting us.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">Brazilian Users (LGPD)</h3>
              <p className="text-gray-700 leading-relaxed">
                If you are in Brazil, you have rights under the Lei Geral de Proteção de Dados (LGPD). Contact {CONTACT_EMAILS.privacy} to exercise your rights of access, correction, deletion, portability, and others provided by LGPD.
              </p>
            </section>

            <div className="text-center mt-12 p-6 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 italic">
                This Privacy Policy was last updated on January 28, 2026. We recommend reviewing this Policy periodically for any changes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
