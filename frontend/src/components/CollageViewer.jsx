export default function CollageViewer({ collage }) {
  const handleDownload = () => {
    // Create download link for base64 image
    const link = document.createElement('a')
    link.href = `data:${collage.mime};base64,${collage.base64}`
    link.download = 'hairstyle-collage.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="space-y-4 pt-8 border-t border-border">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Hairstyle Recommendations</h3>
        <button
          onClick={handleDownload}
          className="px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          Download
        </button>
      </div>

      {/* Collage Image */}
      <div className="rounded-lg overflow-hidden border border-border">
        <img
          src={`data:${collage.mime};base64,${collage.base64}`}
          alt="Hairstyle recommendations collage"
          className="w-full"
        />
      </div>

      <p className="text-sm text-secondary italic text-center">{collage.note}</p>
    </section>
  )
}
