import { useLocation, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SEO from '../components/SEO'

// You can add your key in .env as VITE_UNSPLASH_ACCESS_KEY
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export default function ResultPage() {
  const { state } = useLocation()
  const navigate = useNavigate()

  // 1. Get Result
  const [result] = useState(() => {
    if (state?.result) return state.result
    try {
      const stored = sessionStorage.getItem('latest_result')
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })

  // State to store real Unsplash image DATA (url + credit)
  // format: { "query": { url: string, user: { name: string, link: string } } }
  const [imageData, setImageData] = useState({})

  // 2. Async Image Fetching (Strict Unsplash API + Attribution)
  useEffect(() => {
    if (!result) return

    const fetchImages = async () => {
      const queries = new Set()
      const gender = result.gender || '' // Get gender from result

      // Collect queries with gender context
      result.outfits?.forEach(outfit => {
        const outfitQuery = gender ? `${gender} ${outfit.title}` : outfit.title
        queries.add(outfitQuery)
        outfit.items?.forEach(item => {
          const itemQuery = gender ? `${gender} ${item.image_query || item.name}` : (item.image_query || item.name)
          queries.add(itemQuery)
        })
      })
      result.hairstyles?.forEach(hair => {
        const hairQuery = gender ? `${gender} ${hair.image_query || hair.name}` : (hair.image_query || hair.name)
        queries.add(hairQuery)
      })

      const newMap = { ...imageData }
      const promises = Array.from(queries).map(async (query) => {
        if (newMap[query]) return

        // A. Check for API Key
        if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY.includes('your_unsplash')) {
          // No key -> Manual Fallback with Mock Credit
          newMap[query] = getFallbackData(query)
          return
        }

        try {
          // B. Call Unsplash Search API with gender in query
          const res = await fetch(
            `https://api.unsplash.com/search/photos?page=1&per_page=1&query=${encodeURIComponent(query)}&orientation=portrait`,
            {
              headers: {
                'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
              }
            }
          )

          if (res.ok) {
            const data = await res.json()
            const photo = data.results?.[0]
            if (photo) {
              // Store Data for Hotlinking & Attribution
              newMap[query] = {
                url: photo.urls.regular, // Hotlinking allowed
                user: {
                  name: photo.user.name,
                  link: photo.user.links.html // Link to photographer profile
                },
                download_location: photo.links.download_location // Required for tracking (optional implementation)
              }
              return
            }
          }

          throw new Error('No results')

        } catch (err) {
          // C. Fallback
          newMap[query] = getFallbackData(query)
        }
      })

      await Promise.all(promises)
      setImageData(newMap)
    }

    fetchImages()
  }, [result])

  // Helper: Curated Fallback Data (URL + Mock Credit)
  const getFallbackData = (query) => {
    const q = query.toLowerCase()
    // [Keyword, URL, Photographer Name]
    const dict = [
      ['blazer', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80', 'Medienstürmer'],
      ['jacket', 'https://images.unsplash.com/photo-1551028919-ac6635f0e5c9?w=600&q=80', 'Tobias Tullius'],
      ['shirt', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', 'Nimble Made'],
      ['jean', 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600&q=80', 'Jason Leung'],
      ['denim', 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600&q=80', 'Jason Leung'],
      ['pant', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80', 'Katsiaryna Endruszkiewicz'],
      ['sneaker', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80', 'Lefteris kallergis'],
      ['shoe', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80', 'Camila Damásio'],
      ['hair', 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&q=80', 'Icons8'],
    ]

    const match = dict.find(([k]) => q.includes(k))
    if (match) {
      return {
        url: match[1],
        user: { name: match[2], link: 'https://unsplash.com' }
      }
    }

    return {
      url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80',
      user: { name: 'Unsplash', link: 'https://unsplash.com' }
    }
  }

  const getImage = (query) => {
    return imageData[query] || {
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&q=20&blur=2',
      user: null
    }
  }

  // Component: Unsplash Attribution Overlay
  const PhotoCredit = ({ user, className = '' }) => {
    if (!user) return null
    return (
      <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white/90 pointer-events-auto whitespace-nowrap shadow-sm border border-white/10 ${className}`}>
        Photo by <a href={`${user.link}?utm_source=style_app&utm_medium=referral`} target="_blank" rel="noopener noreferrer" className="hover:text-white font-medium underline decoration-white/50">{user.name}</a> on <a href="https://unsplash.com/?utm_source=style_app&utm_medium=referral" target="_blank" rel="noopener noreferrer" className="hover:text-white">Unsplash</a>
      </div>
    )
  }

  if (!result) return <Navigate to="/try" replace />
  const mainImage = result.generated_outfit_image ? `data:image/jpeg;base64,${result.generated_outfit_image}` : null

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-[#0071E3] selection:text-white pb-32">
      <SEO
        title="Your Style Report - Does it Fit?"
        description="View your personalized style report with color analysis, body type assessment, outfit recommendations, and hairstyle suggestions."
        keywords="style report, fashion report, color analysis report, body type report, hairstyle report, outfit recommendations, style recommendations, fashion recommendations, color recommendations, hairstyle recommendations, personal style report, custom style report, AI style report, style analysis results, fashion analysis results, color analysis results, body type results, hairstyle results, outfit suggestions, style suggestions, fashion suggestions, color suggestions, hairstyle suggestions, best colors for me, best outfits for me, best hairstyles for me, what suits me, what looks good on me, style guide for me, fashion guide for me, color guide for me, hairstyle guide for me"
        ogUrl="https://doesitfit.dev/result"
      />

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#F5F5F7]/80 backdrop-blur-md border-b border-gray-200 px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <span className="font-semibold tracking-tight text-xl">Style Report</span>
          <button onClick={() => navigate('/try')} className="text-sm text-[#0071E3] hover:underline">Start Over</button>
        </div>
      </nav>

      <div className="max-w-screen-xl mx-auto px-6 pt-12">
        {/* Header, Color, Body sections unchanged... (omitted for brevity, assume same structure) */}

        <header className="mb-20 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 text-black">
            Your Style, <br /><span className="text-[#6E6E73]">Redefined.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#86868B] font-medium leading-relaxed">
            A detailed analysis tailored to your unique features.
          </p>
        </header>

        {/* 1. PERSONAL COLOR */}
        {result.personal_color && (
          <section className="mb-32">
            <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-xl shadow-black/5 flex flex-col md:flex-row gap-16 items-start border border-gray-100/50">
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#86868B] mb-2 block">Personal Color</span>
                <h2 className="text-4xl md:text-5xl font-semibold mb-6">{result.personal_color.season}</h2>
                <p className="text-xl text-[#424245] leading-relaxed">{result.personal_color.description}</p>
              </div>
              <div className="flex-1 w-full">
                <h3 className="text-sm font-semibold text-[#1D1D1F] mb-6">Curated Palette</h3>
                <div className="grid grid-cols-5 gap-4">
                  {result.personal_color.palette?.map((color, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 group">
                      <div className="w-full aspect-square rounded-full shadow-inner ring-1 ring-black/5" style={{ backgroundColor: color }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- 2. STRUCTURAL ANALYSIS (Combined Card) --- */}
        <section className="mb-32">
          <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-xl shadow-black/5 border border-gray-100/50">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              {/* Left Side: Summary & Notes */}
              <div className="space-y-10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#86868B] mb-6 block">Structural Analysis</span>
                  <div className="flex flex-wrap gap-8">
                    <div className="space-y-1">
                      <span className="text-sm text-[#86868B]">Body Shape</span>
                      <div className="text-3xl font-bold text-[#0071E3]">
                        {result.analysis?.body_shape || result.body_analysis?.shape || 'Analyzed'}
                      </div>
                    </div>
                    <div className="w-px h-12 bg-gray-200 hidden md:block" />
                    <div className="space-y-1">
                      <span className="text-sm text-[#86868B]">Face Shape</span>
                      <div className="text-3xl font-bold text-[#AF52DE]">
                        {result.analysis?.face_shape || result.face_shape || 'Analyzed'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Analysis Notes</h3>
                  <p className="text-[#424245] leading-relaxed text-lg">
                    {result.analysis?.notes || result.body_analysis?.description}
                  </p>
                </div>
              </div>

              {/* Right Side: Styling Rules */}
              <div className="bg-[#F5F5F7] rounded-[32px] p-8 md:p-10">
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#86868B] mb-8">Actionable Styling Rules</h4>
                <ul className="space-y-5">
                  {(result.styling_rules || result.body_analysis?.styling_rules)?.map((rule, i) => (
                    <li key={i} className="text-[#1D1D1F] text-base flex items-start leading-snug">
                      <span className="w-2 h-2 rounded-full bg-black mt-2 mr-4 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>


        {/* --- 3. OUTFITS --- */}
        {result.outfits && (
          <section className="mb-32">
            <h2 className="text-4xl font-semibold mb-12 text-center text-[#1D1D1F]">Curated Looks</h2>
            {!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY.includes('your_unsplash') ? (
              <div className="max-w-lg mx-auto mb-10 p-4 bg-yellow-50 text-yellow-800 rounded-xl text-center text-sm border border-yellow-200">
                ⚠️ Add your Unsplash Access Key to .env for best quality images.
              </div>
            ) : null}

            <div className="space-y-24">
              {result.outfits.map((outfit, i) => {
                const gender = result.gender || ''
                const outfitQuery = gender ? `${gender} ${outfit.title}` : outfit.title
                const mainImg = getImage(outfitQuery)
                return (
                  <div key={i} className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Image Side */}
                    <div className="w-full lg:w-1/2">
                      <div className="aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl shadow-black/10 relative group">
                        <img
                          src={mainImg.url}
                          alt={outfit.title}
                          className="w-full h-full object-cover transition-opacity duration-500"
                        />
                        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">
                          Look 0{i + 1}
                        </div>
                        {/* Unsplash Attribution */}
                        <PhotoCredit user={mainImg.user} />
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 space-y-8">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#1D1D1F]">{outfit.title}</h3>
                        <p className="text-xl text-[#424245] leading-relaxed">
                          {outfit.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-[#86868B] mb-4">Key Items</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {outfit.items?.map((item, j) => {
                            const gender = result.gender || ''
                            const itemQuery = gender ? `${gender} ${item.image_query || item.name}` : (item.image_query || item.name)
                            const itemImg = getImage(itemQuery)
                            return (
                              <li key={j} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden group/item">
                                <div className="w-16 h-16 rounded-xl bg-gray-100 shrink-0 overflow-hidden relative">
                                  <img src={itemImg.url} className="w-full h-full object-cover opacity-90" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-sm truncate">{item.name}</div>
                                  <div className="text-xs text-[#86868B]">{item.color}</div>

                                  {/* Mini Credit for items */}
                                  {itemImg.user && (
                                    <a href={itemImg.user.link} target="_blank" rel="noreferrer" className="text-[9px] text-gray-400 mt-1 block hover:underline truncate">
                                      by {itemImg.user.name}
                                    </a>
                                  )}
                                </div>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* --- 4. HAIRSTYLES --- */}
        {result.hairstyles && (
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-semibold mb-4">Hairstyle Recommendations</h2>
              <p className="text-[#86868B] text-lg">AI-Generated Visualization & Real Examples</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

              {/* 3x3 Grid Image (Sticky) - Gemini Generated, no Unsplash credit needed */}
              <div className="w-full lg:w-1/3 lg:sticky lg:top-24">
                <div className="bg-black rounded-[32px] shadow-2xl p-2 max-w-md mx-auto relative group overflow-hidden">
                  {mainImage ? (
                    <img
                      src={mainImage}
                      alt="AI Generated Hairstyles 3x3 Grid"
                      className="w-full h-auto object-contain rounded-[24px] border border-white/10"
                    />
                  ) : (
                    <div className="aspect-square bg-[#1c1c1e] rounded-[24px] flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <span className="text-4xl block mb-2">💈</span>
                        Generating Preview...
                      </div>
                    </div>
                  )}
                </div>
                {/* Caption moved below the image box */}
                <div className="text-center mt-4">
                  <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs font-medium text-gray-500 shadow-sm">
                    Match numbers with list →
                  </span>
                </div>
              </div>

              {/* Right Side: List */}
              <div className="w-full lg:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result.hairstyles.map((hair, i) => (
                    <div key={i} className="flex flex-col bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md transform -translate-y-1">
                          {hair.index !== undefined ? hair.index : i}
                        </span>
                        <h3 className="text-lg font-bold text-[#1D1D1F] leading-tight">{hair.name}</h3>
                      </div>
                      <p className="text-sm text-[#86868B] leading-relaxed">
                        {hair.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        )}

        <footer className="text-center pt-20 pb-10 border-t border-gray-200 mt-20">
          <p className="text-[#86868B] text-sm font-medium">Generated by AI Stylist Pro</p>
        </footer>

      </div>
    </div>
  )
}
