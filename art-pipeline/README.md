# Gas Huffer Art Pipeline

This directory contains the Python-based sprite generation pipeline using PIL (Pillow) following Derek Yu's pixel art methodology.

## Setup

1. **Create a Python virtual environment:**
   ```bash
   cd art-pipeline
   python -m venv venv
   ```

2. **Activate the virtual environment:**
   ```bash
   # On macOS/Linux:
   source venv/bin/activate
   
   # On Windows:
   venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. **Generate all sprites:**
   ```bash
   python generate_sprites.py
   ```

2. **Generate specific sprite types:**
   ```bash
   python sprites/character_sprites.py  # Generate Gas Huffer character
   python sprites/monster_sprites.py    # Generate monster sprites
   python sprites/environment_sprites.py # Generate room tiles
   ```

## Output

Generated sprites are saved to:
- `output/` - Individual PNG files
- `../public/assets/sprites/` - Optimized for Phaser loading

## Directory Structure

```
art-pipeline/
├── generate_sprites.py          # Main generation script
├── requirements.txt             # Python dependencies
├── sprites/
│   ├── character_sprites.py     # Gas Huffer sprite generation
│   ├── monster_sprites.py       # Monster sprite generation
│   └── environment_sprites.py   # Room tile generation
├── output/                      # Generated sprite files
└── venv/                        # Python virtual environment (created on setup)
```

## Derek Yu Methodology

The sprite generation follows these pixel art principles:
- 32x32 pixel character sprites
- 16x16 pixel environment tiles
- Selective outlining and anti-aliasing
- Consistent spooky green color palette
- Clean, readable sprite design
