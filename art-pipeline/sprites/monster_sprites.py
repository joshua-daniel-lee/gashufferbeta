"""
Monster Sprite Generation for Gas Huffer

Generates all 4 monster types (Ghost, Shadow, Wraith, Poltergeist) using PIL
following Derek Yu's pixel art methodology.
"""

from PIL import Image, ImageDraw
import numpy as np
from typing import Dict, List, Tuple

# Monster color palettes - spooky theme
GHOST_COLORS = {
    'bg': (0, 0, 0, 0),           # Transparent background
    'body': (200, 200, 255, 180),  # Semi-transparent light blue
    'outline': (150, 150, 200, 220), # Slightly more opaque outline
    'eyes': (255, 255, 255, 255),   # Solid white eyes
    'pupils': (0, 0, 0, 255),       # Solid black pupils
}

SHADOW_COLORS = {
    'bg': (0, 0, 0, 0),           # Transparent background
    'body': (20, 20, 30, 200),    # Dark purple-black
    'outline': (10, 10, 15, 255), # Very dark outline
    'eyes': (120, 0, 0, 200),     # Dark red eyes
}

WRAITH_COLORS = {
    'bg': (0, 0, 0, 0),           # Transparent background
    'body': (80, 80, 120, 160),   # Semi-transparent gray-blue
    'wisp': (150, 150, 200, 120), # Lighter wisps
    'outline': (40, 40, 60, 200), # Dark outline
    'eyes': (255, 255, 0, 220),   # Bright yellow eyes
}

POLTERGEIST_COLORS = {
    'bg': (0, 0, 0, 0),           # Transparent background
    'aura': (100, 255, 100, 80),  # Green energy aura
    'core': (200, 255, 200, 120), # Brighter green core
    'outline': (50, 150, 50, 180), # Green outline
    'effects': (255, 255, 255, 160), # White energy effects
}

def generate_monster_sprites() -> Dict[str, Dict[str, Image.Image]]:
    """
    Generate all monster sprites with animations.
    
    Returns:
        Dict containing sprite images for each monster type and their states
    """
    monsters = {
        'ghost': generate_ghost_sprites(),
        'shadow': generate_shadow_sprites(), 
        'wraith': generate_wraith_sprites(),
        'poltergeist': generate_poltergeist_sprites(),
    }
    
    return monsters

def generate_ghost_sprites() -> Dict[str, Image.Image]:
    """Generate Ghost monster sprites - predictable patrol routes."""
    sprites = {}
    
    # Generate floating animation frames
    for i in range(3):
        sprites[f'float_{i}'] = create_ghost_float(frame=i)
    
    # Death animation
    sprites['death'] = create_ghost_death()
    
    return sprites

def generate_shadow_sprites() -> Dict[str, Image.Image]:
    """Generate Shadow monster sprites - guards specific areas."""
    sprites = {}
    
    # Static guard pose
    sprites['idle'] = create_shadow_idle()
    
    # Alert state
    sprites['alert'] = create_shadow_alert()
    
    # Death animation
    sprites['death'] = create_shadow_death()
    
    return sprites

def generate_wraith_sprites() -> Dict[str, Image.Image]:
    """Generate Wraith monster sprites - aggressive pursuit."""
    sprites = {}
    
    # Movement animation (4 frames)
    for i in range(4):
        sprites[f'move_{i}'] = create_wraith_move(frame=i)
    
    # Attack pose
    sprites['attack'] = create_wraith_attack()
    
    # Death animation
    sprites['death'] = create_wraith_death()
    
    return sprites

def generate_poltergeist_sprites() -> Dict[str, Image.Image]:
    """Generate Poltergeist monster sprites - chaotic movement."""
    sprites = {}
    
    # Energy states
    for i in range(4):
        sprites[f'energy_{i}'] = create_poltergeist_energy(frame=i)
    
    # Object throwing pose
    sprites['throw'] = create_poltergeist_throw()
    
    # Death animation
    sprites['death'] = create_poltergeist_death()
    
    return sprites

def create_base_monster(size: Tuple[int, int], colors: Dict[str, Tuple]) -> Image.Image:
    """Create a base monster sprite template."""
    img = Image.new('RGBA', size, colors['bg'])
    draw = ImageDraw.Draw(img)
    return img

# Ghost sprite creation functions
def create_ghost_float(frame: int) -> Image.Image:
    """Create ghost floating animation frame."""
    img = Image.new('RGBA', (32, 32), GHOST_COLORS['bg'])
    draw = ImageDraw.Draw(img)
    
    # Floating offset based on frame
    y_offset = [0, -1, 0][frame % 3]
    
    # Ghost body (oval shape, semi-transparent)
    center_y = 16 + y_offset
    for x in range(10, 23):
        for y in range(8, 24):
            if ((x - 16) ** 2) / 36 + ((y - center_y) ** 2) / 64 < 1:
                draw.point((x, y), GHOST_COLORS['body'])
    
    # Eyes
    draw.point((13, 12 + y_offset), GHOST_COLORS['eyes'])
    draw.point((19, 12 + y_offset), GHOST_COLORS['eyes'])
    draw.point((13, 12 + y_offset), GHOST_COLORS['pupils'])
    draw.point((19, 12 + y_offset), GHOST_COLORS['pupils'])
    
    return img

def create_ghost_death() -> Image.Image:
    """Create ghost death animation."""
    img = Image.new('RGBA', (32, 32), GHOST_COLORS['bg'])
    draw = ImageDraw.Draw(img)
    
    # Fading ghost effect
    fade_color = (GHOST_COLORS['body'][0], GHOST_COLORS['body'][1], GHOST_COLORS['body'][2], 60)
    for x in range(12, 21):
        for y in range(12, 20):
            draw.point((x, y), fade_color)
    
    return img

# Shadow sprite creation functions  
def create_shadow_idle() -> Image.Image:
    """Create shadow idle pose."""
    img = Image.new('RGBA', (32, 32), SHADOW_COLORS['bg'])
    draw = ImageDraw.Draw(img)
    
    # Dark silhouette humanoid
    for x in range(12, 21):
        for y in range(8, 25):
            if x == 16 or (y > 12 and y < 22):  # Simple silhouette
                draw.point((x, y), SHADOW_COLORS['body'])
    
    # Red glowing eyes
    draw.point((14, 11), SHADOW_COLORS['eyes'])
    draw.point((18, 11), SHADOW_COLORS['eyes'])
    
    return img

def create_shadow_alert() -> Image.Image:
    """Create shadow alert state."""
    img = create_shadow_idle()
    draw = ImageDraw.Draw(img)
    
    # Brighter red eyes when alert
    brighter_eyes = (180, 0, 0, 255)
    draw.point((14, 11), brighter_eyes)
    draw.point((18, 11), brighter_eyes)
    
    return img

def create_shadow_death() -> Image.Image:
    """Create shadow death animation."""
    img = Image.new('RGBA', (32, 32), SHADOW_COLORS['bg'])
    draw = ImageDraw.Draw(img)
    
    # Dissolving shadow effect
    dissolve_color = (SHADOW_COLORS['body'][0], SHADOW_COLORS['body'][1], SHADOW_COLORS['body'][2], 100)
    for x in range(14, 19):
        for y in range(15, 20):
            draw.point((x, y), dissolve_color)
    
    return img

# Wraith sprite creation functions
def create_wraith_move(frame: int) -> Image.Image:
    """Create wraith movement animation frame."""
    img = Image.new('RGBA', (32, 32), WRAITH_COLORS['bg'])
    draw = ImageDraw.Draw(img)
    
    # Flowing movement based on frame
    flow_offset = [-1, 0, 1, 0][frame % 4]
    
    # Ethereal flowing form
    for x in range(8, 25):
        for y in range(6, 26):
            if (x + flow_offset) % 3 == 0 and y % 2 == 0:
                draw.point((x, y), WRAITH_COLORS['body'])
            elif (x + flow_offset) % 4 == 0:
                draw.point((x, y), WRAITH_COLORS['wisp'])
    
    # Bright yellow eyes
    draw.point((13, 10), WRAITH_COLORS['eyes'])
    draw.point((19, 10), WRAITH_COLORS['eyes'])
    
    return img

def create_wraith_attack() -> Image.Image:
    """Create wraith attack pose."""
    img = create_wraith_move(0)
    draw = ImageDraw.Draw(img)
    
    # Extended wispy arms for attack
    for x in range(6, 26):
        if x < 12 or x > 20:
            draw.point((x, 14), WRAITH_COLORS['wisp'])
    
    return img

def create_wraith_death() -> Image.Image:
    """Create wraith death animation."""
    img = Image.new('RGBA', (32, 32), WRAITH_COLORS['bg'])
    draw = ImageDraw.Draw(img)
    
    # Dispersing wisps
    for x in range(8, 25, 3):
        for y in range(8, 25, 3):
            draw.point((x, y), WRAITH_COLORS['wisp'])
    
    return img

# Poltergeist sprite creation functions
def create_poltergeist_energy(frame: int) -> Image.Image:
    """Create poltergeist energy state frame."""
    img = Image.new('RGBA', (32, 32), POLTERGEIST_COLORS['bg'])
    draw = ImageDraw.Draw(img)
    
    # Chaotic energy pattern based on frame
    energy_pattern = [(0, 0), (1, -1), (-1, 0), (0, 1)][frame % 4]
    
    # Green energy aura
    center_x, center_y = 16 + energy_pattern[0], 16 + energy_pattern[1]
    for x in range(center_x - 6, center_x + 7):
        for y in range(center_y - 6, center_y + 7):
            if (x - center_x) ** 2 + (y - center_y) ** 2 < 25:
                draw.point((x, y), POLTERGEIST_COLORS['aura'])
    
    # Brighter core
    for x in range(center_x - 2, center_x + 3):
        for y in range(center_y - 2, center_y + 3):
            draw.point((x, y), POLTERGEIST_COLORS['core'])
    
    # Floating objects effect
    draw.point((center_x - 8, center_y - 4), POLTERGEIST_COLORS['effects'])
    draw.point((center_x + 8, center_y + 3), POLTERGEIST_COLORS['effects'])
    
    return img

def create_poltergeist_throw() -> Image.Image:
    """Create poltergeist throwing objects pose."""
    img = create_poltergeist_energy(0)
    draw = ImageDraw.Draw(img)
    
    # Additional flying objects
    for i in range(5):
        x = 8 + i * 4
        y = 8 + (i * 2) % 16
        draw.point((x, y), POLTERGEIST_COLORS['effects'])
    
    return img

def create_poltergeist_death() -> Image.Image:
    """Create poltergeist death animation."""
    img = Image.new('RGBA', (32, 32), POLTERGEIST_COLORS['bg'])
    draw = ImageDraw.Draw(img)
    
    # Dissipating energy
    for x in range(12, 21, 2):
        for y in range(12, 21, 2):
            fade_color = (POLTERGEIST_COLORS['aura'][0], POLTERGEIST_COLORS['aura'][1], 
                         POLTERGEIST_COLORS['aura'][2], 40)
            draw.point((x, y), fade_color)
    
    return img

if __name__ == "__main__":
    monsters = generate_monster_sprites()
    total_sprites = sum(len(sprites) for sprites in monsters.values())
    print(f"Generated {total_sprites} monster sprites across {len(monsters)} types")
