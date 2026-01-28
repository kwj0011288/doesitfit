# AI Personal Stylist - Backend

FastAPI backend for AI-powered personal styling recommendations using Google Gemini.

## Features

- **Style Report Generation**: Analyzes user photos to provide personalized fashion advice
- **Hairstyle Recommendations**: Suggests hairstyles with 3x3 visual collage
- **In-Memory Processing**: No photo storage, privacy-first design
- **Rate Limiting**: IP-based abuse prevention (10 requests/hour by default)
- **Payment Ready**: Middleware placeholder for future Polar.sh/Stripe integration

## Prerequisites

- Python 3.9+
- Google Gemini API key

## Setup

1. **Install dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   ```

3. **Run the server**:
   ```bash
   python -m uvicorn app.main:app --reload
   ```

   The API will be available at `http://localhost:8000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Generate Style Report
```
POST /api/generate
Content-Type: multipart/form-data

Required fields:
- photo: Image file (jpg/png/webp, max 8MB)
- height_cm: Number (height in centimeters)
- occasion: String (Daily/Work/Date/Interview/Party)

Optional fields:
- weight_kg: Number
- style_vibe: String (Minimal/Street/Casual/Classic/Sporty)
- fit_preference: String (Slim-No/Oversized-No/Doesn't matter)

Response: JSON with style report + base64 hair collage image
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | (required) |
| `FRONTEND_URL` | CORS allowed origin | `http://localhost:5173` |
| `RATE_LIMIT_REQUESTS` | Max requests per window | `10` |
| `RATE_LIMIT_WINDOW_SECONDS` | Rate limit window | `3600` (1 hour) |
| `HOST` | Server host | `0.0.0.0` |
| `PORT` | Server port | `8000` |

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application
│   ├── schemas.py           # Pydantic models
│   ├── gemini_client.py     # Gemini API integration
│   ├── prompts.py           # AI prompt templates
│   ├── rate_limit.py        # Rate limiting logic
│   ├── middleware.py        # Payment middleware placeholder
│   └── image_stitch.py      # Image grid utility
├── requirements.txt
├── .env.example
└── README.md
```

## Privacy & Data Handling

- **No photo storage**: User photos are processed in-memory only and immediately garbage collected
- **No result storage**: Style reports and collages are not saved to any database
- **Minimal logging**: Error logs do not contain photo data or personally identifiable information

## Rate Limiting

Default configuration: 10 requests per hour per IP address.

For production with higher traffic, replace in-memory rate limiter with Redis:
```python
# Example with Redis
from redis import Redis
redis_client = Redis(host='localhost', port=6379)
```

## Payment Integration (Future)

The `middleware.py` contains a `require_entitlement()` function that currently allows all requests.

To enable payment gating with Polar.sh or Stripe:
1. Implement token validation logic in `require_entitlement()`
2. Add token parameter to `/api/generate` endpoint
3. Configure payment webhook handlers

## Deployment

The application is stateless and can be deployed to:
- Render
- Fly.io
- DigitalOcean App Platform
- Google Cloud Run
- AWS Lambda (with adapter)

Example deployment command:
```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

## Troubleshooting

**Gemini API errors**: Verify your API key is correct and has the necessary permissions.

**CORS errors**: Ensure `FRONTEND_URL` in `.env` matches your frontend's origin.

**Rate limit issues**: Adjust `RATE_LIMIT_REQUESTS` and `RATE_LIMIT_WINDOW_SECONDS` in `.env`.
