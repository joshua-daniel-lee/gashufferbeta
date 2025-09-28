# Gas Huffer

A 2D haunted house exploration game built with Next.js and Phaser, featuring procedurally generated pixel art and atmospheric horror gameplay.

## 🎮 Game Overview

Gas Huffer is a spooky adventure game where players control Gas Huffer as he explores haunted houses in search of Broken Heart Pieces. Each haunted house is designed as a self-contained Zelda-style dungeon with puzzles, monsters, and atmospheric storytelling.

### Key Features
- 🏚️ **Haunted Manor Exploration** - Navigate through 6 interconnected rooms with unique challenges
- 💡 **Flashlight Combat System** - Strategic combat with battery management mechanics
- 👻 **4 Distinct Monster Types** - Ghosts, Shadows, Wraiths, and Poltergeists with unique AI
- 🧩 **Environmental Puzzles** - Interactive bookshelf sequences, stove puzzles, and secret passages
- 🎨 **Programmatic Pixel Art** - Python PIL-generated sprites following Derek Yu's methodology
- ⚡ **Modern Web Tech** - Built with Next.js 15 + Phaser 3.90 for smooth performance

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **Python** 3.8+ 
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/joshua-daniel-lee/gashufferbeta.git
   cd gashufferbeta
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Set up the Python art pipeline**
   ```bash
   cd art-pipeline
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cd ..
   ```

### Development

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Visit the game**
   Open [http://localhost:8080](http://localhost:8080) in your browser

3. **Generate sprites** (optional)
   ```bash
   cd art-pipeline
   python generate_sprites.py
   ```

### Building for Production

```bash
npm run build
npm run export  # Creates static files for deployment
```

## 📁 Project Structure

```
gashufferbeta/
├── src/                          # Game source code
│   ├── components/               # React UI components
│   ├── game/                     # Phaser game logic
│   │   ├── scenes/              # Game scenes
│   │   ├── monsters/            # Monster implementations
│   │   ├── rooms/               # Manor room definitions
│   │   └── main.ts              # Phaser configuration
│   ├── pages/                   # Next.js pages
│   └── styles/                  # CSS styling
├── public/                      # Static assets
│   └── assets/sprites/          # Generated sprite files
├── art-pipeline/                # Python sprite generation
│   ├── sprites/                 # Sprite generation modules
│   ├── output/                  # Generated sprite files
│   ├── generate_sprites.py      # Main generation script
│   └── requirements.txt         # Python dependencies
├── docs/                        # Documentation
│   ├── tasks/                   # Sprint planning and PRDs
│   └── GAS_HUFFER_GAME_TREATMENT.md  # Game design document
└── tools/                       # Development tools and utilities
```

## 🎯 Sprint 1 Goals

Currently implementing Sprint 1 features:

- ✅ **Project Foundation** - Clean Next.js + Phaser setup with TypeScript
- ✅ **Python Art Pipeline** - PIL-based sprite generation system
- 🔄 **Core Gameplay Systems** - Movement, combat, health, and flashlight mechanics
- 🔄 **Haunted Manor Level** - Complete 6-room playable demo
- 🔄 **Deployment** - GitHub Pages deployment pipeline

See [docs/tasks/](docs/tasks/) for detailed sprint planning and progress tracking.

## 🎨 Art Pipeline

Gas Huffer uses a unique Python-based art generation system following Derek Yu's pixel art methodology:

- **32x32 pixel** character sprites
- **16x16 pixel** environment tiles
- **Selective outlining** and anti-aliasing
- **Consistent spooky palette** throughout the game
- **Automated generation** optimized for Phaser loading

### Generating Sprites

```bash
cd art-pipeline
source venv/bin/activate  # Activate Python environment

# Generate all sprites
python generate_sprites.py

# Generate specific types
python sprites/character_sprites.py    # Gas Huffer character
python sprites/monster_sprites.py      # All monster types
python sprites/environment_sprites.py  # Room tiles and objects
```

## 🎮 Gameplay

### Controls
- **WASD / Arrow Keys** - Move Gas Huffer (160 pixels/second)
- **Spacebar / Mouse Click** - Activate/deactivate flashlight
- **Mouse** - Interact with UI elements

### Core Mechanics
- **Health System** - 3-heart health with invulnerability after damage
- **Flashlight Combat** - Defeat monsters with sustained light exposure
- **Battery Management** - Strategic resource management for combat
- **Environmental Puzzles** - Interactive objects and sequence-based challenges

### The Haunted Manor
Navigate through 6 themed rooms:
1. **Grand Foyer** - Tutorial area with movement/flashlight instruction
2. **Main Hall** - Patrolling wraith encounter
3. **Cursed Library** - Bookshelf puzzle with secret passage
4. **Haunted Kitchen** - Multi-step stove sequence
5. **Dark Cellar** - Aggressive poltergeist combat challenge
6. **Master Bedroom** - Boss encounter requiring master key

## 🛠️ Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (localhost:8080) |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run export` | Export static files for deployment |
| `npm run lint` | Run ESLint code analysis |
| `npm run type-check` | TypeScript type checking |

## 🔧 Technology Stack

### Frontend
- **[Next.js 15.3.1](https://nextjs.org/)** - React framework with SSG capabilities
- **[React 19](https://react.dev/)** - UI component library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Game Engine
- **[Phaser 3.90.0](https://phaser.io/)** - 2D game framework
- **Arcade Physics** - Collision detection and movement
- **WebGL/Canvas** - Hardware-accelerated rendering

### Art Pipeline
- **[Python 3.8+](https://python.org/)** - Sprite generation runtime
- **[Pillow (PIL)](https://pillow.readthedocs.io/)** - Image processing library
- **[NumPy](https://numpy.org/)** - Mathematical operations for pixel manipulation
- **[Matplotlib](https://matplotlib.org/)** - Sprite visualization during development

### Deployment
- **[GitHub Pages](https://pages.github.com/)** - Static site hosting
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipeline

## 📊 Performance Targets

- **60 FPS** consistent gameplay across desktop browsers
- **<10 second** initial load time
- **<2 second** room transition time
- **<5 second** sprite generation time
- **<512MB** memory usage during gameplay

## 🚢 Deployment

### GitHub Pages (Automatic)
Commits to `main` branch automatically trigger deployment to GitHub Pages.

### Manual Deployment
```bash
npm run build
npm run export
# Upload contents of `out/` directory to your hosting provider
```

## 🧪 Testing

### Local Testing
```bash
# Development server
npm run dev

# Production build testing
npm run build && npm run start
```

### Visual Testing Protocol
Each major feature includes visual verification steps:
1. Implement feature
2. Test functionality in browser
3. Confirm visual appearance matches specifications
4. Verify cross-browser compatibility

## 📝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Follow the task-based development process** (see `docs/tasks/`)
4. **Commit changes** using conventional commit format
5. **Push to branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Development Process
- One sub-task at a time following process-task-list.mdc guidelines
- Visual verification required for UI/gameplay features
- All changes must build successfully with zero errors
- Maintain consistent code formatting (ESLint + Prettier)

## 📚 Documentation

- **[Game Design Document](docs/GAS_HUFFER_GAME_TREATMENT.md)** - Complete game treatment and vision
- **[Sprint Planning](docs/tasks/)** - PRDs, task lists, and development progress
- **[Art Pipeline Guide](art-pipeline/README.md)** - Sprite generation documentation
- **[Development Tools](tools/)** - Process documentation and utilities

## 🤝 Acknowledgments

- **[Phaser Team](https://phaser.io/)** - Excellent 2D game framework
- **[Derek Yu](https://www.derekyu.com/)** - Pixel art methodology and inspiration
- **[Next.js Team](https://nextjs.org/)** - Modern React framework
- **Retro Horror Games** - Inspiration for atmospheric design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎃 About Gas Huffer

*"Every step forward brings him closer to confronting the pumpkin king and proving his worth to the girl who rejected him."*

Gas Huffer is more than just a horror game - it's a story about courage, determination, and proving oneself in the face of supernatural terror. Each Broken Heart Piece collected represents not just game progress, but Gas Huffer's growing confidence and bravery.

---

**Game Status**: 🔄 In Development - Sprint 1  
**Latest Update**: Project Foundation Complete  
**Next Milestone**: Python Art Pipeline Integration  

[🎮 Play the Demo](https://joshua-daniel-lee.github.io/gashufferbeta/) | [📋 View Tasks](docs/tasks/) | [🎨 Art Pipeline](art-pipeline/)
