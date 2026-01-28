import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import TryForm from '../components/TryForm'
import LoadingState from '../components/LoadingState'
import ErrorBanner from '../components/ErrorBanner'
import { api } from '../lib/api'
import { saveImage } from '../lib/imageStore'
import SEO from '../components/SEO'

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
        // 1. SAVE STATE BEFORE LEAVING
        const file = formData.get('photo')
        if (file instanceof File) {
          await saveImage(file)
        }

        // Save other fields
        const formState = {
          height_cm: formData.get('height_cm'),
          gender: formData.get('gender'),
          occasion: formData.get('occasion'),
          weight_kg: formData.get('weight_kg'),
          style_vibe: formData.get('style_vibe'),
          fit_preference: formData.get('fit_preference')
        }
        localStorage.setItem('pending_form_data', JSON.stringify(formState))

        // 2. Initiate Payment
        const response = await api.createCheckout()

        if (!response.ok) {
          if (response.status === 503) {
            console.log('Free access mode')
          } else {
            throw new Error('Failed to initiate payment')
          }
        } else {
          const data = await response.json()
          window.location.href = data.checkout_url
          return
        }
      } else {
        formData.append('checkout_id', checkoutId)
      }

      // 2. Generate Report
      const response = await api.generate(formData)

      if (!response.ok) {
        const errorData = await response.json()

        if (response.status === 402 || response.status === 403) {
          localStorage.removeItem('checkout_id')
          alert('Payment required or session expired. Redirecting to payment...')

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
      localStorage.removeItem('checkout_id')
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
    <div className="min-h-screen bg-white">
      <SEO
        title="Get Your Style Report - Does it Fit?"
        description="Upload your photo and get personalized fashion recommendations. Enter your details and receive instant AI-powered style analysis."
        keywords="upload photo style analysis, get style report, fashion photo analysis, AI style report, personalized style report, instant style analysis, photo styling, fashion photo upload, style check, outfit check, color check, hairstyle check, body type check, fashion analysis tool, style analysis tool, photo style tool, fashion AI upload, style AI upload, get fashion advice, get style advice, get color advice, get hairstyle advice, fashion consultation, style consultation, color consultation, hairstyle consultation, personal style analysis, fashion assessment, style assessment, color assessment, hairstyle assessment"
        ogUrl="https://doesitfit.dev/try"
      />
      {/* Main Content */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="text-sm text-gray-500 hover:text-black transition-colors inline-block mb-12">
            ← Back to Home
          </Link>

          {error && (
            <div className="mb-8">
              <ErrorBanner message={error} onRetry={handleRetry} />
            </div>
          )}

          {/* Form State */}
          {state === 'form' && (
            <div>
              <div className="mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
                  Get Your Style Report
                </h2>
                <p className="text-xl text-gray-600">
                  Upload your photo and tell us about yourself
                </p>
              </div>
              <TryForm onSubmit={handleSubmit} />
            </div>
          )}

          {/* Loading State */}
          {state === 'loading' && (
            <div className="py-32">
              <LoadingState />
            </div>
          )}

          {/* Error State */}
          {state === 'error' && (
            <div className="py-32">
              <ErrorBanner message={error} onRetry={handleRetry} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
