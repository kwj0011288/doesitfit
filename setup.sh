#!/bin/bash

# AI Personal Stylist - Quick Setup Script

echo "🎨 AI Personal Stylist - Setup Script"
echo "======================================"
echo ""

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9 or higher."
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

echo "✅ Python and Node.js are installed"
echo ""

# Setup backend
echo "Setting up backend..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -q -r requirements.txt

echo "✅ Backend setup complete"
echo ""

# Setup frontend
echo "Setting up frontend..."
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

echo "✅ Frontend setup complete"
echo ""

# Final instructions
echo "============================================"
echo "✅ Setup Complete!"
echo "============================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Add your Gemini API key to backend/.env:"
echo "   Edit: backend/.env"
echo "   Set: GEMINI_API_KEY=your_actual_api_key"
echo ""
echo "2. Start the backend (Terminal 1):"
echo "   cd backend"
echo "   source venv/bin/activate  # On Windows: venv\\Scripts\\activate"
echo "   python -m uvicorn app.main:app --reload"
echo ""
echo "3. Start the frontend (Terminal 2):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "4. Open http://localhost:5173 in your browser"
echo ""
echo "Get your Gemini API key at:"
echo "https://makersuite.google.com/app/apikey"
echo ""
