# AI Personal Stylist - Frontend

React + Vite + TailwindCSS frontend with Apple-like minimal design.

## Features

- Clean, minimal UI following Apple design principles
- Photo upload with preview
- Form validation
- Real-time loading states
- Comprehensive style report display
- Downloadable hairstyle collage

## Development

```bash
npm install
npm run dev
```

Frontend runs at http://localhost:5173

## Build for Production

```bash
npm run build
npm run preview
```

## Components

### Pages
- **LandingPage**: Hero section with CTA
- **TryPage**: Main interaction page with form and results

### Components
- **TryForm**: Photo upload and input fields
- **LoadingState**: Clean loading animation
- **ReportView**: Style report display with all sections
- **CollageViewer**: Hairstyle grid with download
- **ErrorBanner**: Minimal error handling

## Styling Guidelines

Following Apple-like minimal design:
- White background
- Generous whitespace (max-width: 720px)
- Black primary CTA
- No gradients
- Subtle borders (#e5e5e5)
- Clean typography (-apple-system font stack)
- Minimal shadows

## API Integration

All API calls go through Vite proxy defined in `vite.config.js`:
- `/api/*` → `http://localhost:8000/api/*`

Main endpoint: `POST /api/generate`
