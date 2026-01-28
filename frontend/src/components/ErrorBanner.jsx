import { AlertCircle } from 'lucide-react'

export default function ErrorBanner({ message, onRetry }) {
  // Convert technical error messages to user-friendly ones
  const getUserFriendlyMessage = (errorMsg) => {
    if (!errorMsg) return "Something went wrong. Please try again."

    const msg = errorMsg.toLowerCase()

    if (msg.includes('network') || msg.includes('fetch') || msg.includes('failed to fetch')) {
      return "Network error. Please check your connection and try again."
    }
    if (msg.includes('payment') || msg.includes('checkout')) {
      return "Payment processing error. Please try again or contact support."
    }
    if (msg.includes('generation failed') || msg.includes('failed to generate')) {
      return "Unable to generate your style report. Please try again."
    }
    if (msg.includes('timeout') || msg.includes('time out')) {
      return "Request timed out. Please try again."
    }
    if (msg.includes('503') || msg.includes('overloaded') || msg.includes('unavailable')) {
      return "The service is temporarily busy. Please wait a moment and try again."
    }
    if (msg.includes('500') || msg.includes('internal server')) {
      return "Server error. Please try again in a moment."
    }
    if (msg.includes('404') || msg.includes('not found')) {
      return "Service temporarily unavailable. Please try again."
    }
    if (msg.includes('429') || msg.includes('rate limit')) {
      return "Too many requests. Please wait a moment and try again."
    }
    if (msg.includes('photo') || msg.includes('image')) {
      return "Image processing error. Please upload a different photo."
    }

    // Default friendly message
    return "Something went wrong. Please try again."
  }

  const friendlyMessage = getUserFriendlyMessage(message)

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl border border-gray-200 shadow-lg">
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Oops, something went wrong</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {friendlyMessage}
            </p>
          </div>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-sm hover:shadow-md"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
