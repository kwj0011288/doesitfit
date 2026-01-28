import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full py-20 px-4 border-t border-transparent mt-20">
      <div className="max-w-screen-xl mx-auto space-y-10">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm font-medium text-gray-700">
          <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
          <Link to="/refund" className="hover:text-gray-900 transition-colors">Refund Policy</Link>
          <Link to="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm leading-relaxed text-gray-600">
            Disclaimer: Does it Fit? is an entertainment and fashion suggestion tool powered by AI.
            Results are AI-generated recommendations for fashion and styling purposes only.
            This service does not provide medical, health, or professional advice.
            All suggestions are for informational and entertainment purposes.
          </p>
        </div>

        <div className="text-center text-xs tracking-widest uppercase font-semibold text-gray-500">
          © {new Date().getFullYear()} DOES IT FIT? ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  )
}
