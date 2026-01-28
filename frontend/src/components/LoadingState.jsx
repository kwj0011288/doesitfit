export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6">
      {/* Loading Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-medium text-gray-900">Analyzing your style...</h3>
        <p className="text-gray-600 text-sm">This may take a moment</p>
      </div>
    </div>
  )
}
