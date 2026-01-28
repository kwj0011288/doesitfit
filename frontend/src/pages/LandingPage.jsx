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
        keywords="AI stylist, personal stylist, fashion recommendations, color analysis, style advice, outfit suggestions, hairstyle recommendations, body type analysis, personal color palette, AI fashion consultant, virtual stylist, online stylist, fashion AI, style AI, personal color analysis, seasonal color analysis, color palette generator, what colors look good on me, best colors for me, body shape analysis, body type stylist, pear shape fashion, apple shape fashion, hourglass fashion, rectangle body type, inverted triangle body, fashion advice, style tips, outfit ideas, wardrobe consultation, personal shopping, fashion consultant online, AI fashion assistant, style quiz, fashion quiz, color quiz, what colors suit me, best hairstyle for me, face shape analysis, hairstyle recommendations, haircut suggestions, what haircut suits me, fashion trends, style guide, personal style, fashion styling, outfit matching, color matching, style matching, fashion coordination, wardrobe styling, personal styling service, online fashion advice, AI powered styling, machine learning fashion, fashion technology, style technology, fashion app, styling app, color consultant, image consultant, personal shopper AI, fashion AI tool, style recommendation engine, outfit generator, style generator, fashion AI platform, virtual wardrobe, digital stylist, automated styling, smart fashion, intelligent styling, fashion AI service, personalized fashion, custom fashion advice, tailored style recommendations, individual style analysis, unique style guide, personal fashion guide, style consultation online, fashion advice online, style help, fashion help, styling help, color help, hairstyle help, outfit help, style suggestions, fashion suggestions, color suggestions, hairstyle suggestions, what to wear, how to dress, dressing tips, fashion tips, style tips, color tips, hairstyle tips, outfit tips, fashion guide, style guide, color guide, hairstyle guide, personal style guide, fashion consultant, style consultant, color consultant, image consultant, wardrobe consultant, personal shopper, fashion advisor, style advisor, color advisor, fashion expert, style expert, color expert, fashion professional, style professional, color professional"
        ogUrl="https://doesitfit.dev/"
      />
      <div className="min-h-screen flex flex-col relative">
        {/* Hero Section */}
        <section className="px-6 py-40 md:py-56">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <div className="mb-8">
                {/* Discount Pill with Code */}
                <div className="mb-6 flex justify-center">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md text-gray-900 text-sm font-semibold shadow-lg hover:shadow-xl border border-gray-200/50 transition-all group"
                  >
                    <span>First 1 Month Discount</span>
                    <span className="w-px h-4 bg-gray-300"></span>
                    <code className="text-sm font-mono font-bold tracking-wider text-gray-900">
                      {discountCode}
                    </code>
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                    )}
                  </button>
                </div>

                <h1 className="text-7xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight mb-8 text-gray-900 leading-none">
                  Does it Fit?
                </h1>
              </div>

              <p className="text-3xl md:text-4xl text-gray-800 font-light max-w-3xl mx-auto leading-relaxed mb-6">
                Your AI Personal Stylist
              </p>
              <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-12">
                Get personalized fashion recommendations, color analysis, and hairstyle suggestions based on your photo.
              </p>

              {/* CTA */}
              <div className="mb-8">
                <Link
                  to="/try"
                  className="inline-block bg-gray-900 text-white px-16 py-5 rounded-full text-xl font-semibold hover:bg-gray-800 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Link>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>No account required</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>One-time payment</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>Instant results</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-24 border-t border-transparent">
          <div className="max-w-6xl mx-auto space-y-32">

            {/* Feature 1: Personal Color Analysis - Left Image, Right Content */}
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-xl shadow-black/5 border border-gray-100/50">
                  <div className="flex-1 w-full">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">Personal Color</h3>
                    <div className="grid grid-cols-5 gap-4">
                      {['#8B4513', '#D2691E', '#CD853F', '#DEB887', '#F4A460'].map((color, i) => (
                        <div key={i} className="flex flex-col items-center gap-3">
                          <div className="w-full aspect-square rounded-full shadow-inner ring-1 ring-black/5" style={{ backgroundColor: color }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Personal Color Analysis
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900">
                  Discover Your Perfect Palette
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Our AI analyzes your skin tone, hair, and eye color to determine your seasonal color palette. Get specific HEX codes for colors that complement you best.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-gray-900 mt-2 mr-4 shrink-0" />
                    <span className="text-gray-700">Seasonal color analysis (Spring, Summer, Autumn, Winter)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-gray-900 mt-2 mr-4 shrink-0" />
                    <span className="text-gray-700">Specific color recommendations with HEX codes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-gray-900 mt-2 mr-4 shrink-0" />
                    <span className="text-gray-700">Colors to avoid for your skin tone</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2: Body Type Analysis - Right Image, Left Content */}
            <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-xl shadow-black/5 border border-gray-100/50">
                  <div className="space-y-10">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 block">Structural Analysis</span>
                      <div className="flex flex-wrap gap-8">
                        <div className="space-y-1">
                          <span className="text-sm text-gray-500">Body Shape</span>
                          <div className="text-3xl font-bold text-blue-600">
                            Rectangle
                          </div>
                        </div>
                        <div className="w-px h-12 bg-gray-200" />
                        <div className="space-y-1">
                          <span className="text-sm text-gray-500">Face Shape</span>
                          <div className="text-3xl font-bold text-purple-600">
                            Oval
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-[32px] p-8">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Styling Rules</h4>
                      <ul className="space-y-4">
                        {['Emphasize waist definition', 'Opt for structured silhouettes', 'Balance proportions with layering'].map((rule, i) => (
                          <li key={i} className="text-black text-base flex items-start leading-snug">
                            <span className="w-2 h-2 rounded-full bg-black mt-2 mr-4 shrink-0" />
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Body Type Analysis
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900">
                  Styled for Your Shape
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Get precise body and face shape analysis with actionable styling rules tailored to your unique proportions.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-gray-900 mt-2 mr-4 shrink-0" />
                    <span className="text-gray-700">Detailed body shape identification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-gray-900 mt-2 mr-4 shrink-0" />
                    <span className="text-gray-700">Face shape analysis for hairstyles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-gray-900 mt-2 mr-4 shrink-0" />
                    <span className="text-gray-700">Personalized styling rules and tips</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3: Outfit Recommendations - Left Image, Right Content */}
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-xl shadow-black/5 border border-gray-100/50">
                  <div className="space-y-8">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Curated Look</div>
                      <h3 className="text-3xl font-bold mb-4">Casual Elegance</h3>
                      <p className="text-xl text-gray-600 leading-relaxed mb-6">
                        Perfect for everyday sophistication
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Key Items</h4>
                      <ul className="space-y-3">
                        {[
                          { name: 'Navy Blazer', color: 'Navy' },
                          { name: 'White Shirt', color: 'White' },
                          { name: 'Dark Jeans', color: 'Indigo' },
                          { name: 'Leather Sneakers', color: 'Brown' }
                        ].map((item, i) => (
                          <li key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gray-200 shrink-0" />
                            <div className="flex-1">
                              <div className="font-semibold text-sm">{item.name}</div>
                              <div className="text-xs text-gray-500">{item.color}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Outfit Recommendations
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900">
                  Complete Style Looks
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Receive fully curated outfit combinations with specific item recommendations for different occasions.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-gray-900 mt-2 mr-4 shrink-0" />
                    <span className="text-gray-700">Multiple outfit options for various occasions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-gray-900 mt-2 mr-4 shrink-0" />
                    <span className="text-gray-700">Specific item recommendations with colors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-gray-900 mt-2 mr-4 shrink-0" />
                    <span className="text-gray-700">Styling explanations for each look</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 4: Hairstyle Recommendations - Right Image, Left Content */}
            <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-[32px] shadow-xl shadow-black/5 border border-gray-100/50 p-2">
                  <div className="aspect-square bg-white rounded-[24px] p-3">
                    <div className="grid grid-cols-3 gap-2 h-full">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <div key={num} className="bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                          <span className="text-gray-600 text-xs font-bold">{num}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Hairstyle Recommendations
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900">
                  Perfect Hair for Your Face
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Get AI-generated hairstyle recommendations matched to your face shape, with detailed styling instructions.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-gray-900 mt-2 mr-4 shrink-0" />
                    <span className="text-gray-700">Multiple hairstyle options with visualizations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-gray-900 mt-2 mr-4 shrink-0" />
                    <span className="text-gray-700">Face shape-matched recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-gray-900 mt-2 mr-4 shrink-0" />
                    <span className="text-gray-700">Step-by-step styling guides</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-6 py-24 border-t border-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 text-gray-900">
                How It Works
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-16">
              {/* Step 1 */}
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-[24px] bg-gray-50 mx-auto flex items-center justify-center">
                    <div className="space-y-3">
                      <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-black">Upload photo</p>
                    </div>
                  </div>
                </div>
                <div className="text-6xl font-bold text-gray-900 mb-4">1</div>
                <h3 className="text-2xl font-medium text-gray-900 mb-3">
                  Upload Your Photo
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Take or upload a clear photo of yourself.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-full aspect-square bg-white rounded-[24px] p-6 shadow-xl shadow-black/5 border border-gray-100/50 mx-auto flex flex-col justify-center">
                    <div className="space-y-3">
                      <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-left">
                        170 cm
                      </div>
                      <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-left">
                        Work
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-6xl font-bold text-gray-900 mb-4">2</div>
                <h3 className="text-2xl font-medium text-gray-900 mb-3">
                  Enter Details
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Provide your height and style preferences.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-full aspect-square bg-white rounded-[24px] p-6 shadow-xl shadow-black/5 border border-gray-100/50 mx-auto flex flex-col justify-center">
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Personal Color</span>
                        <h4 className="text-xl font-semibold mb-2">Deep Autumn</h4>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {['#8B4513', '#D2691E', '#CD853F', '#DEB887', '#F4A460'].map((color, i) => (
                          <div key={i} className="aspect-square rounded-full shadow-inner ring-1 ring-black/5" style={{ backgroundColor: color }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-6xl font-bold text-gray-900 mb-4">3</div>
                <h3 className="text-2xl font-medium text-gray-900 mb-3">
                  Get Results
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Receive your personalized style report instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-6 py-24 border-t border-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 text-gray-900">
              Ready to discover your style?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Get your personalized style report in minutes.
            </p>
            <Link
              to="/try"
              className="inline-block bg-black text-white px-12 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </SnowBackground>
  )
}
