import { useEffect } from 'react'

export default function SEO({
  title,
  description,
  keywords,
  ogImage,
  ogUrl
}) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description)
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle && title) {
      ogTitle.setAttribute('content', title)
    }

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc && description) {
      ogDesc.setAttribute('content', description)
    }

    const ogUrlTag = document.querySelector('meta[property="og:url"]')
    if (ogUrlTag && ogUrl) {
      ogUrlTag.setAttribute('content', ogUrl)
    }

    if (ogImage) {
      const ogImg = document.querySelector('meta[property="og:image"]')
      if (ogImg) {
        ogImg.setAttribute('content', ogImage)
      }
    }

    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.setAttribute('name', 'keywords')
      document.head.appendChild(metaKeywords)
    }
    if (keywords) {
      metaKeywords.setAttribute('content', keywords)
    }

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical && ogUrl) {
      canonical.setAttribute('href', ogUrl)
    }
  }, [title, description, keywords, ogImage, ogUrl])

  return null
}
