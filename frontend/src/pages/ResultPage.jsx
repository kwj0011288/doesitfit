import { useLocation, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
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

  // State to store real Unsplash image DATA
  // format: { [key]: { url: string, user: { name: string, link: string } } }
  const [imageData, setImageData] = useState({})

  // Build query functions using new schema fields
  const buildOutfitQuery = (outfit, gender) => {
    const g = gender ? `${gender} ` : ''
    const tags = outfit?.diversity_tags || {}
    // Use diversity_tags for more stable and diverse queries
    return `${g}${tags.formality || ''} ${tags.silhouette || ''} outfit ${tags.color_family || ''} ${tags.shoe_type || ''}`.trim()
  }

  const buildItemQuery = (item, gender) => {
    const g = gender ? `${gender} ` : ''
    // category is now required in backend schema
    const base = item?.image_query || item?.name || ''
    const cat = item?.category ? `${item.category} ` : ''
    return `${g}${cat}${base}`.trim()
  }

  const buildHairQuery = (hair, gender) => {
    const g = gender ? `${gender} ` : ''
    const t = hair?.traits || {}
    // Use traits to reduce repetitive results
    const base = hair?.image_query || hair?.name || 'hairstyle'
    return `${g}${base} ${t.length || ''} ${t.silhouette || ''} ${t.part || ''} ${t.texture || ''}`.trim()
  }

  // Query Plan: stable keys based on the updated schema
  const queryPlan = useMemo(() => {
    if (!result) return { keys: [], keyToQuery: {} }

    const gender = result.gender || ''
    const keyToQuery = {}
    const keys = []

      // Outfits
      ; (result.outfits || []).forEach((outfit, i) => {
        const outfitKey = `outfit:${i}`
        const outfitQuery = buildOutfitQuery(outfit, gender)
        keyToQuery[outfitKey] = outfitQuery
        keys.push(outfitKey)

          // Items
          ; (outfit.items || []).forEach((item, j) => {
            const itemKey = `outfit:${i}:item:${j}:${item?.category || 'item'}`
            const itemQuery = buildItemQuery(item, gender)
            keyToQuery[itemKey] = itemQuery
            keys.push(itemKey)
          })
      })

      // Hairstyles
      ; (result.hairstyles || []).forEach((hair) => {
        const idx = hair?.index ?? 0
        const hairKey = `hair:${idx}`
        const hairQuery = buildHairQuery(hair, gender)
        keyToQuery[hairKey] = hairQuery
        keys.push(hairKey)
      })

    // Deduplicate keys
    const uniqueKeys = Array.from(new Set(keys))
    return { keys: uniqueKeys, keyToQuery }
  }, [result])

  // 2. Async Image Fetching (Unsplash API)
  useEffect(() => {
    if (!result || !queryPlan.keys.length) return

    const fetchImages = async () => {
      const newMap = { ...imageData }

      const promises = queryPlan.keys.map(async (key) => {
        if (newMap[key]) return

        const query = queryPlan.keyToQuery[key]
        if (!query) return

        // No key -> fallback
        if (!UNSPLASH_ACCESS_KEY || String(UNSPLASH_ACCESS_KEY).includes('your_unsplash')) {
          newMap[key] = getFallbackData(query)
          return
        }

        try {
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
              newMap[key] = {
                url: photo.urls.regular,
                user: {
                  name: photo.user.name,
                  link: photo.user.links.html
                },
                download_location: photo.links.download_location
              }
              return
            }
          }

          throw new Error('No results')
        } catch (err) {
          newMap[key] = getFallbackData(query)
        }
      })

      await Promise.all(promises)
      setImageData(newMap)
    }

    fetchImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  // Helper: Curated Fallback Data
  const getFallbackData = (query) => {
    const q = String(query || '').toLowerCase()
    const dict = [
      ['blazer', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80', 'Medienstürmer'],
      ['suit', 'https://images.unsplash.com/photo-1520975958225-2b7e3b3f3c2e?w=600&q=80', 'Hunters Race'],
      ['jacket', 'https://images.unsplash.com/photo-1551028919-ac6635f0e5c9?w=600&q=80', 'Tobias Tullius'],
      ['shirt', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', 'Nimble Made'],
      ['jean', 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600&q=80', 'Jason Leung'],
      ['denim', 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600&q=80', 'Jason Leung'],
      ['pant', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80', 'Katsiaryna Endruszkiewicz'],
      ['trouser', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80', 'Katsiaryna Endruszkiewicz'],
      ['sneaker', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80', 'Lefteris kallergis'],
      ['loafer', 'https://images.unsplash.com/photo-1528701800489-20be9c1f27f9?w=600&q=80', 'Paul Volkmer'],
      ['boot', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', 'Nike'],
      ['heel', 'https://images.unsplash.com/photo-1528701800489-20be9c1f27f9?w=600&q=80', 'Paul Volkmer'],
      ['bag', 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80', 'Emma Matthews Digital Content Production'],
      ['accessory', 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80', 'Sarah Dorweiler'],
      ['hair', 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&q=80', 'Icons8'],
      ['hairstyle', 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&q=80', 'Icons8'],
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

  const getImageByKey = (key) => {
    return imageData[key] || {
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
        keywords="style report, fashion report, color analysis, body type analysis, hairstyle recommendations, outfit suggestions"
        ogUrl="https://doesitfit.dev/result"
      />

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
                        {result.analysis?.body_shape || 'Analyzed'}
                      </div>
                    </div>
                    <div className="w-px h-12 bg-gray-200 hidden md:block" />
                    <div className="space-y-1">
                      <span className="text-sm text-[#86868B]">Face Shape</span>
                      <div className="text-3xl font-bold text-[#AF52DE]">
                        {result.analysis?.face_shape || 'Analyzed'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Analysis Notes</h3>
                  <p className="text-[#424245] leading-relaxed text-lg">
                    {result.analysis?.notes}
                  </p>
                </div>
              </div>

              {/* Right Side: Styling Rules */}
              <div className="bg-[#F5F5F7] rounded-[32px] p-8 md:p-10">
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#86868B] mb-8">Actionable Styling Rules</h4>
                <ul className="space-y-5">
                  {(result.styling_rules || []).map((rule, i) => (
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
                const outfitKey = `outfit:${i}`
                const mainImg = getImageByKey(outfitKey)

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

                      {/* Why it works */}
                      {outfit.why_it_works && (
                        <div className="bg-[#F5F5F7] rounded-2xl p-6">
                          <h4 className="text-sm font-bold uppercase tracking-widest text-[#86868B] mb-2">Why it works</h4>
                          <p className="text-[#424245] leading-relaxed">
                            {outfit.why_it_works}
                          </p>
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-[#86868B] mb-4">Key Items</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {outfit.items?.map((item, j) => {
                            const itemKey = `outfit:${i}:item:${j}:${item?.category || 'item'}`
                            const itemImg = getImageByKey(itemKey)

                            return (
                              <li key={j} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden group/item">
                                <div className="w-16 h-16 rounded-xl bg-gray-100 shrink-0 overflow-hidden relative">
                                  <img src={itemImg.url} alt={item.name} className="w-full h-full object-cover opacity-90" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-sm truncate">{item.name}</div>
                                  <div className="text-xs text-[#86868B]">
                                    {item.color}
                                    {item.category ? ` · ${item.category}` : ''}
                                  </div>

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

              {/* 2x3 Grid Image (Sticky) - Gemini Generated, no Unsplash credit needed */}
              <div className="w-full lg:w-1/3 lg:sticky lg:top-24">
                <div className="bg-black rounded-[32px] shadow-2xl p-2 max-w-md mx-auto relative group overflow-hidden">
                  {mainImage ? (
                    <img
                      src={mainImage}
                      alt="AI Generated Hairstyles 2x3 Grid"
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
                  {result.hairstyles.map((hair, i) => {
                    const idx = hair?.index ?? i

                    return (
                      <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs shadow shrink-0">
                            {idx}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-[#1D1D1F] leading-tight truncate">
                              {hair.name}
                            </h3>
                          </div>
                        </div>
                        <p className="text-sm text-[#86868B] leading-relaxed mt-2">
                          {hair.description}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </section>
        )}

        <footer className="text-center pt-20 pb-10 border-t border-gray-200 mt-20">
          <p className="text-[#86868B] text-sm font-medium mb-8">Generated by Does it Fit?</p>
          <button
            onClick={() => navigate('/')}
            className="inline-block bg-black text-white px-8 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
          >
            Start Over
          </button>
        </footer>

      </div>
    </div>
  )
}
