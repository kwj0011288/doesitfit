"""
Gemini API client for style analysis and hairstyle recommendations.
"""
import os
import json
import base64
from typing import Dict, Any, Optional
import google.generativeai as genai
from .prompts import get_style_report_prompt, get_hair_collage_prompt
from .schemas import StyleReport


# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


class GeminiClient:
    """Client for interacting with Gemini API"""
    
    def __init__(self):
        # Use Gemini 1.5 Pro for text generation
        self.text_model = genai.GenerativeModel('gemini-1.5-pro')
        # Use Gemini 1.5 Flash for image generation (faster)
        self.image_model = genai.GenerativeModel('gemini-1.5-flash')
    
    async def generate_style_report(
        self,
        photo_bytes: bytes,
        height_cm: float,
        occasion: str,
        weight_kg: Optional[float] = None,
        style_vibe: Optional[str] = None,
        fit_preference: Optional[str] = None
    ) -> StyleReport:
        """
        Generate comprehensive style report from user photo.
        
        Args:
            photo_bytes: User photo as bytes (processed in-memory only)
            height_cm: User height in cm
            occasion: Style occasion
            weight_kg: Optional weight
            style_vibe: Optional style preference
            fit_preference: Optional fit preference
            
        Returns:
            StyleReport object with complete analysis
            
        Raises:
            Exception: If Gemini API fails or returns invalid JSON
        """
        prompt = get_style_report_prompt(
            height_cm=height_cm,
            occasion=occasion,
            weight_kg=weight_kg,
            style_vibe=style_vibe,
            fit_preference=fit_preference
        )
        
        # Upload image to Gemini (temporary, not stored)
        image_part = {
            "mime_type": "image/jpeg",
            "data": photo_bytes
        }
        
        try:
            # Generate response with JSON mode
            response = self.text_model.generate_content(
                [prompt, image_part],
                generation_config=genai.GenerationConfig(
                    temperature=0.7,
                    response_mime_type="application/json"
                )
            )
            
            # Parse JSON response
            response_text = response.text
            report_data = json.loads(response_text)
            
            # Validate with Pydantic schema
            style_report = StyleReport(**report_data)
            return style_report
            
        except json.JSONDecodeError as e:
            raise Exception(f"Failed to parse Gemini response as JSON: {e}")
        except Exception as e:
            raise Exception(f"Gemini API error during style report generation: {e}")
    
    async def generate_hair_collage(self, photo_bytes: bytes) -> str:
        """
        Generate 3x3 hairstyle collage image.
        
        Args:
            photo_bytes: User photo for face shape context
            
        Returns:
            Base64 encoded PNG string
            
        Raises:
            Exception: If image generation fails
        """
        prompt = get_hair_collage_prompt()
        
        # Upload image for context
        image_part = {
            "mime_type": "image/jpeg",
            "data": photo_bytes
        }
        
        try:
            # Note: Gemini doesn't directly generate images yet (as of early 2024)
            # This is a placeholder for when the capability is available
            # For MVP, we'll use Imagen or create a placeholder
            
            # Temporary: Import placeholder function
            from .image_stitch import create_placeholder_collage
            
            # Generate placeholder collage
            # TODO: Replace with actual Gemini image generation when available
            # or integrate with Google Imagen API
            base64_collage = create_placeholder_collage()
            
            return base64_collage
            
        except Exception as e:
            raise Exception(f"Failed to generate hair collage: {e}")


# Singleton instance
gemini_client = GeminiClient()
