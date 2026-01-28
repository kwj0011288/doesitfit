from typing import List, Optional
from pydantic import BaseModel, Field


class GenerateRequest(BaseModel):
    """Request model for style report generation"""
    height_cm: float = Field(..., gt=0, le=300, description="Height in centimeters")
    occasion: str = Field(..., description="Occasion: Daily, Work, Date, Interview, Party")
    weight_kg: Optional[float] = Field(None, gt=0, le=500, description="Weight in kilograms")
    style_vibe: Optional[str] = Field(None, description="Style vibe: Minimal, Street, Casual, Classic, Sporty")
    fit_preference: Optional[str] = Field(None, description="Fit preference: Slim-No, Oversized-No, Doesn't matter")


class BodyFitGuidance(BaseModel):
    """Body and fit guidance"""
    overall: str
    do: List[str]
    avoid: List[str]


class ColorGuidance(BaseModel):
    """Color recommendations"""
    best: List[str]
    avoid: List[str]
    notes: str


class OutfitItems(BaseModel):
    """Individual outfit items"""
    top: str
    bottom: str
    shoes: str
    outerwear: str = ""


class OutfitSuggestion(BaseModel):
    """Single outfit suggestion"""
    title: str
    items: OutfitItems
    why: str


class HairstyleRecommendation(BaseModel):
    """Individual hairstyle recommendation"""
    name: str
    why: str
    how: str


class StyleReport(BaseModel):
    """Complete style analysis report"""
    summary: List[str]
    body_fit: BodyFitGuidance
    colors: ColorGuidance
    outfits: List[OutfitSuggestion]
    styling_tips: List[str]
    hairstyles: List[HairstyleRecommendation]


class HairCollage(BaseModel):
    """Hair collage image data"""
    mime: str = "image/png"
    base64: str
    note: str = "Screenshot and crop any style you like."


class GenerateResponse(BaseModel):
    """Complete response with style report and hair collage"""
    result: StyleReport
    hair_collage: HairCollage
