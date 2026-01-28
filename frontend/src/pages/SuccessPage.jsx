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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-red-600">Verification Failed</h1>
          <p className="text-secondary">{error}</p>
          <Link to="/" className="inline-block px-6 py-2 border border-border rounded-lg hover:bg-gray-50">
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  if (!verified) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-gray-200 border-t-black rounded-full mx-auto mb-4"></div>
          <p className="text-secondary">Verifying your purchase...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white">
      <div className="max-w-container w-full text-center space-y-8">
        {/* Success Icon */}
        <div className="text-6xl">✓</div>

        {/* Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Payment Successful!</h1>
          <p className="text-xl text-secondary">
            Thank you for your purchase. You now have one-time access to AI Personal Stylist.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-8">
          <Link
            to="/try"
            className="inline-block bg-primary text-white px-12 py-4 rounded-lg text-lg font-medium hover:bg-gray-800"
          >
            Get Your Style Report
          </Link>
        </div>

        {/* Note */}
        <p className="text-sm text-secondary">
          You can generate one report with this purchase
        </p>
      </div>
    </div>
  )
}
