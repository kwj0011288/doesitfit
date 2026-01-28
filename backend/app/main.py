"""
FastAPI application for AI Personal Stylist MVP.
No user accounts, no data storage, Apple-like minimal API.
"""
import os
from io import BytesIO
from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

from .schemas import GenerateResponse, HairCollage
from .gemini_client import gemini_client
from .rate_limit import rate_limiter
from .middleware import require_entitlement

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="AI Personal Stylist API",
    description="Generate AI-powered style reports and hairstyle recommendations",
    version="1.0.0"
)

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_client_ip(request: Request) -> str:
    """Extract client IP address from request"""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "ai-personal-stylist"}


@app.post("/api/generate", response_model=GenerateResponse)
async def generate_style_report(
    request: Request,
    photo: UploadFile = File(..., description="User photo (jpg/png/webp, max 8MB)"),
    height_cm: float = Form(..., description="Height in centimeters"),
    occasion: str = Form(..., description="Occasion: Daily/Work/Date/Interview/Party"),
    weight_kg: float = Form(None, description="Weight in kilograms (optional)"),
    style_vibe: str = Form(None, description="Style vibe: Minimal/Street/Casual/Classic/Sporty (optional)"),
    fit_preference: str = Form(None, description="Fit preference: Slim-No/Oversized-No/Doesn't matter (optional)")
):
    """
    Generate AI style report and hairstyle recommendations.
    
    MVP: No payment gating (middleware placeholder inactive).
    Photo processed in-memory only, not stored.
    """
    
    # Check rate limiting
    client_ip = get_client_ip(request)
    if not rate_limiter.is_allowed(client_ip):
        retry_after = rate_limiter.get_retry_after(client_ip)
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Rate limit exceeded. Try again in {retry_after} seconds.",
            headers={"Retry-After": str(retry_after)}
        )
    
    # Payment entitlement check (MVP: disabled, always allows)
    await require_entitlement()
    
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/webp"]
    if photo.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid file type. Allowed: {', '.join(allowed_types)}"
        )
    
    # Validate occasion
    valid_occasions = ["Daily", "Work", "Date", "Interview", "Party"]
    if occasion not in valid_occasions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid occasion. Must be one of: {', '.join(valid_occasions)}"
        )
    
    # Validate optional fields
    if style_vibe:
        valid_vibes = ["Minimal", "Street", "Casual", "Classic", "Sporty"]
        if style_vibe not in valid_vibes:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid style_vibe. Must be one of: {', '.join(valid_vibes)}"
            )
    
    if fit_preference:
        valid_fits = ["Slim-No", "Oversized-No", "Doesn't matter"]
        if fit_preference not in valid_fits:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid fit_preference. Must be one of: {', '.join(valid_fits)}"
            )
    
    try:
        # Read photo bytes (in-memory only, never saved to disk)
        photo_bytes = await photo.read()
        
        # Validate file size (8MB limit)
        max_size = 8 * 1024 * 1024  # 8MB in bytes
        if len(photo_bytes) > max_size:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File too large. Maximum size is 8MB."
            )
        
        # Generate style report using Gemini
        style_report = await gemini_client.generate_style_report(
            photo_bytes=photo_bytes,
            height_cm=height_cm,
            occasion=occasion,
            weight_kg=weight_kg,
            style_vibe=style_vibe,
            fit_preference=fit_preference
        )
        
        # Generate hair collage using Gemini/Imagen
        hair_collage_base64 = await gemini_client.generate_hair_collage(photo_bytes)
        
        # Build response
        response = GenerateResponse(
            result=style_report,
            hair_collage=HairCollage(
                mime="image/png",
                base64=hair_collage_base64,
                note="Screenshot and crop any style you like."
            )
        )
        
        # Photo bytes are now garbage collected (not stored anywhere)
        return response
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        # Log error (minimal logging, no photo data)
        print(f"Error generating style report: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate style report. Please try again."
        )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler for unexpected errors"""
    print(f"Unexpected error: {str(exc)}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An unexpected error occurred. Please try again later."}
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", "8000")),
        reload=True
    )
