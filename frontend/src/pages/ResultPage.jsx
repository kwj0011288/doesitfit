import { Link } from 'react-router-dom'

export default function ResultPage() {
  return (
    <div className="min-h-screen py-12 px-4 bg-white">
      <div className="max-w-container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <Link to="/" className="text-secondary hover:text-primary text-sm">
            ← Home
          </Link>
          <Link 
            to="/try"
            className="px-4 py-2 border border-border rounded-lg hover:bg-gray-50 text-sm"
          >
            Try Another
          </Link>
        </div>

        {/* Mock Notice */}
        <div className="mb-8 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <p className="text-xs text-yellow-800">
            <strong>Mock Data</strong> - UI testing only
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          
          {/* Key Insights */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Your Style Profile</h2>
            <div className="space-y-3 text-lg">
              <p>✓ Balanced proportions work well with structured fits</p>
              <p>✓ Medium build allows both fitted and relaxed styles</p>
              <p>✓ Focus on clean lines and quality fabrics</p>
            </div>
          </section>

          {/* Best Colors - Simple */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Your Colors</h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm">Navy</span>
              <span className="px-4 py-2 bg-gray-700 text-white rounded-full text-sm">Charcoal</span>
              <span className="px-4 py-2 bg-green-800 text-white rounded-full text-sm">Olive</span>
              <span className="px-4 py-2 bg-red-900 text-white rounded-full text-sm">Burgundy</span>
              <span className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-full text-sm">Cream</span>
            </div>
          </section>

          {/* Top Outfit - Just One */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Recommended Outfit</h3>
            <div className="p-6 border border-border rounded-lg space-y-4 bg-gray-50">
              <h4 className="font-semibold text-lg">Classic Work Look</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-secondary">Top:</span> White Oxford shirt
                </div>
                <div>
                  <span className="text-secondary">Bottom:</span> Navy chinos
                </div>
                <div>
                  <span className="text-secondary">Shoes:</span> Brown loafers
                </div>
                <div>
                  <span className="text-secondary">Layer:</span> Grey blazer
                </div>
              </div>
            </div>
          </section>

          {/* Quick Tips */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Quick Tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Invest in well-fitting basics over trendy pieces</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Neutral colors are your foundation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>One statement piece per outfit</span>
              </li>
            </ul>
          </section>

          {/* Hairstyles - Grid Preview */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Hairstyle Options</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {['Textured Quiff', 'Side Part', 'Textured Crop', 'Slick Back', 'Messy Fringe', 'Buzz Cut', 'Crew Cut', 'Pompadour', 'Natural Curly'].map((style, idx) => (
                <div key={idx} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-border">
                  <span className="text-xs text-secondary text-center px-2">{style}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-secondary text-center italic">
              AI will generate real hairstyle images
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
