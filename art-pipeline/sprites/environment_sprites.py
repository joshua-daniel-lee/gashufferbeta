"""
Environment Sprite Generation for Gas Huffer

Generates room tiles and interactive objects using PIL
following Derek Yu's pixel art methodology.
"""

from PIL import Image, ImageDraw
import numpy as np
from typing import Dict, List, Tuple

# Environment color palettes - haunted manor theme
FLOOR_COLORS = {
    'bg': (0, 0, 0, 0),           # Transparent background
    'wood_dark': (45, 35, 25),    # Dark wood planks
    'wood_light': (65, 50, 35),   # Light wood highlights
    'wood_outline': (25, 20, 15), # Very dark wood outline
    'stone_dark': (60, 55, 50),   # Dark stone
    'stone_light': (80, 75, 70),  # Light stone
    'carpet_red': (80, 30, 30),   # Dark red carpet
}

WALL_COLORS = {
    'bg': (0, 0, 0, 0),           # Transparent background
    'wallpaper_dark': (40, 45, 35),  # Dark green wallpaper
    'wallpaper_light': (55, 65, 45), # Light green wallpaper  
    'wallpaper_pattern': (30, 35, 25), # Pattern color
    'stone_wall': (70, 65, 60),    # Stone wall
    'wood_panel': (55, 45, 35),    # Wood paneling
}

FURNITURE_COLORS = {
    'bg': (0, 0, 0, 0),           # Transparent background
    'wood_dark': (35, 25, 20),    # Dark furniture wood
    'wood_light': (50, 40, 30),   # Light furniture wood
    'metal': (80, 80, 85),        # Metal fixtures
    'fabric_red': (100, 40, 40),  # Red fabric/cushions
    'glass': (180, 190, 200, 120), # Semi-transparent glass
}

INTERACTIVE_COLORS = {
    'bg': (0, 0, 0, 0),           # Transparent background
    'book_spine': (60, 40, 30),   # Book spines
    'book_pages': (220, 210, 190), # Book pages
    'candle_wax': (230, 220, 180), # Candle wax
    'flame': (255, 200, 0),       # Candle flame
    'key_gold': (200, 180, 60),   # Golden key
    'door_wood': (50, 35, 25),    # Door wood
}

def generate_environment_sprites() -> Dict[str, Dict[str, Image.Image]]:
    """
    Generate all environment sprites for the haunted manor.
    
    Returns:
        Dict containing sprite images organized by category
    """
    environment = {
        'floors': generate_floor_tiles(),
        'walls': generate_wall_tiles(),
        'furniture': generate_furniture_sprites(),
        'interactive': generate_interactive_objects(),
        'decorative': generate_decorative_elements(),
    }
    
    return environment

def generate_floor_tiles() -> Dict[str, Image.Image]:
    """Generate floor tile sprites (16x16)."""
    tiles = {}
    
    # Wooden plank flooring
    tiles['wood_plank'] = create_wood_plank_tile()
    tiles['wood_plank_alt'] = create_wood_plank_tile(variation=1)
    
    # Stone tiles for cellar
    tiles['stone_tile'] = create_stone_tile()
    tiles['stone_tile_alt'] = create_stone_tile(variation=1)
    
    # Carpet for bedroom
    tiles['carpet_red'] = create_carpet_tile()
    tiles['carpet_pattern'] = create_carpet_tile(pattern=True)
    
    return tiles

def generate_wall_tiles() -> Dict[str, Image.Image]:
    """Generate wall tile sprites (16x16)."""
    tiles = {}
    
    # Wallpaper patterns
    tiles['wallpaper_green'] = create_wallpaper_tile()
    tiles['wallpaper_pattern'] = create_wallpaper_tile(pattern=True)
    
    # Stone walls for cellar
    tiles['stone_wall'] = create_stone_wall_tile()
    tiles['stone_wall_mossy'] = create_stone_wall_tile(mossy=True)
    
    # Wood paneling
    tiles['wood_panel'] = create_wood_panel_tile()
    tiles['wood_panel_dark'] = create_wood_panel_tile(dark=True)
    
    return tiles

def generate_furniture_sprites() -> Dict[str, Image.Image]:
    """Generate furniture sprites (various sizes)."""
    furniture = {}
    
    # TODO: Implement furniture generation
    # - Bookshelves (32x48)
    # - Tables and chairs (32x32)
    # - Beds (48x32)
    # - Stoves and kitchen items
    
    return furniture

def generate_interactive_objects() -> Dict[str, Image.Image]:
    """Generate interactive object sprites."""
    objects = {}
    
    # TODO: Implement interactive object generation
    # - Books for bookshelf puzzle
    # - Stove components for kitchen sequence
    # - Keys and doors
    # - Collectible items (candy, batteries)
    
    return objects

def generate_decorative_elements() -> Dict[str, Image.Image]:
    """Generate decorative environmental elements."""
    decorations = {}
    
    # TODO: Implement decorative element generation
    # - Candles and candelabras
    # - Picture frames
    # - Curtains and drapes
    # - Atmospheric details
    
    return decorations

def create_tile_base(size: Tuple[int, int] = (16, 16)) -> Image.Image:
    """Create a base tile template."""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    return img

def create_seamless_pattern(base_tile: Image.Image) -> Image.Image:
    """Create a seamless tiling pattern from a base tile."""
    return base_tile

# Floor tile creation functions
def create_wood_plank_tile(variation: int = 0) -> Image.Image:
    """Create wooden plank floor tile."""
    img = Image.new('RGBA', (16, 16), FLOOR_COLORS['bg'])
    draw = ImageDraw.Draw(img)
    
    # Horizontal wood planks
    plank_colors = [FLOOR_COLORS['wood_dark'], FLOOR_COLORS['wood_light']]
    offset = variation * 2
    
    for y in range(16):
        plank_index = (y + offset) // 4 % 2
        color = plank_colors[plank_index]
        
        for x in range(16):
            # Add wood grain texture
            if x % 3 == 0 and y % 4 != 0:
                draw.point((x, y), FLOOR_COLORS['wood_outline'])
            else:
                draw.point((x, y), color)
    
    # Add plank separation lines
    for y in range(3, 16, 4):
        for x in range(16):
            draw.point((x, y), FLOOR_COLORS['wood_outline'])
    
    return img

def create_stone_tile(variation: int = 0) -> Image.Image:
    """Create stone floor tile."""
    img = Image.new('RGBA', (16, 16), FLOOR_COLORS['bg'])
    draw = ImageDraw.Draw(img)
    
    # Stone tile pattern
    base_color = FLOOR_COLORS['stone_dark']
    light_color = FLOOR_COLORS['stone_light']
    
    # Fill base
    for x in range(16):
        for y in range(16):
            draw.point((x, y), base_color)
    
    # Add stone texture variation
    if variation == 0:
        # Large single stone
        for x in range(1, 15):
            for y in range(1, 15):
                if (x + y) % 3 == 0:
                    draw.point((x, y), light_color)
    else:
        # Four smaller stones
        for x in range(16):
            for y in range(16):
                if (x // 8 + y // 8) % 2 == 0 and (x + y) % 2 == 0:
                    draw.point((x, y), light_color)
    
    # Stone borders
    for x in range(16):
        draw.point((x, 0), FLOOR_COLORS['wood_outline'])  # Top
        draw.point((x, 15), FLOOR_COLORS['wood_outline']) # Bottom
    for y in range(16):
        draw.point((0, y), FLOOR_COLORS['wood_outline'])  # Left
        draw.point((15, y), FLOOR_COLORS['wood_outline']) # Right
    
    return img

def create_carpet_tile(pattern: bool = False) -> Image.Image:
    """Create carpet floor tile."""
    img = Image.new('RGBA', (16, 16), FLOOR_COLORS['bg'])
    draw = ImageDraw.Draw(img)
    
    base_color = FLOOR_COLORS['carpet_red']
    
    # Fill base carpet
    for x in range(16):
        for y in range(16):
            draw.point((x, y), base_color)
    
    if pattern:
        # Add carpet pattern
        pattern_color = (base_color[0] + 20, base_color[1] + 10, base_color[2] + 10)
        for x in range(16):
            for y in range(16):
                if (x + y) % 4 == 0 or (x - y) % 4 == 0:
                    draw.point((x, y), pattern_color)
    
    return img

# Wall tile creation functions
def create_wallpaper_tile(pattern: bool = False) -> Image.Image:
    """Create wallpaper wall tile."""
    img = Image.new('RGBA', (16, 16), WALL_COLORS['bg'])
    draw = ImageDraw.Draw(img)
    
    base_color = WALL_COLORS['wallpaper_dark']
    light_color = WALL_COLORS['wallpaper_light']
    
    # Fill base wallpaper
    for x in range(16):
        for y in range(16):
            draw.point((x, y), base_color)
    
    if pattern:
        # Add wallpaper pattern (damask-style)
        pattern_color = WALL_COLORS['wallpaper_pattern']
        for x in range(16):
            for y in range(16):
                if (x % 8 == 4 and y % 8 == 4) or (x % 4 == 0 and y % 4 == 0):
                    draw.point((x, y), pattern_color)
    else:
        # Simple vertical stripes
        for x in range(0, 16, 2):
            for y in range(16):
                draw.point((x, y), light_color)
    
    return img

def create_stone_wall_tile(mossy: bool = False) -> Image.Image:
    """Create stone wall tile."""
    img = Image.new('RGBA', (16, 16), WALL_COLORS['bg'])
    draw = ImageDraw.Draw(img)
    
    base_color = WALL_COLORS['stone_wall']
    
    # Stone blocks
    for x in range(16):
        for y in range(16):
            # Create stone block pattern
            block_x = x // 8
            block_y = y // 8
            
            if (block_x + block_y) % 2 == 0:
                draw.point((x, y), base_color)
            else:
                darker = (base_color[0] - 10, base_color[1] - 10, base_color[2] - 10)
                draw.point((x, y), darker)
    
    if mossy:
        # Add moss texture
        moss_color = (40, 60, 30)
        for x in range(16):
            for y in range(16):
                if (x + y * 3) % 7 == 0:
                    draw.point((x, y), moss_color)
    
    # Stone mortar lines
    for x in range(16):
        draw.point((x, 7), (50, 50, 45))   # Horizontal line
    for y in range(16):
        draw.point((7, y), (50, 50, 45))   # Vertical line
    
    return img

def create_wood_panel_tile(dark: bool = False) -> Image.Image:
    """Create wood paneling tile."""
    img = Image.new('RGBA', (16, 16), WALL_COLORS['bg'])
    draw = ImageDraw.Draw(img)
    
    base_color = WALL_COLORS['wood_panel']
    if dark:
        base_color = (base_color[0] - 15, base_color[1] - 15, base_color[2] - 15)
    
    # Vertical wood panels
    for x in range(16):
        for y in range(16):
            # Panel variation
            panel = x // 4
            if panel % 2 == 0:
                draw.point((x, y), base_color)
            else:
                lighter = (base_color[0] + 10, base_color[1] + 10, base_color[2] + 10)
                draw.point((x, y), lighter)
    
    # Panel separation lines
    for x in range(3, 16, 4):
        for y in range(16):
            draw.point((x, y), (30, 25, 20))
    
    # Wood grain
    for x in range(16):
        for y in range(0, 16, 3):
            if x % 2 == 0:
                draw.point((x, y), (base_color[0] - 5, base_color[1] - 5, base_color[2] - 5))
    
    return img

if __name__ == "__main__":
    environment = generate_environment_sprites()
    total_sprites = sum(len(sprites) for sprites in environment.values())
    print(f"Generated {total_sprites} environment sprites across {len(environment)} categories")
