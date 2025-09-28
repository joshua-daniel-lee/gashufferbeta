"""
Gas Huffer Character Sprite Generation

Generates Gas Huffer character sprites with basic animations using PIL
following Derek Yu's pixel art methodology.
"""

from PIL import Image, ImageDraw
import numpy as np
from typing import Dict, List, Tuple

# Gas Huffer color palette - spooky green theme
COLORS = {
    'bg': (0, 0, 0, 0),           # Transparent background
    'body_dark': (34, 80, 49),     # Dark green for body
    'body_light': (52, 120, 73),   # Light green for highlights
    'body_outline': (18, 40, 25),  # Very dark green outline
    'eye_white': (240, 240, 240),  # White for eyes
    'eye_pupil': (0, 0, 0),        # Black pupils
    'mouth': (120, 20, 20),        # Dark red for mouth
}

def generate_gas_huffer_sprites() -> Dict[str, Image.Image]:
    """
    Generate Gas Huffer character sprites with animations.
    
    Returns:
        Dict containing sprite images for different states/animations
    """
    sprites = {}
    
    # Generate idle sprite
    sprites['idle'] = create_gas_huffer_idle()
    
    # Generate walk cycle (4 frames)
    for i in range(4):
        sprites[f'walk_{i}'] = create_gas_huffer_walk(frame=i)
    
    # Generate flashlight poses
    sprites['flashlight_idle'] = create_gas_huffer_flashlight_idle()
    sprites['flashlight_walk'] = create_gas_huffer_flashlight_walk()
    
    return sprites

def create_base_character(size: Tuple[int, int] = (32, 32)) -> Image.Image:
    """Create the base Gas Huffer character sprite."""
    img = Image.new('RGBA', size, COLORS['bg'])
    draw = ImageDraw.Draw(img)
    
    # Character is centered in 32x32 sprite
    # Body: 12x16 pixels, centered at (16, 16)
    
    # Draw main body (simple humanoid shape)
    body_points = [
        # Head (6x6 oval)
        (13, 8), (14, 7), (15, 7), (16, 7), (17, 7), (18, 7), (19, 8),
        (20, 9), (20, 10), (20, 11), (19, 12), (18, 12), (17, 12), 
        (16, 12), (15, 12), (14, 12), (13, 12), (12, 11), (12, 10), (12, 9)
    ]
    
    # Fill head
    for x in range(13, 20):
        for y in range(8, 13):
            if (x, y) in [(13, 8), (19, 8), (13, 12), (19, 12)]:
                continue  # Round corners
            draw.point((x, y), COLORS['body_light'])
    
    # Head outline
    head_outline = [(13, 8), (19, 8), (20, 9), (20, 11), (19, 12), (13, 12), (12, 11), (12, 9)]
    for point in head_outline:
        draw.point(point, COLORS['body_outline'])
    
    # Eyes
    draw.point((15, 10), COLORS['eye_white'])
    draw.point((17, 10), COLORS['eye_white'])
    draw.point((15, 10), COLORS['eye_pupil'])
    draw.point((17, 10), COLORS['eye_pupil'])
    
    # Simple mouth
    draw.point((16, 11), COLORS['mouth'])
    
    # Body (8x10 rectangle)
    for x in range(14, 19):
        for y in range(13, 21):
            draw.point((x, y), COLORS['body_dark'])
    
    # Body outline
    for x in range(14, 19):
        draw.point((x, 13), COLORS['body_outline'])  # Top
        draw.point((x, 20), COLORS['body_outline'])  # Bottom
    for y in range(13, 21):
        draw.point((14, y), COLORS['body_outline'])  # Left
        draw.point((18, y), COLORS['body_outline'])  # Right
    
    # Arms (simple lines)
    draw.point((12, 15), COLORS['body_dark'])  # Left arm
    draw.point((11, 16), COLORS['body_dark'])
    draw.point((20, 15), COLORS['body_dark'])  # Right arm
    draw.point((21, 16), COLORS['body_dark'])
    
    # Legs (4x6 each)
    for y in range(21, 26):
        draw.point((15, y), COLORS['body_dark'])  # Left leg
        draw.point((17, y), COLORS['body_dark'])  # Right leg
    
    # Feet
    draw.point((14, 25), COLORS['body_dark'])  # Left foot
    draw.point((18, 25), COLORS['body_dark'])  # Right foot
    
    return img

def create_gas_huffer_idle() -> Image.Image:
    """Create the idle Gas Huffer sprite."""
    return create_base_character()

def create_gas_huffer_walk(frame: int) -> Image.Image:
    """Create walking animation frame."""
    img = create_base_character()
    
    # Simple walk cycle by slightly moving legs
    if frame in [1, 3]:
        # Move legs slightly for walk animation
        pass  # Basic implementation for now
    
    return img

def create_gas_huffer_flashlight_idle() -> Image.Image:
    """Create Gas Huffer holding flashlight (idle)."""
    img = create_base_character()
    draw = ImageDraw.Draw(img)
    
    # Add flashlight to right hand
    # Simple rectangular flashlight
    flashlight_points = [(21, 15), (22, 15), (23, 15), (21, 16), (22, 16), (23, 16)]
    for point in flashlight_points:
        draw.point(point, (100, 100, 100))  # Gray flashlight
    
    return img

def create_gas_huffer_flashlight_walk() -> Image.Image:
    """Create Gas Huffer holding flashlight (walking)."""
    return create_gas_huffer_flashlight_idle()  # Basic implementation

if __name__ == "__main__":
    sprites = generate_gas_huffer_sprites()
    print(f"Generated {len(sprites)} Gas Huffer sprites")
