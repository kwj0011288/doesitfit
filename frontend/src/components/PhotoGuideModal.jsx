import { X } from 'lucide-react'
import yesImage from '../images/yes.png'
import no1Image from '../images/no_1.png'
import no2Image from '../images/no_2.png'

export default function PhotoGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[32px] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl modal-scroll" style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#d1d5db transparent'
      }}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-[32px]">
          <h2 className="text-3xl font-bold text-gray-900">Photo Guidelines</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-8 space-y-12">
          {/* Introduction */}
          <div className="text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              For the best style analysis results, please upload a clear, front-facing photo of yourself.
            </p>
          </div>

          {/* Real Photo Examples */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Photo Examples</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Good Example */}
              <div className="space-y-3">
                <div className="aspect-[3/4] rounded-[24px] overflow-hidden border-2 border-green-500 shadow-lg">
                  <img
                    src={yesImage}
                    alt="Good photo example"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Good Photo
                  </span>
                </div>
              </div>

              {/* Bad Example 1 */}
              <div className="space-y-3">
                <div className="aspect-[3/4] rounded-[24px] overflow-hidden border-2 border-red-500 shadow-lg">
                  <img
                    src={no1Image}
                    alt="Bad photo example 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Bad Photo
                  </span>
                </div>
              </div>

              {/* Bad Example 2 */}
              <div className="space-y-3">
                <div className="aspect-[3/4] rounded-[24px] overflow-hidden border-2 border-red-500 shadow-lg">
                  <img
                    src={no2Image}
                    alt="Bad photo example 2"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Bad Photo
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gray-50 rounded-[24px] p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">💡 Tips</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-black mt-2 mr-4 shrink-0" />
                <span className="text-gray-700">Stand about 3-5 feet away from the camera</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-black mt-2 mr-4 shrink-0" />
                <span className="text-gray-700">Make sure your face and upper body are clearly visible</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-black mt-2 mr-4 shrink-0" />
                <span className="text-gray-700">Remove sunglasses, hats, or anything covering your face</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-black mt-2 mr-4 shrink-0" />
                <span className="text-gray-700">Use a neutral expression for best results</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-black mt-2 mr-4 shrink-0" />
                <span className="text-gray-700">File size should be under 8MB (JPG, PNG, or WebP)</span>
              </li>
            </ul>
          </div>

          {/* Refund Warning */}
          <div className="bg-red-50 border-2 border-red-200 rounded-[24px] p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-red-900 mb-2">Important Notice</h4>
                <p className="text-red-800 leading-relaxed">
                  Please ensure your photo meets the guidelines above. Errors or failures resulting from incorrectly uploaded photos (e.g., side profile, poor quality, wrong format) are not eligible for refunds. We recommend reviewing the examples carefully before submitting.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-6 flex justify-end gap-4 rounded-b-[32px]">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose()
              // Trigger file input after modal closes
              setTimeout(() => {
                const fileInput = document.getElementById('photo-upload')
                if (fileInput) {
                  fileInput.click()
                }
              }, 100)
            }}
            className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Select Photo
          </button>
        </div>
      </div>
    </div>
  )
}
