export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="max-w-xl mx-auto p-6 border-2 border-red-200 bg-red-50 rounded-lg">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">⚠️</div>
          <div className="flex-1">
            <h3 className="font-medium text-red-900 mb-1">Something went wrong</h3>
            <p className="text-sm text-red-700">{message}</p>
          </div>
        </div>

        <button
          onClick={onRetry}
          className="w-full px-4 py-2 bg-white border border-red-300 rounded-lg text-red-900 font-medium hover:bg-red-50 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
