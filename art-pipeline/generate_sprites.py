#!/usr/bin/env python3
"""
Gas Huffer - Main Sprite Generation Script

Generates all game sprites using PIL following Derek Yu's pixel art methodology.
Coordinates character, monster, and environment sprite generation.

Derek Yu Methodology Principles:
1. Clean, readable sprites at small sizes
2. Selective outlining for clarity
3. Consistent color palettes
4. Pixel-perfect placement
5. Clear visual hierarchy
"""

import os
import time
from pathlib import Path
from typing import Dict, Any

# Import sprite generation modules
from sprites.character_sprites import generate_gas_huffer_sprites
from sprites.monster_sprites import generate_monster_sprites  
from sprites.environment_sprites import generate_environment_sprites

# Output directories
OUTPUT_DIR = Path('output')
PHASER_DIR = Path('../public/assets/sprites')

def main():
    """Main sprite generation orchestration."""
    print("🎨 Gas Huffer Sprite Generation Pipeline")
    print("=" * 50)
    
    start_time = time.time()
    
    # Ensure output directories exist
    setup_directories()
    
    # Generate all sprites
    print("\n🎭 Generating character sprites...")
    character_sprites = generate_gas_huffer_sprites()
    print(f"   Generated {len(character_sprites)} character sprites")
    
    print("\n👻 Generating monster sprites...")
    monster_sprites = generate_monster_sprites()
    monster_count = sum(len(sprites) for sprites in monster_sprites.values())
    print(f"   Generated {monster_count} monster sprites across {len(monster_sprites)} types")
    
    print("\n🏚️ Generating environment sprites...")
    environment_sprites = generate_environment_sprites()
    env_count = sum(len(sprites) for sprites in environment_sprites.values())
    print(f"   Generated {env_count} environment sprites across {len(environment_sprites)} categories")
    
    # Save all sprites
    print("\n💾 Saving sprites to output directory...")
    save_sprites_to_output(character_sprites, monster_sprites, environment_sprites)
    
    print("\n🔄 Copying optimized sprites for Phaser...")
    copy_sprites_for_phaser(character_sprites, monster_sprites, environment_sprites)
    
    # Performance report
    end_time = time.time()
    total_time = end_time - start_time
    total_sprites = len(character_sprites) + monster_count + env_count
    
    print(f"\n✅ Sprite generation complete!")
    print(f"   Total sprites: {total_sprites}")
    print(f"   Generation time: {total_time:.2f} seconds")
    print(f"   Performance: {total_sprites/total_time:.1f} sprites/second")
    
    if total_time < 5.0:
        print("🎯 Performance target achieved: Under 5 seconds!")
    else:
        print("⚠️  Performance target missed: Over 5 seconds")

def setup_directories():
    """Create necessary output directories."""
    OUTPUT_DIR.mkdir(exist_ok=True)
    PHASER_DIR.mkdir(parents=True, exist_ok=True)
    
    # Create subdirectories for organization
    (OUTPUT_DIR / 'characters').mkdir(exist_ok=True)
    (OUTPUT_DIR / 'monsters').mkdir(exist_ok=True)
    (OUTPUT_DIR / 'environment').mkdir(exist_ok=True)
    
    (PHASER_DIR / 'characters').mkdir(exist_ok=True)
    (PHASER_DIR / 'monsters').mkdir(exist_ok=True)
    (PHASER_DIR / 'environment').mkdir(exist_ok=True)

def save_sprites_to_output(character_sprites: Dict, monster_sprites: Dict, environment_sprites: Dict):
    """Save all generated sprites to the output directory."""
    
    # Save character sprites
    for name, sprite in character_sprites.items():
        if sprite:  # Only save if sprite exists
            filepath = OUTPUT_DIR / 'characters' / f'{name}.png'
            sprite.save(filepath, 'PNG')
    
    # Save monster sprites
    for monster_type, sprites in monster_sprites.items():
        for name, sprite in sprites.items():
            if sprite:  # Only save if sprite exists
                filepath = OUTPUT_DIR / 'monsters' / f'{monster_type}_{name}.png'
                sprite.save(filepath, 'PNG')
    
    # Save environment sprites  
    for category, sprites in environment_sprites.items():
        for name, sprite in sprites.items():
            if sprite:  # Only save if sprite exists
                filepath = OUTPUT_DIR / 'environment' / f'{category}_{name}.png'
                sprite.save(filepath, 'PNG')

def copy_sprites_for_phaser(character_sprites: Dict, monster_sprites: Dict, environment_sprites: Dict):
    """Copy and optimize sprites for Phaser loading."""
    
    # Copy character sprites
    for name, sprite in character_sprites.items():
        if sprite:  # Only copy if sprite exists
            filepath = PHASER_DIR / 'characters' / f'{name}.png'
            # Apply Phaser optimizations here if needed
            sprite.save(filepath, 'PNG', optimize=True)
    
    # Copy monster sprites
    for monster_type, sprites in monster_sprites.items():
        for name, sprite in sprites.items():
            if sprite:  # Only copy if sprite exists
                filepath = PHASER_DIR / 'monsters' / f'{monster_type}_{name}.png'
                sprite.save(filepath, 'PNG', optimize=True)
    
    # Copy environment sprites
    for category, sprites in environment_sprites.items():
        for name, sprite in sprites.items():
            if sprite:  # Only copy if sprite exists
                filepath = PHASER_DIR / 'environment' / f'{category}_{name}.png'
                sprite.save(filepath, 'PNG', optimize=True)

def apply_derek_yu_methodology():
    """
    Apply Derek Yu's pixel art methodology principles.
    
    Key Principles:
    1. Readability at small sizes
    2. Selective outlining for clarity
    3. Consistent color palettes
    4. Clean pixel placement
    5. Visual hierarchy
    """
    # This function serves as documentation for the methodology
    # The actual implementation is distributed across the sprite generation modules
    pass

if __name__ == "__main__":
    main()
