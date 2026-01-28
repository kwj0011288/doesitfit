import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../lib/api'

export default function SuccessPage() {
  const [searchParams] = useSearchParams()
  const checkoutId = searchParams.get('checkout_id')
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const verifyPurchase = async () => {
      if (!checkoutId) {
        setError('No checkout ID found')
        return
      }

      try {
        const response = await api.verifyPurchase(checkoutId)

        if (!response.ok) {
          throw new Error('Failed to verify purchase')
        }

        // Store checkout_id in localStorage for later use
        localStorage.setItem('checkout_id', checkoutId)
        setVerified(true)
      } catch (err) {
        console.error('Verification error:', err)
        setError(err.message)
      }
    }

    verifyPurchase()
  }, [checkoutId])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="max-w-md w-full bg-red-50 p-8 rounded-lg border border-red-100 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-red-800 mb-2">Verification Failed</h1>
          <p className="text-red-600 mb-6">{error}</p>
          <Link to="/" className="text-sm text-red-700 hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white">
      <div className="max-w-container w-full text-center space-y-8">
        {verified ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center space-y-4 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-green-800">Payment Successful!</h2>
            <p className="text-xl text-green-700">
              Your access has been verified. You can now generate your style report.
            </p>
            
            <div className="pt-8">
              <Link
                to="/try"
                className="inline-block bg-primary text-white px-12 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transform transition hover:scale-105"
              >
                Generate My Report
              </Link>
            </div>
            
            <p className="text-sm text-green-800/60 font-mono mt-4">
              ID: {checkoutId?.slice(0, 8)}...
            </p>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="animate-spin text-4xl">⏳</div>
            <p className="text-xl text-secondary">Verifying your purchase...</p>
          </div>
        )}
      </div>
    </div>
  )
}
