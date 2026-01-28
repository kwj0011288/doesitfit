"""
Gemini API prompt templates for style analysis and hairstyle recommendations.
All prompts use simple language and avoid judgmental tone.
"""


def get_style_report_prompt(height_cm: float, occasion: str, weight_kg: float = None, 
                            style_vibe: str = None, fit_preference: str = None) -> str:
    """Generate prompt for style report analysis"""
    
    optional_context = []
    if weight_kg:
        optional_context.append(f"Weight: {weight_kg}kg")
    if style_vibe:
        optional_context.append(f"Preferred style vibe: {style_vibe}")
    if fit_preference:
        optional_context.append(f"Fit preference: {fit_preference}")
    
    optional_text = "\n".join(optional_context) if optional_context else "No additional preferences provided."
    
    return f"""You are a professional personal stylist. Analyze the person in this photo and provide practical, positive fashion advice.

Context:
- Height: {height_cm}cm
- Occasion: {occasion}
{optional_text}

Generate a comprehensive style report in JSON format with these sections:

1. summary: 3-4 key style insights (bullet points)
2. body_fit: 
   - overall: 1-2 sentence body type overview (neutral, positive tone)
   - do: 3-4 clothing recommendations that work well
   - avoid: 2-3 styles to skip (phrased constructively)
3. colors:
   - best: 4-6 colors that complement their features
   - avoid: 2-3 colors that don't work as well
   - notes: Brief explanation of color choices
4. outfits: 3 complete outfit suggestions, each with:
   - title: Outfit name
   - items: {{top, bottom, shoes, outerwear}}
   - why: Why this outfit works
5. styling_tips: 4-5 quick practical tips for the occasion
6. hairstyles: 6-9 hairstyle recommendations, each with:
   - name: Hairstyle name
   - why: Why it suits them
   - how: Brief styling instructions

Important guidelines:
- Use simple, practical language
- Be positive and constructive (no judging language)
- Avoid sensitive identity claims
- Tailor advice to the occasion
- Consider optional preferences if provided
- If photo quality is unclear, provide best-effort guidance

Return ONLY valid JSON matching this exact schema."""


def get_hair_collage_prompt() -> str:
    """Generate prompt for 3x3 hairstyle collage image"""
    
    return """Create a single image showing a 3x3 grid (9 cells) of diverse hairstyle examples.

Requirements:
- All 9 hairstyles should be visible in ONE image
- Arrange in a clear 3x3 grid layout
- Use consistent white or light neutral background for all cells
- Show variety: short, medium, long, curly, straight, textured styles
- Include both clean-cut and modern trendy options
- Each cell should clearly show the hairstyle from front or side angle
- Optional: Add small text labels with hairstyle names in each cell
- Professional styling reference photo quality

Make it look like a professional hairstyle reference board that someone could screenshot and show to their barber or stylist."""
