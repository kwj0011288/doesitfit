import { useState } from 'react'

export default function TryForm({ onSubmit }) {
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [height, setHeight] = useState('')
  const [occasion, setOccasion] = useState('')
  const [weight, setWeight] = useState('')
  const [styleVibe, setStyleVibe] = useState('')
  const [fitPreference, setFitPreference] = useState('')

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (8MB)
      if (file.size > 8 * 1024 * 1024) {
        alert('File size must be less than 8MB')
        return
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        alert('Please upload a JPG, PNG, or WebP image')
        return
      }

      setPhoto(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!photo) {
      alert('Please upload a photo')
      return
    }

    if (!height || height <= 0) {
      alert('Please enter your height')
      return
    }

    if (!occasion) {
      alert('Please select an occasion')
      return
    }

    // Build FormData
    const formData = new FormData()
    formData.append('photo', photo)
    formData.append('height_cm', height)
    formData.append('occasion', occasion)

    // Add checkout_id from localStorage if available
    const checkoutId = localStorage.getItem('checkout_id')
    if (checkoutId) {
      formData.append('checkout_id', checkoutId)
    }

    if (weight) formData.append('weight_kg', weight)
    if (styleVibe) formData.append('style_vibe', styleVibe)
    if (fitPreference) formData.append('fit_preference', fitPreference)

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-16">
      {/* Left Side: Photo Upload */}
      <div className="w-full md:w-1/2">
        <div className="sticky top-24">
          <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
            Upload Photo
          </label>

          <div className="border-2 border-dashed border-gray-300 rounded-[32px] p-12 text-center hover:border-gray-400 transition-colors bg-gray-50">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoChange}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer block">
              {photoPreview ? (
                <div className="space-y-6">
                  <div className="relative aspect-[3/4] max-w-md mx-auto rounded-[24px] overflow-hidden shadow-xl">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-500">Click to change photo</p>
                </div>
              ) : (
                <div className="space-y-4 py-12">
                  <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-black mb-2">Click to upload photo</p>
                    <p className="text-sm text-gray-500">JPG, PNG, or WebP (max 8MB)</p>
                  </div>
                </div>
              )}
            </label>
          </div>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Your photo will be processed in-memory only and never stored
          </p>
        </div>
      </div>

      {/* Right Side: Form Fields */}
      <div className="w-full md:w-1/2 space-y-8">
        <div>
          <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Your Information
          </label>
        </div>

        {/* Height (Required) */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Height (cm) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="170"
            min="1"
            max="300"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
            required
          />
        </div>

        {/* Occasion (Required) */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Occasion <span className="text-red-500">*</span>
          </label>
          <select
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
            required
          >
            <option value="">Select occasion</option>
            <option value="Daily">Daily</option>
            <option value="Work">Work</option>
            <option value="Date">Date</option>
            <option value="Interview">Interview</option>
            <option value="Party">Party</option>
          </select>
        </div>

        {/* Weight (Optional) */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Weight (kg) <span className="text-gray-400 text-xs font-normal">(optional)</span>
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            min="1"
            max="500"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
          />
        </div>

        {/* Style Vibe (Optional) */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Style Vibe <span className="text-gray-400 text-xs font-normal">(optional)</span>
          </label>
          <select
            value={styleVibe}
            onChange={(e) => setStyleVibe(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
          >
            <option value="">Select style</option>
            <option value="Minimal">Minimal</option>
            <option value="Street">Street</option>
            <option value="Casual">Casual</option>
            <option value="Classic">Classic</option>
            <option value="Sporty">Sporty</option>
          </select>
        </div>

        {/* Fit Preference (Optional) */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Fit Preference <span className="text-gray-400 text-xs font-normal">(optional)</span>
          </label>
          <select
            value={fitPreference}
            onChange={(e) => setFitPreference(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
          >
            <option value="">Select fit</option>
            <option value="Slim-No">Slim-No</option>
            <option value="Oversized-No">Oversized-No</option>
            <option value="Doesn't matter">Doesn't matter</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-black text-white px-6 py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Generate Report
          </button>
        </div>
      </div>
    </form>
  )
}
