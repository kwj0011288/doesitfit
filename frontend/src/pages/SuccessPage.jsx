import { useEffect, useState, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import LoadingState from '../components/LoadingState'
import ErrorBanner from '../components/ErrorBanner'
import { getImage, clearImage } from '../lib/imageStore'
import SEO from '../components/SEO'

export default function SuccessPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('Verifying payment...')

  // Prevent double execution in Strict Mode
  const processedRef = useRef(false)

  useEffect(() => {
    if (processedRef.current) return
    processedRef.current = true

    const verifyAndGenerate = async () => {
      const checkoutId = searchParams.get('checkout_id')

      if (!checkoutId) {
        setError('No checkout ID found.')
        return
      }

      try {
        // 1. Verify Purchase (Records the purchase in Supabase)
        setStatus('Verifying payment...')
        const verifyRes = await api.verifyPurchase(checkoutId)

        if (!verifyRes.ok) {
          // If already recorded (409), it's fine. Otherwise error.
          if (verifyRes.status !== 409 && verifyRes.status !== 200) {
            throw new Error('Payment verification failed.')
          }
        }

        // 2. Load Saved Data (Auto-Generate)
        setStatus('Generating your style report... This may take a minute.')

        const file = await getImage()
        const savedData = localStorage.getItem('pending_form_data')

        if (!file || !savedData) {
          // Fallback if data is missing (e.g. user cleared cache or different device)
          // Then we MUST redirect to TryPage to re-upload.
          console.warn('Saved data not found, redirecting to TryPage')
          localStorage.setItem('checkout_id', checkoutId) // Save for TryPage
          navigate('/try')
          return
        }

        const formDataObj = JSON.parse(savedData)

        // 3. Construct FormData
        const formData = new FormData()
        formData.append('photo', file)
        formData.append('checkout_id', checkoutId)
        formData.append('height_cm', formDataObj.height_cm)
        formData.append('gender', formDataObj.gender)
        formData.append('occasion', formDataObj.occasion)
        if (formDataObj.weight_kg) formData.append('weight_kg', formDataObj.weight_kg)
        if (formDataObj.style_vibe) formData.append('style_vibe', formDataObj.style_vibe)
        if (formDataObj.fit_preference) formData.append('fit_preference', formDataObj.fit_preference)

        // 4. Call Generate API
        const genRes = await api.generate(formData)

        if (!genRes.ok) {
          throw new Error('Generation failed. Please try again.')
        }

        const resultData = await genRes.json()

        // --- FIX: Unwrap & Save Safely ---
        // Backend returns { result: { ... } } usually.
        // We use || to be safe.
        const finalResult = resultData.result || resultData

        try {
          sessionStorage.setItem('latest_result', JSON.stringify(finalResult))
        } catch (e) {
          console.error('Session storage save failed:', e)
        }

        // 5. Cleanup & Redirect
        await clearImage()
        localStorage.removeItem('pending_form_data')
        localStorage.removeItem('checkout_id') // Consumed

        // Pass via state as well (primary), but ResultPage will fallback to sessionStorage
        navigate('/result', { state: { result: finalResult } })

      } catch (err) {
        console.error(err)
        setError(err.message || 'Something went wrong')
      }
    }

    verifyAndGenerate()
  }, [searchParams, navigate])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <SEO
          title="Payment Verification - Does it Fit?"
          description="Verifying your payment and generating your personalized style report."
          ogUrl="https://doesitfit.dev/success"
        />
        <div className="max-w-md w-full text-center">
          <ErrorBanner message={error} onRetry={() => window.location.reload()} />
          <button
            onClick={() => navigate('/try')}
            className="mt-4 text-primary underline"
          >
            Back to Start
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <SEO
        title="Payment Verification - Does it Fit?"
        description="Verifying your payment and generating your personalized style report."
        keywords="payment verification, payment processing, checkout confirmation"
        ogUrl="https://doesitfit.dev/success"
      />
      <LoadingState message={status} />
    </div>
  )
}
