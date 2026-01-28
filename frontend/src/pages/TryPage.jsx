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
      const response = await api.generate(formData)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate style report')
      }

      const data = await response.json()
      
      // 성공하면 /result 페이지로 이동
      navigate('/result')
    } catch (err) {
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
