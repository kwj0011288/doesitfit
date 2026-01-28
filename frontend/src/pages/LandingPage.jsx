import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-container w-full text-center space-y-8">
        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Your AI Personal Stylist
          </h1>
          <p className="text-xl md:text-2xl text-secondary max-w-2xl mx-auto">
            AI-generated fashion recommendations based on your photo and height.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Link
            to="/try"
            className="inline-block bg-primary text-white px-12 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-4"
          >
            Try It
          </Link>
        </div>

        {/* No Account Note */}
        <p className="text-sm text-secondary pt-2">
          No account required
        </p>

        {/* Optional: Feature highlights */}
        <div className="pt-12 grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="space-y-2">
            <div className="text-2xl font-semibold">Instant Analysis</div>
            <p className="text-secondary text-sm">
              Upload your photo and get personalized style advice in seconds
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-semibold">Hairstyle Ideas</div>
            <p className="text-secondary text-sm">
              Discover hairstyles that complement your features
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-semibold">Privacy First</div>
            <p className="text-secondary text-sm">
              Your photos are never stored, processed in-memory only
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
