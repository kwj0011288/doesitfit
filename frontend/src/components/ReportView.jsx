import { useState } from 'react'

export default function ReportView({ report, onTryAnother }) {
  const [copied, setCopied] = useState(false)

  const handleCopySummary = () => {
    const summaryText = report.summary.join('\n')
    navigator.clipboard.writeText(summaryText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header with Actions */}
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <h2 className="text-3xl font-bold">Your Style Report</h2>
        <button
          onClick={onTryAnother}
          className="px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          Try Another Photo
        </button>
      </div>

      {/* Summary */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Summary</h3>
          <button
            onClick={handleCopySummary}
            className="px-3 py-1 text-sm border border-border rounded hover:bg-gray-50 transition-colors"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <ul className="space-y-2">
          {report.summary.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="mr-2 text-secondary">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Body & Fit Guidance */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Body & Fit Guidance</h3>
        <div className="space-y-3">
          <p className="text-secondary">{report.body_fit.overall}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-green-700">✓ Do</h4>
              <ul className="space-y-1 text-sm">
                {report.body_fit.do.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-red-700">✗ Avoid</h4>
              <ul className="space-y-1 text-sm">
                {report.body_fit.avoid.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Color Recommendations</h3>
        <div className="space-y-3">
          <div className="space-y-2">
            <h4 className="font-medium">Best Colors</h4>
            <div className="flex flex-wrap gap-2">
              {report.colors.best.map((color, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-green-50 border border-green-200 rounded-full text-sm"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Colors to Avoid</h4>
            <div className="flex flex-wrap gap-2">
              {report.colors.avoid.map((color, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-red-50 border border-red-200 rounded-full text-sm"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
          
          <p className="text-sm text-secondary italic">{report.colors.notes}</p>
        </div>
      </section>

      {/* Outfit Suggestions */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Outfit Suggestions</h3>
        <div className="space-y-6">
          {report.outfits.map((outfit, idx) => (
            <div key={idx} className="p-6 border border-border rounded-lg space-y-3">
              <h4 className="font-semibold text-lg">{outfit.title}</h4>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                {outfit.items.top && (
                  <div>
                    <span className="font-medium">Top: </span>
                    <span className="text-secondary">{outfit.items.top}</span>
                  </div>
                )}
                {outfit.items.bottom && (
                  <div>
                    <span className="font-medium">Bottom: </span>
                    <span className="text-secondary">{outfit.items.bottom}</span>
                  </div>
                )}
                {outfit.items.shoes && (
                  <div>
                    <span className="font-medium">Shoes: </span>
                    <span className="text-secondary">{outfit.items.shoes}</span>
                  </div>
                )}
                {outfit.items.outerwear && (
                  <div>
                    <span className="font-medium">Outerwear: </span>
                    <span className="text-secondary">{outfit.items.outerwear}</span>
                  </div>
                )}
              </div>
              
              <p className="text-sm italic text-secondary">{outfit.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Styling Tips */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Styling Tips</h3>
        <ul className="space-y-2">
          {report.styling_tips.map((tip, idx) => (
            <li key={idx} className="flex items-start">
              <span className="mr-2 text-secondary">💡</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
