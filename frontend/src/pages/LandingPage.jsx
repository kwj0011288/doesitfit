import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Check } from 'lucide-react'
import Footer from '../components/Footer'
import { SnowBackground } from '../components/ui/snow'
import SEO from '../components/SEO'

export default function LandingPage() {
  const [copied, setCopied] = useState(false)
  const discountCode = 'WELCOMETODOESITFIT'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(discountCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <SnowBackground>
      <SEO
        title="Does it Fit? - AI Personal Stylist | Personalized Fashion Recommendations"
        description="Get personalized fashion recommendations, color analysis, and hairstyle suggestions powered by AI. Upload your photo and receive instant style reports tailored to your body type and preferences."
        keywords="AI stylist, personal stylist, fashion recommendations, color analysis, style advice, outfit suggestions, hairstyle recommendations, body type analysis, personal color palette, fashion consultant, style tips, wardrobe consultation"
        ogUrl="https://doesitfit.dev/"
      />
      <div className="min-h-screen flex flex-col relative">

        {/* Hero Section */}
        <section className="px-6 py-44 md:py-60">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">

              {/* Badge */}
              <div className="mb-8 flex justify-center">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900/8 border border-gray-900/12 text-gray-700 text-sm font-medium tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  AI-Powered Personal Styling
                </span>
              </div>

              <h1 className="text-7xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight mb-8 leading-none">
                <span className="text-gray-900">Does it </span>
                <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-clip-text text-transparent">Fit?</span>
              </h1>

              <p className="text-3xl md:text-4xl text-gray-800 font-light max-w-3xl mx-auto leading-relaxed mb-5">
                Your AI Personal Stylist
              </p>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-14">
                Upload your photo. Get a complete, personalized style report — color analysis, outfit ideas, and hairstyle recommendations — in minutes.
              </p>

              {/* CTA */}
              <div className="mb-10">
                <Link
                  to="/try"
                  className="inline-block bg-gray-900 text-white px-16 py-5 rounded-full text-xl font-semibold hover:bg-gray-800 transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  Get Started
                </Link>
              </div>

              {/* Trust signals */}
              <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>No account required</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>One-time payment</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-500" />
                  <span>Instant results</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-24 border-t border-gray-100">
          <div className="max-w-6xl mx-auto space-y-32">

            {/* Feature 1: Personal Color Analysis */}
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/2">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-[40px] p-10 md:p-16 shadow-xl shadow-orange-100/60 border border-orange-100">
                  <div className="flex-1 w-full">
                    <div className="mb-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">Seasonal Palette</span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">Deep Autumn</h3>
                      <p className="text-sm text-gray-500">Warm, rich, earthy tones</p>
                    </div>
                    <div className="grid grid-cols-5 gap-3 mt-6">
                      {[
                        { color: '#8B4513', label: 'Saddle' },
                        { color: '#D2691E', label: 'Chocolate' },
                        { color: '#CD853F', label: 'Peru' },
                        { color: '#DEB887', label: 'Burlywood' },
                        { color: '#F4A460', label: 'Sandy' },
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                          <div className="w-full aspect-square rounded-2xl shadow-md ring-1 ring-black/8" style={{ backgroundColor: item.color }} />
                          <span className="text-xs text-gray-500 font-medium">{item.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-white/70 rounded-2xl border border-orange-100">
                      <p className="text-xs text-amber-700 font-medium">✦ Best colors for your undertone</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                  01 — Personal Color Analysis
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900">
                  Discover Your Perfect Palette
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Our AI analyzes your skin tone, hair, and eye color to determine your seasonal color palette. Get specific HEX codes for colors that complement you best.
                </p>
                <ul className="space-y-3">
                  {[
                    'Seasonal color analysis (Spring, Summer, Autumn, Winter)',
                    'Specific color recommendations with HEX codes',
                    'Colors to avoid for your skin tone',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-4 shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 2: Face Shape Analysis */}
            <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
              <div className="w-full md:w-1/2">
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-[40px] p-10 md:p-16 shadow-xl shadow-violet-100/60 border border-violet-100">
                  <div className="space-y-8">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-4 block">Face Analysis</span>
                      <div className="flex items-end gap-3">
                        <div className="text-4xl font-bold text-violet-600">Oval</div>
                        <div className="mb-1 text-sm text-gray-500 font-medium">Face Shape</div>
                      </div>
                    </div>
                    <div className="bg-white/70 rounded-[24px] p-6 border border-violet-100">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Styling Tips</h4>
                      <ul className="space-y-3">
                        {[
                          'Most hairstyles work well for oval faces',
                          'Avoid extremely long, straight styles',
                          'Side-swept bangs enhance natural symmetry',
                        ].map((rule, i) => (
                          <li key={i} className="text-gray-700 text-sm flex items-start leading-snug">
                            <span className="w-2 h-2 rounded-full bg-violet-400 mt-1.5 mr-3 shrink-0" />
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="text-sm font-semibold text-violet-500 uppercase tracking-wider">
                  02 — Face Shape Analysis
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900">
                  Styled for Your Shape
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Get precise face shape analysis with personalized styling rules for hairstyles, accessories, and necklines.
                </p>
                <ul className="space-y-3">
                  {[
                    'Accurate face shape identification',
                    'Hairstyle suggestions matched to your face',
                    'Neckline and accessory recommendations',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-violet-500 mt-2 mr-4 shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 3: Outfit Recommendations */}
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/2">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[40px] p-10 md:p-16 shadow-xl shadow-blue-100/60 border border-blue-100">
                  <div className="space-y-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3">Curated Look</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">Casual Elegance</h3>
                      <p className="text-sm text-gray-500 mb-4">Perfect for everyday sophistication</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Key Items</h4>
                      <ul className="space-y-2.5">
                        {[
                          { name: 'Navy Blazer', color: 'Navy', dot: '#1e3a8a' },
                          { name: 'White Shirt', color: 'White', dot: '#e5e7eb' },
                          { name: 'Dark Jeans', color: 'Indigo', dot: '#3730a3' },
                          { name: 'Leather Sneakers', color: 'Brown', dot: '#92400e' },
                        ].map((item, i) => (
                          <li key={i} className="bg-white/70 border border-blue-100 rounded-2xl p-3.5 flex items-center gap-4">
                            <div className="w-9 h-9 rounded-xl shrink-0 shadow-sm ring-1 ring-black/8" style={{ backgroundColor: item.dot }} />
                            <div className="flex-1">
                              <div className="font-semibold text-sm text-gray-900">{item.name}</div>
                              <div className="text-xs text-gray-400">{item.color}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="text-sm font-semibold text-blue-500 uppercase tracking-wider">
                  03 — Outfit Recommendations
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900">
                  Complete Style Looks
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Receive fully curated outfit combinations with specific item recommendations for different occasions.
                </p>
                <ul className="space-y-3">
                  {[
                    'Multiple outfit options for various occasions',
                    'Specific item recommendations with colors',
                    'Styling explanations for each look',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-4 shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 4: Hairstyle Recommendations */}
            <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
              <div className="w-full md:w-1/2">
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-[40px] p-10 md:p-16 shadow-xl shadow-rose-100/60 border border-rose-100">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-3 block">AI Generated</span>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">6 Hairstyle Options</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Curtain Bangs', num: 1 },
                        { label: 'Bob Cut', num: 2 },
                        { label: 'Layer Cut', num: 3 },
                        { label: 'Pixie Cut', num: 4 },
                        { label: 'Long Waves', num: 5 },
                        { label: 'Textured Lob', num: 6 },
                      ].map((item) => (
                        <div key={item.num} className="bg-white/70 border border-rose-100 rounded-2xl p-3 flex flex-col items-center gap-2">
                          <div className="w-full aspect-square rounded-xl bg-rose-100/60 flex items-center justify-center">
                            <span className="text-rose-400 text-xl font-bold">{item.num}</span>
                          </div>
                          <span className="text-xs text-gray-600 font-medium text-center leading-tight">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="text-sm font-semibold text-rose-400 uppercase tracking-wider">
                  04 — Hairstyle Recommendations
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900">
                  Perfect Hair for Your Face
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Get AI-generated hairstyle recommendations matched to your face shape, with detailed styling instructions.
                </p>
                <ul className="space-y-3">
                  {[
                    'Multiple hairstyle options with visualizations',
                    'Face shape-matched recommendations',
                    'Step-by-step styling guides',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-rose-400 mt-2 mr-4 shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-6 py-28 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Simple Process</div>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900">
                How It Works
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="text-center">
                <div className="mb-8 relative">
                  <div className="w-full aspect-square border-2 border-dashed border-gray-200 rounded-[28px] bg-gray-50/80 mx-auto flex items-center justify-center hover:border-gray-300 transition-colors">
                    <div className="space-y-3">
                      <div className="w-14 h-14 mx-auto bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-gray-700">Upload photo</p>
                    </div>
                  </div>
                </div>
                <div className="text-5xl font-bold text-gray-100 mb-3 -mt-2">01</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Upload Your Photo</h3>
                <p className="text-gray-500 leading-relaxed">Take or upload a clear photo of yourself. Front-facing works best.</p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="mb-8">
                  <div className="w-full aspect-square bg-white rounded-[28px] p-7 shadow-xl shadow-black/5 border border-gray-100 mx-auto flex flex-col justify-center">
                    <div className="space-y-3">
                      <div className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-left font-medium text-gray-700">
                        170 cm
                      </div>
                      <div className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-left font-medium text-gray-700">
                        Work / Casual
                      </div>
                      <div className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-left text-gray-400">
                        Style preferences...
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-5xl font-bold text-gray-100 mb-3 -mt-2">02</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Enter Details</h3>
                <p className="text-gray-500 leading-relaxed">Provide your height and style preferences to get tailored results.</p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="mb-8">
                  <div className="w-full aspect-square bg-white rounded-[28px] p-7 shadow-xl shadow-black/5 border border-gray-100 mx-auto flex flex-col justify-center">
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-1.5 block">Personal Color</span>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">Deep Autumn</h4>
                        <div className="grid grid-cols-5 gap-2">
                          {['#8B4513', '#D2691E', '#CD853F', '#DEB887', '#F4A460'].map((color, i) => (
                            <div key={i} className="aspect-square rounded-full shadow-md ring-1 ring-black/8" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <span className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-1 block">Face Shape</span>
                        <p className="text-sm font-semibold text-gray-700">Oval</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-5xl font-bold text-gray-100 mb-3 -mt-2">03</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Get Results</h3>
                <p className="text-gray-500 leading-relaxed">Receive your personalized style report instantly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-6 py-28 border-t border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-900 rounded-[40px] px-12 py-20 shadow-2xl relative overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-[40px]" />
              <div className="relative z-10">
                <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Get Started Today</div>
                <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 text-white">
                  Ready to discover your style?
                </h2>
                <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
                  Get your personalized style report in minutes. No account needed.
                </p>
                <Link
                  to="/try"
                  className="inline-block bg-white text-gray-900 px-14 py-5 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
                >
                  Try It Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </SnowBackground>
  )
}
