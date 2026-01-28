import { useState } from 'react'
import TryForm from '../components/TryForm'
import LoadingState from '../components/LoadingState'
import ReportView from '../components/ReportView'
import CollageViewer from '../components/CollageViewer'
import ErrorBanner from '../components/ErrorBanner'

export default function TryPage() {
  const [state, setState] = useState('form') // 'form' | 'loading' | 'success' | 'error'
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (formData) => {
    setState('loading')
    setError(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to generate style report')
      }

      const data = await response.json()
      setResult(data)
      setState('success')
    } catch (err) {
      setError(err.message)
      setState('error')
    }
  }

  const handleTryAnother = () => {
    setState('form')
    setResult(null)
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
            <ErrorBanner message={error} onRetry={handleTryAnother} />
          </div>
        )}

        {/* Success State */}
        {state === 'success' && result && (
          <div className="space-y-8">
            <ReportView report={result.result} onTryAnother={handleTryAnother} />
            <CollageViewer collage={result.hair_collage} />
          </div>
        )}
      </div>
    </div>
  )
}
