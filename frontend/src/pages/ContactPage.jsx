import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { CONTACT_EMAILS } from '../lib/constants'
import SEO from '../components/SEO'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Contact Us - Does it Fit?"
        description="Get in touch with Does it Fit? Contact our support team for questions, refund requests, or privacy concerns."
        keywords="contact us, customer support, help center, customer service, support email"
        ogUrl="https://doesitfit.dev/contact"
      />
      <div className="flex-1 px-6 py-24">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-20">
            <Link to="/" className="text-sm text-gray-500 hover:text-black transition-colors inline-block mb-8">
              ← Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-4">
              Contact
            </h1>
            <p className="text-xl text-gray-500 font-light">
              Get in touch with us
            </p>
          </div>

          {/* Contact Emails */}
          <div className="space-y-16 mb-24">
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
                General Support
              </h2>
              <a
                href={`mailto:${CONTACT_EMAILS.support}`}
                className="text-2xl text-black hover:text-gray-600 transition-colors block"
              >
                {CONTACT_EMAILS.support}
              </a>
              <p className="text-gray-500 mt-2 text-sm">
                For general inquiries and support
              </p>
            </div>
          </div>

          {/* Response Times */}
          <div className="border-t border-gray-200 pt-16 mb-24">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
              Response Times
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <p className="text-sm text-gray-500 mb-1">Support inquiries</p>
                <p className="text-lg font-medium text-black">24-48 hours</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Refund requests</p>
                <p className="text-lg font-medium text-black">3-5 business days</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Technical issues</p>
                <p className="text-lg font-medium text-black">12-24 hours</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="border-t border-gray-200 pt-16">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-12">
              <div>
                <h3 className="text-lg font-medium text-black mb-2">
                  How long does it take to get my report?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Your personalized style report is generated instantly after payment, typically within 1-2 minutes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-black mb-2">
                  Can I get a refund?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Refunds are available for technical issues only. Please see our <Link to="/refund" className="text-black hover:text-gray-600 underline">Refund Policy</Link> for details.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-black mb-2">
                  Is my photo stored?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  No. Your photos are processed in-memory and immediately discarded. We never store user photos on our servers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-black mb-2">
                  How accurate is the AI?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our AI uses Google Gemini 2.5 Pro for advanced analysis. Results are meant for entertainment and guidance, not professional advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
