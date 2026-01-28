# AI Personal Stylist MVP

> AI-generated fashion recommendations based on your photo and height

An Apple-like minimal web application that provides personalized style reports and hairstyle recommendations using Google Gemini AI. No account required, no data storage.

## ✨ Features

- **Instant Style Analysis**: Upload a photo and get comprehensive fashion advice
- **Hairstyle Recommendations**: 3x3 grid of hairstyle suggestions tailored to your features
- **Privacy First**: Photos processed in-memory only, never stored
- **No Account Required**: Completely anonymous, no signup needed
- **Clean UI**: Apple-inspired minimal design with generous whitespace

## 🛠 Tech Stack

**Frontend:**
- React 18
- Vite
- TailwindCSS
- React Router

**Backend:**
- Python 3.9+
- FastAPI
- Google Gemini API
- Pillow (image processing)

## 📋 Prerequisites

- Node.js 16+ and npm
- Python 3.9+
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## 🚀 Quick Start

### 1. Clone and Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

### 2. Setup Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### 3. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
python -m uvicorn app.main:app --reload
# Backend runs at http://localhost:8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend runs at http://localhost:5173
```

Visit http://localhost:5173 in your browser!

## 📁 Project Structure

```
doesitfit/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application
│   │   ├── schemas.py           # Pydantic models
│   │   ├── gemini_client.py     # Gemini API integration
│   │   ├── prompts.py           # AI prompt templates
│   │   ├── rate_limit.py        # Rate limiting
│   │   ├── middleware.py        # Payment placeholder
│   │   └── image_stitch.py      # Image grid utility
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   └── TryPage.jsx
│   │   ├── components/
│   │   │   ├── TryForm.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   ├── ReportView.jsx
│   │   │   ├── CollageViewer.jsx
│   │   │   └── ErrorBanner.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── README.md (this file)
```

## 🎯 User Flow

1. **Landing Page** (`/`)
   - Clean headline and description
   - "Try It" CTA button
   - No account required message

2. **Try Page** (`/try`)
   - Upload photo (JPG/PNG/WebP, max 8MB)
   - Enter height (required)
   - Select occasion (required)
   - Optional: weight, style vibe, fit preference
   - Submit for AI analysis

3. **Results**
   - Style summary
   - Body/fit guidance (do's and don'ts)
   - Color recommendations
   - 3 complete outfit suggestions
   - Styling tips
   - 3x3 hairstyle collage grid

## 🔒 Privacy & Security

- **No Photo Storage**: User photos are processed in-memory only and immediately garbage collected
- **No Result Storage**: Style reports and collages are not saved to any database
- **Rate Limiting**: 10 requests per hour per IP (configurable)
- **Minimal Logging**: Error logs contain no photo data or PII

## 💳 Payment Integration (Future)

This MVP does NOT implement payment gating. However, the backend includes a `require_entitlement()` middleware placeholder designed for future integration with:

- **Polar.sh** (recommended)
- Stripe

The middleware can be activated later to enforce:
- Subscription-based access
- Credit-based consumption (1 generation = 1 credit)
- One-time purchases

## 🎨 Design Philosophy

The UI follows Apple's design language:
- White background with generous whitespace
- Clean typography hierarchy
- No gradients or heavy shadows
- Subtle borders and dividers
- One primary CTA per screen
- Minimal, focused interface

## ⚙️ Configuration

### Backend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | (required) |
| `FRONTEND_URL` | CORS allowed origin | `http://localhost:5173` |
| `RATE_LIMIT_REQUESTS` | Max requests per window | `10` |
| `RATE_LIMIT_WINDOW_SECONDS` | Rate limit window | `3600` |
| `HOST` | Server host | `0.0.0.0` |
| `PORT` | Server port | `8000` |

## 🚢 Deployment

The application is stateless and can be deployed to:
- **Render** (recommended for MVP)
- Fly.io
- DigitalOcean App Platform
- Google Cloud Run
- AWS Lambda (with adapter)

### Deployment Checklist

1. Set environment variables on your platform
2. Backend: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. Frontend: `npm run build` then serve the `dist` folder
4. Update `FRONTEND_URL` in backend `.env` to production URL
5. Configure CORS as needed

## 🐛 Troubleshooting

**Gemini API errors:**
- Verify API key is correct
- Check API quota and billing status
- Ensure proper permissions

**CORS errors:**
- Confirm `FRONTEND_URL` matches your frontend origin
- Check CORS middleware configuration

**Rate limit issues:**
- Adjust `RATE_LIMIT_REQUESTS` in `.env`
- For production, consider Redis-based rate limiting

**Photo upload fails:**
- Verify file size < 8MB
- Check file type (JPG/PNG/WebP only)
- Ensure proper multipart/form-data encoding

## 📝 API Documentation

### Health Check
```
GET /api/health
Response: {"status": "healthy", "service": "ai-personal-stylist"}
```

### Generate Style Report
```
POST /api/generate
Content-Type: multipart/form-data

Required:
- photo: File
- height_cm: Number
- occasion: String (Daily|Work|Date|Interview|Party)

Optional:
- weight_kg: Number
- style_vibe: String (Minimal|Street|Casual|Classic|Sporty)
- fit_preference: String (Slim-No|Oversized-No|Doesn't matter)

Response: JSON with style report + base64 collage
```

## 🤝 Contributing

This is an MVP. Future enhancements could include:
- Payment integration (Polar.sh/Stripe)
- User accounts and history
- More AI model options
- Mobile app version
- Real-time hairstyle generation (when Gemini supports it)

## 📄 License

MIT

## 🙏 Acknowledgments

- Powered by Google Gemini AI
- Inspired by Apple's design principles
- Built with modern web technologies

---

**Note**: This MVP does not include payment processing. Payment integration is designed to be added later with minimal code changes.
