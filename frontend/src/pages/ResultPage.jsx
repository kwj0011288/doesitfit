import ReportView from '../components/ReportView'
import CollageViewer from '../components/CollageViewer'
import { Link } from 'react-router-dom'

// Mock data for testing UI without backend
const mockResult = {
  result: {
    summary: [
      "Your balanced proportions work well with structured silhouettes",
      "Medium build allows versatility in both fitted and relaxed styles",
      "Focus on clean lines and quality fabrics for a polished look"
    ],
    body_fit: {
      overall: "You have a well-proportioned build that works with a variety of styles. Your height allows you to experiment with both slim and relaxed fits.",
      do: [
        "Opt for well-fitted shirts that follow your shoulder line",
        "Try straight-leg or slim-fit pants for a clean silhouette",
        "Layer with structured jackets or blazers",
        "Choose mid-rise bottoms for balanced proportions"
      ],
      avoid: [
        "Overly baggy clothes that hide your frame",
        "Extremely tight fits that restrict movement",
        "Very long, oversized jackets that overwhelm"
      ]
    },
    colors: {
      best: [
        "Navy blue",
        "Charcoal grey",
        "Olive green",
        "Burgundy",
        "Cream",
        "Black"
      ],
      avoid: [
        "Neon colors",
        "Very pale pastels",
        "Overly bright oranges"
      ],
      notes: "Neutral and earth tones will complement your features best. You can add pops of color with accessories or layering pieces."
    },
    outfits: [
      {
        title: "Classic Work Look",
        items: {
          top: "Crisp white Oxford shirt",
          bottom: "Navy chino pants",
          shoes: "Brown leather loafers",
          outerwear: "Grey blazer"
        },
        why: "This timeless combination works perfectly for work settings. The structured pieces highlight your proportions while maintaining professionalism."
      },
      {
        title: "Smart Casual Date",
        items: {
          top: "Burgundy henley or polo",
          bottom: "Dark denim jeans (slim fit)",
          shoes: "White leather sneakers",
          outerwear: "Olive bomber jacket"
        },
        why: "Balances casual comfort with put-together style. The fitted silhouette looks intentional without being overly formal."
      },
      {
        title: "Weekend Casual",
        items: {
          top: "Neutral crew neck t-shirt",
          bottom: "Black slim joggers or chinos",
          shoes: "Clean minimalist sneakers",
          outerwear: "Denim jacket"
        },
        why: "Comfortable yet stylish. The simple color palette keeps it clean while the fit ensures you look sharp even on casual days."
      }
    ],
    styling_tips: [
      "Keep your wardrobe focused on versatile basics in neutral colors",
      "Invest in well-fitting basics rather than trendy pieces",
      "Use accessories like watches or simple chains to add personality",
      "Make sure your clothes are properly tailored - even small adjustments make a big difference",
      "Stick to one statement piece per outfit to keep it balanced"
    ],
    hairstyles: [
      {
        name: "Textured Quiff",
        why: "Adds height and works well with most face shapes. Modern and versatile.",
        how: "Use a matte pomade. Push hair up and back with slight volume on top. Keep sides shorter."
      },
      {
        name: "Classic Side Part",
        why: "Timeless, professional look. Works great for work or formal occasions.",
        how: "Apply light pomade to damp hair. Comb to one side with a clean part. Use hairspray to hold."
      },
      {
        name: "Textured Crop",
        why: "Low maintenance and contemporary. Great for busy lifestyles.",
        how: "Ask for a textured crop with length on top. Style with sea salt spray for natural texture."
      },
      {
        name: "Slick Back",
        why: "Sophisticated and clean. Perfect for formal events or business settings.",
        how: "Use strong-hold gel or pomade. Comb hair straight back. Keep it neat and polished."
      },
      {
        name: "Messy Fringe",
        why: "Casual and youthful. Works well for creative or casual environments.",
        how: "Keep length on top. Use texturizing spray and tousle with fingers for a lived-in look."
      },
      {
        name: "Buzz Cut (Short)",
        why: "Ultra low maintenance. Clean, masculine appearance.",
        how: "Use clippers with guard #2-4. Even length all over. Perfect for active lifestyles."
      },
      {
        name: "Crew Cut",
        why: "Classic American style. Professional yet easy to maintain.",
        how: "Short on sides, slightly longer on top. Can style with light product or wear natural."
      },
      {
        name: "Modern Pompadour",
        why: "Bold and stylish. Makes a statement while staying classy.",
        how: "Blow dry with volume. Use medium-hold pomade. Push hair up and back with height."
      },
      {
        name: "Curly/Wavy Natural",
        why: "Embraces natural texture. Unique and authentic look.",
        how: "Use curl-defining cream. Let air dry or diffuse. Keep length to show texture."
      }
    ]
  },
  hair_collage: {
    mime: "image/png",
    base64: "placeholder_will_be_generated_by_backend",
    note: "Screenshot and crop any style you like."
  }
}

export default function ResultPage() {
  const handleTryAnother = () => {
    window.location.href = '/try'
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-secondary hover:text-primary text-sm">
            ← Back to Home
          </Link>
        </div>

        {/* Mock Notice */}
        <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800 text-center">
            <strong>Mock Data:</strong> This page shows sample results for UI testing. 
            Connect to backend for real AI analysis.
          </p>
        </div>

        {/* Results */}
        <div className="space-y-8">
          <ReportView report={mockResult.result} onTryAnother={handleTryAnother} />
          
          {/* Placeholder collage instead of real image */}
          <div className="pt-8 border-t border-border">
            <h3 className="text-xl font-semibold mb-4">Hairstyle Recommendations</h3>
            <div className="p-12 bg-gray-100 border border-border rounded-lg text-center">
              <p className="text-secondary mb-2">3x3 Hairstyle Collage</p>
              <p className="text-sm text-secondary">
                (Placeholder - will be generated by AI backend)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
