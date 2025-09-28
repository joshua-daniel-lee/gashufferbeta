# Gas Huffer Sprint 1 - Task List

## Relevant Files

- `package.json` - Project dependencies and scripts configuration
- `next.config.mjs` - Next.js configuration for build and deployment
- `src/game/main.tsx` - Main Phaser game configuration and initialization
- `src/game/scenes/GameScene.ts` - Primary game scene with all gameplay logic
- `src/game/scenes/UIScene.ts` - UI overlay scene for health, battery indicators
- `src/game/Player.ts` - Gas Huffer character class with movement and combat
- `src/game/Monster.ts` - Base monster class with AI behaviors
- `src/game/monsters/Ghost.ts` - Ghost monster implementation
- `src/game/monsters/Shadow.ts` - Shadow monster implementation
- `src/game/monsters/Wraith.ts` - Wraith monster implementation
- `src/game/monsters/Poltergeist.ts` - Poltergeist monster implementation
- `src/game/Room.ts` - Base room class for manor level design
- `src/game/rooms/GrandFoyer.ts` - Tutorial room implementation
- `src/game/rooms/MainHall.ts` - Main hall with wraith encounter
- `src/game/rooms/CursedLibrary.ts` - Library with bookshelf puzzle
- `src/game/rooms/HauntedKitchen.ts` - Kitchen with stove sequence
- `src/game/rooms/DarkCellar.ts` - Cellar with poltergeist combat
- `src/game/rooms/MasterBedroom.ts` - Boss encounter room
- `src/game/EventBus.ts` - Communication between React and Phaser
- `src/PhaserGame.tsx` - React-Phaser bridge component
- `src/components/HealthDisplay.tsx` - React component for health hearts
- `src/components/BatteryIndicator.tsx` - React component for flashlight battery
- `art-pipeline/generate_sprites.py` - Python PIL sprite generation script
- `art-pipeline/sprites/character_sprites.py` - Gas Huffer sprite generation
- `art-pipeline/sprites/monster_sprites.py` - Monster sprite generation
- `art-pipeline/sprites/environment_sprites.py` - Room tile generation
- `art-pipeline/requirements.txt` - Python dependencies for PIL pipeline
- `public/assets/sprites/` - Generated sprite output directory
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow

### Notes

- Visual testing will be conducted together after each task completion to ensure functionality
- Only the user can mark tasks as complete after visual verification
- All sprites will be generated programmatically using Python PIL following Derek Yu's methodology
- Each room implementation should include collision detection, interactive elements, and visual themes

## Tasks

- [x] 1.0 Project Foundation & Infrastructure Setup
  - [x] 1.1 Clone Next.js + Phaser template from https://github.com/phaserjs/template-nextjs
  - [x] 1.2 Strip non-essential boilerplate code and example content from template
  - [x] 1.3 Configure clean project structure with proper TypeScript settings
  - [x] 1.4 Set up Python PIL environment with requirements.txt for sprite generation
  - [x] 1.5 Verify local development server runs successfully at localhost:8080
  - [x] 1.6 **TESTING**: Test build process with `npm run build` to ensure zero errors
  - [x] 1.7 **VISUAL VERIFICATION**: Launch dev server and confirm clean Phaser canvas loads

- [ ] 2.0 Python Art Pipeline Integration
  - [ ] 2.1 Create art-pipeline directory structure with subdirectories for sprites
  - [ ] 2.2 Implement main generate_sprites.py script with Derek Yu pixel art methodology
  - [ ] 2.3 Create character_sprites.py to generate Gas Huffer sprite with basic animations
  - [ ] 2.4 Create monster_sprites.py to generate all 4 monster types (Ghost, Shadow, Wraith, Poltergeist)
  - [ ] 2.5 Create environment_sprites.py to generate room tiles and interactive objects
  - [ ] 2.6 Set up automated PNG export pipeline optimized for Phaser loading
  - [ ] 2.7 **TESTING**: Run Python script and verify sprites generate in under 5 seconds
  - [ ] 2.8 **VISUAL VERIFICATION**: Load generated sprites in Phaser and confirm proper rendering

- [ ] 3.0 Core Gameplay Systems Implementation
  - [ ] 3.1 Implement Player class with WASD/arrow key movement at 160 pixels/second
  - [ ] 3.2 Create flashlight system with spacebar/click activation and battery depletion
  - [ ] 3.3 Implement 3-heart health system with damage and invulnerability mechanics
  - [ ] 3.4 Create Monster base class with AI behavior patterns and flashlight vulnerability
  - [ ] 3.5 Implement all 4 monster types with unique patrol and combat behaviors
  - [ ] 3.6 Set up EventBus communication between React UI and Phaser game layers
  - [ ] 3.7 Create React components for health display and battery indicator
  - [ ] 3.8 Implement collectible system for Halloween Candy and battery items
  - [ ] 3.9 **TESTING**: Test all mechanics independently for proper functionality
  - [ ] 3.10 **VISUAL VERIFICATION**: Play-test movement, combat, and UI systems together

- [ ] 4.0 Haunted Manor Level Content Creation
  - [ ] 4.1 Implement Room base class with collision detection and transition system
  - [ ] 4.2 Create GrandFoyer as safe tutorial area with movement/flashlight instructions
  - [ ] 4.3 Build MainHall with patrolling wraith and combat demonstration
  - [ ] 4.4 Design CursedLibrary with interactive bookshelf puzzle and secret passage
  - [ ] 4.5 Construct HauntedKitchen with multi-step stove sequence unlocking master key
  - [ ] 4.6 Develop DarkCellar with aggressive poltergeist combat challenge
  - [ ] 4.7 Create MasterBedroom boss encounter requiring kitchen master key
  - [ ] 4.8 Implement smooth room-to-room transitions and proper gating system
  - [ ] 4.9 Add distinct visual themes and atmospheric elements to each room
  - [ ] 4.10 **TESTING**: Complete full manor walkthrough testing all puzzles and transitions
  - [ ] 4.11 **VISUAL VERIFICATION**: Play complete game loop from Foyer to Master Bedroom

- [ ] 5.0 Final Integration, Testing & Deployment
  - [ ] 5.1 Optimize performance to maintain 60 FPS across target browsers
  - [ ] 5.2 Implement proper error handling and edge case management
  - [ ] 5.3 Set up GitHub Actions workflow for automated GitHub Pages deployment
  - [ ] 5.4 Configure build process for static file generation suitable for web hosting
  - [ ] 5.5 Conduct comprehensive browser compatibility testing (Chrome, Firefox, Safari, Edge)
  - [ ] 5.6 Perform final code review and TypeScript linting cleanup
  - [ ] 5.7 **TESTING**: Execute complete end-to-end testing scenario multiple times
  - [ ] 5.8 **DEPLOYMENT**: Deploy to GitHub Pages and verify public accessibility
  - [ ] 5.9 **FINAL VERIFICATION**: Test deployed version for full functionality and performance
