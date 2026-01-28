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
    <form onSubmit={handleSubmit} className="space-y-8 max-w-xl mx-auto">
      {/* Photo Upload */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">
          Photo <span className="text-red-500">*</span>
        </label>

        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handlePhotoChange}
            className="hidden"
            id="photo-upload"
          />
          <label htmlFor="photo-upload" className="cursor-pointer">
            {photoPreview ? (
              <div className="space-y-4">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-lg"
                />
                <p className="text-sm text-secondary">Click to change photo</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-4xl">📸</div>
                <p className="font-medium">Click to upload photo</p>
                <p className="text-sm text-secondary">JPG, PNG, or WebP (max 8MB)</p>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Height (Required) */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">
          Height (cm) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="170"
          min="1"
          max="300"
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>

      {/* Occasion (Required) */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">
          Occasion <span className="text-red-500">*</span>
        </label>
        <select
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
      <div className="space-y-3">
        <label className="block text-sm font-medium">Weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="70 (optional)"
          min="1"
          max="500"
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Style Vibe (Optional) */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">Style Vibe</label>
        <select
          value={styleVibe}
          onChange={(e) => setStyleVibe(e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select style (optional)</option>
          <option value="Minimal">Minimal</option>
          <option value="Street">Street</option>
          <option value="Casual">Casual</option>
          <option value="Classic">Classic</option>
          <option value="Sporty">Sporty</option>
        </select>
      </div>

      {/* Fit Preference (Optional) */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">Fit Preference</label>
        <select
          value={fitPreference}
          onChange={(e) => setFitPreference(e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select fit (optional)</option>
          <option value="Slim-No">Slim-No</option>
          <option value="Oversized-No">Oversized-No</option>
          <option value="Doesn't matter">Doesn't matter</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary text-white px-6 py-4 rounded-lg font-medium text-lg hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-4"
      >
        Generate Report
      </button>

      <p className="text-xs text-center text-secondary">
        Your photo will be processed in-memory only and never stored
      </p>
    </form>
  )
}
