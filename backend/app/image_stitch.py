"""
Utility for stitching multiple images into a 3x3 grid.
Used as fallback if Gemini returns 9 separate images instead of a single collage.
"""
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
import base64
from typing import List, Optional


def stitch_images_to_grid(
    images: List[bytes],
    grid_size: int = 3,
    cell_size: int = 400,
    labels: Optional[List[str]] = None,
    background_color: str = "white"
) -> str:
    """
    Stitch multiple images into a square grid and return as base64 PNG.
    
    Args:
        images: List of image bytes (should be 9 for 3x3 grid)
        grid_size: Grid dimension (3 for 3x3)
        cell_size: Size of each cell in pixels
        labels: Optional labels for each cell
        background_color: Background color for the grid
        
    Returns:
        Base64 encoded PNG string
    """
    if len(images) != grid_size * grid_size:
        raise ValueError(f"Expected {grid_size * grid_size} images, got {len(images)}")
    
    # Create blank canvas
    canvas_size = cell_size * grid_size
    canvas = Image.new("RGB", (canvas_size, canvas_size), background_color)
    
    # Paste each image into grid
    for idx, img_bytes in enumerate(images):
        # Calculate grid position
        row = idx // grid_size
        col = idx % grid_size
        x = col * cell_size
        y = row * cell_size
        
        # Open and resize image
        img = Image.open(BytesIO(img_bytes))
        img = img.resize((cell_size, cell_size), Image.Resampling.LANCZOS)
        
        # Paste into canvas
        canvas.paste(img, (x, y))
        
        # Add label if provided
        if labels and idx < len(labels):
            draw = ImageDraw.Draw(canvas)
            label_text = labels[idx]
            
            # Simple label at bottom of cell (using default font)
            text_bbox = draw.textbbox((0, 0), label_text)
            text_width = text_bbox[2] - text_bbox[0]
            text_height = text_bbox[3] - text_bbox[1]
            
            text_x = x + (cell_size - text_width) // 2
            text_y = y + cell_size - text_height - 10
            
            # Draw background rectangle for text
            padding = 5
            draw.rectangle(
                [text_x - padding, text_y - padding,
                 text_x + text_width + padding, text_y + text_height + padding],
                fill="white"
            )
            
            # Draw text
            draw.text((text_x, text_y), label_text, fill="black")
    
    # Convert to base64
    buffer = BytesIO()
    canvas.save(buffer, format="PNG")
    buffer.seek(0)
    base64_string = base64.b64encode(buffer.read()).decode("utf-8")
    
    return base64_string


def create_placeholder_collage(grid_size: int = 3, cell_size: int = 400) -> str:
    """
    Create a placeholder collage for testing or when generation fails.
    
    Returns:
        Base64 encoded PNG string
    """
    canvas_size = cell_size * grid_size
    canvas = Image.new("RGB", (canvas_size, canvas_size), "white")
    draw = ImageDraw.Draw(canvas)
    
    for i in range(grid_size):
        for j in range(grid_size):
            x = j * cell_size
            y = i * cell_size
            
            # Draw cell border
            draw.rectangle(
                [x, y, x + cell_size, y + cell_size],
                outline="gray",
                width=2
            )
            
            # Draw cell number
            cell_num = i * grid_size + j + 1
            text = f"Style {cell_num}"
            text_bbox = draw.textbbox((0, 0), text)
            text_width = text_bbox[2] - text_bbox[0]
            text_height = text_bbox[3] - text_bbox[1]
            
            text_x = x + (cell_size - text_width) // 2
            text_y = y + (cell_size - text_height) // 2
            
            draw.text((text_x, text_y), text, fill="gray")
    
    # Convert to base64
    buffer = BytesIO()
    canvas.save(buffer, format="PNG")
    buffer.seek(0)
    base64_string = base64.b64encode(buffer.read()).decode("utf-8")
    
    return base64_string
