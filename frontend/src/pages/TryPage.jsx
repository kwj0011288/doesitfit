import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TryForm from '../components/TryForm'
import LoadingState from '../components/LoadingState'
import ErrorBanner from '../components/ErrorBanner'
import { api } from '../lib/api'

export default function TryPage() {
  const [state, setState] = useState('form') // 'form' | 'loading' | 'error'
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
    setState('loading')
    setError(null)

    try {
      // 1. Check for checkout_id in localStorage
      const checkoutId = localStorage.getItem('checkout_id')
      
      if (!checkoutId) {
        // No payment yet -> Create checkout
        const response = await api.createCheckout()
        
        if (!response.ok) {
          // If payment system invalid (e.g. 503), allow free access? 
          // For now, assume strict payment required unless 503
          if (response.status === 503) {
            // Free access fallback
            console.log('Payment disabled, allowing free access')
          } else {
            throw new Error('Failed to initiate payment')
          }
        } else {
          // Redirect to payment
          const data = await response.json()
          window.location.href = data.checkout_url
          return
        }
      } else {
        // Add checkout_id to formData
        formData.append('checkout_id', checkoutId)
      }

      // 2. Generate Report
      const response = await api.generate(formData)

      if (!response.ok) {
        const errorData = await response.json()
        
        // If payment required (402) - maybe checkout_id was invalid/used?
        if (response.status === 402 || response.status === 403) {
          // Clear invalid ID
          localStorage.removeItem('checkout_id')
          alert('Payment required or session expired. Redirecting to payment...')
          
          // Retry payment flow
          const checkoutRes = await api.createCheckout()
          if (checkoutRes.ok) {
            const data = await checkoutRes.json()
            window.location.href = data.checkout_url
            return
          }
        }
        
        throw new Error(errorData.error || 'Failed to generate style report')
      }

      const data = await response.json()
      
      // Consume checkout_id from local storage (it's used now)
      localStorage.removeItem('checkout_id')
      
      // Navigate to result
      // Pass data via state to avoid re-fetching or using context for MVP
      // For now, we assume ResultPage uses query params or local state?
      // ResultPage currently shows mock data. We need to pass real data!
      // Let's pass it via react-router state.
      navigate('/result', { state: { result: data } })
      
    } catch (err) {
      console.error(err)
      setError(err.message)
      setState('error')
    }
  }

  const handleRetry = () => {
    setState('form')
    setError(null)
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Get Your Style Report</h1>
          <p className="text-secondary">Upload your photo and share a few details</p>
        </div>

        {/* Form State */}
        {state === 'form' && <TryForm onSubmit={handleSubmit} />}

        {/* Loading State */}
        {state === 'loading' && <LoadingState />}

        {/* Error State */}
        {state === 'error' && (
          <div className="space-y-6">
            <ErrorBanner message={error} onRetry={handleRetry} />
          </div>
        )}
      </div>
    </div>
  )
}
