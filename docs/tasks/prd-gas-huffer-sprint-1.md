# Gas Huffer - Sprint 1 Product Requirements Document

## Introduction/Overview

Gas Huffer is a 2D haunted house exploration game that combines classic adventure gameplay with modern web technology. Sprint 1 focuses on establishing a solid technical foundation and delivering a complete playable demo of "The Haunted Manor" - the game's flagship level that showcases all core gameplay mechanics.

The primary goal of Sprint 1 is to create a working proof-of-concept that demonstrates the complete gameplay loop, validates the technical architecture, and provides a polished experience that can be deployed and shared via GitHub Pages.

## Goals

1. **Establish Development Infrastructure**: Create a clean, optimized Next.js + Phaser development environment with automated build processes
2. **Validate Art Pipeline**: Implement a Python PIL-based system for programmatic pixel art generation that integrates seamlessly with Phaser
3. **Deliver Complete Gameplay Demo**: Build a fully playable version of The Haunted Manor featuring all 6 rooms and core mechanics
4. **Achieve Public Deployment**: Successfully deploy the demo to GitHub Pages for public testing and feedback
5. **Prove Technical Viability**: Demonstrate that the React + Phaser hybrid architecture can support the game's requirements

## User Stories

### As a Player
- **US1**: As a player, I want to control Gas Huffer using WASD or arrow keys so that I can explore the haunted manor smoothly and intuitively
- **US2**: As a player, I want to encounter different types of monsters with distinct behaviors so that each room feels unique and challenging
- **US3**: As a player, I want to use a flashlight to combat monsters while managing battery resources so that I must make strategic decisions about when to fight or avoid enemies
- **US4**: As a player, I want to progress through all 6 rooms of The Haunted Manor so that I can experience a complete gameplay loop from start to finish
- **US5**: As a player, I want clear visual and audio feedback for my actions so that I understand the game state and my progress

### As a Developer
- **US6**: As a developer, I want a Python PIL pipeline that generates game sprites directly for Phaser so that I can efficiently create consistent pixel art assets
- **US7**: As a developer, I want a clean React + Phaser integration so that I can manage game state and UI components effectively
- **US8**: As a developer, I want automated deployment to GitHub Pages so that I can easily share builds with stakeholders and testers

## Functional Requirements

### Project Setup & Infrastructure

**REQ001**: The system must be based on the Next.js + Phaser TypeScript template from https://github.com/phaserjs/template-nextjs
**REQ002**: The system must strip all non-essential boilerplate code and example content from the template
**REQ003**: The system must build successfully with no errors or warnings in the console
**REQ004**: The system must run locally on a development server accessible via localhost
**REQ005**: The system must include a Python PIL environment with all necessary dependencies for sprite generation

### Art Pipeline Integration

**REQ006**: The system must include a Python script that generates pixel art sprites using PIL following Derek Yu's methodology
**REQ007**: The Python pipeline must export sprites in PNG format optimized for Phaser loading
**REQ008**: The system must demonstrate programmatic generation of at least one complete character sprite set (Gas Huffer)
**REQ009**: Generated sprites must integrate seamlessly into Phaser without manual conversion steps
**REQ010**: The art pipeline must support batch generation of multiple sprites with consistent styling

### Core Gameplay Mechanics

**REQ011**: Gas Huffer must move in 8 directions using WASD or arrow keys at 160 pixels per second
**REQ012**: The system must implement smooth room-to-room transitions between all 6 manor areas
**REQ013**: Gas Huffer must have a functional flashlight that can be activated/deactivated with spacebar or mouse click
**REQ014**: The flashlight must have a battery system that depletes during use and can be recharged via collectible items
**REQ015**: The system must implement 4 distinct monster types: Ghosts, Shadows, Wraiths, and Poltergeists with unique AI behaviors
**REQ016**: Monsters must be defeatable using sustained flashlight exposure with appropriate feedback animations
**REQ017**: Gas Huffer must have a 3-heart health system with visual health display
**REQ018**: The system must implement temporary invulnerability after taking damage
**REQ019**: Health must be restorable through Halloween Candy collectibles placed throughout the manor

### The Haunted Manor Level Design

**REQ020**: The system must implement the Grand Foyer as a safe tutorial area with movement and flashlight instruction
**REQ021**: The system must implement the Main Hall with a patrolling wraith demonstrating combat mechanics
**REQ022**: The system must implement the Cursed Library with an interactive bookshelf puzzle revealing a secret passage
**REQ023**: The system must implement the Haunted Kitchen with a multi-step stove sequence puzzle unlocking the master bedroom
**REQ024**: The system must implement the Dark Cellar with intensive combat featuring an aggressive poltergeist
**REQ025**: The system must implement the Master Bedroom as a boss encounter area requiring the kitchen's master key
**REQ026**: Each room must have distinct visual themes and atmospheric elements appropriate to the haunted manor setting
**REQ027**: The level must support non-linear exploration with appropriate gating via keys and completed puzzles

### Technical Architecture

**REQ028**: The system must use React components for UI elements (health display, battery indicator, menu systems)
**REQ029**: The system must implement EventBus communication between React and Phaser layers
**REQ030**: The system must maintain consistent 60 FPS performance across target browsers (Chrome, Firefox, Safari, Edge)
**REQ031**: The system must be responsive and playable on desktop browsers with keyboard input
**REQ032**: Game state must persist appropriately during room transitions without data loss

### Deployment Requirements

**REQ033**: The system must build into static files suitable for GitHub Pages deployment
**REQ034**: The deployed version must be accessible via a public URL without authentication
**REQ035**: The deployed version must maintain full functionality including asset loading and game progression
**REQ036**: The system must include automated deployment workflow via GitHub Actions or similar CI/CD pipeline

## Non-Goals (Out of Scope)

- **Mobile touch controls or responsive mobile optimization**
- **Save game functionality or persistent progress**
- **Audio implementation (music, sound effects, ambient audio)**
- **Additional haunted houses beyond The Haunted Manor**
- **Multiplayer or co-op functionality**
- **Advanced visual effects (particle systems, dynamic lighting)**
- **Accessibility features (screen reader support, colorblind options)**
- **Localization or multi-language support**
- **Analytics or telemetry integration**
- **User account system or leaderboards**

## Design Considerations

### Visual Style
- Follow Derek Yu's pixel art methodology with clean, readable sprites
- Maintain consistent spooky green color palette throughout the manor
- Implement 32x32 pixel sprites for characters and 16x16 tiles for environments
- Use selective outlining and anti-aliasing techniques for polished visual quality

### User Interface
- Minimalist HUD showing only essential information (health hearts, battery level)
- Clear visual feedback for interactive elements (highlighted doors, glowing items)
- Smooth transitions between game states and rooms
- Consistent styling that matches the haunted manor aesthetic

### Technical Architecture
- Clean separation between React UI layer and Phaser game layer
- Event-driven communication for loose coupling between systems
- Object pooling for efficient monster and projectile management
- Modular room system to support easy addition of future content

## Technical Considerations

### Dependencies
- Next.js 15.3.1+ for the React framework foundation
- Phaser 3.90.0+ for 2D game engine capabilities
- TypeScript 5+ for type safety and development tooling
- Python 3.8+ with PIL (Pillow) for sprite generation pipeline

### Performance Requirements
- Target 60 FPS on desktop browsers released within the last 2 years
- Initial load time under 10 seconds on standard broadband connections
- Room transition time under 2 seconds including asset loading
- Memory usage under 512MB during normal gameplay

### Browser Compatibility
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Development Workflow
- Hot reloading for rapid iteration during development
- TypeScript compilation with strict type checking
- ESLint configuration for code quality consistency
- Automated testing setup for core game mechanics

## Success Metrics

### Technical Success Metrics
- **Build Success Rate**: 100% successful builds with zero errors
- **Performance**: Consistent 60 FPS during gameplay across target browsers
- **Load Time**: Initial game load completes in under 10 seconds
- **Deployment**: Successful automated deployment to GitHub Pages with 99%+ uptime

### Gameplay Success Metrics
- **Completability**: 100% of testers can complete the manor from start to finish
- **Core Mechanics**: All essential mechanics (movement, combat, puzzles) function as specified
- **Room Progression**: Seamless transitions between all 6 manor rooms
- **Art Integration**: Python-generated sprites display correctly in all game contexts

### User Experience Metrics
- **Intuitive Controls**: New players understand movement and flashlight mechanics within 30 seconds
- **Clear Progression**: Players can identify their current objective and next steps at any point
- **Technical Stability**: Zero game-breaking bugs that prevent completion
- **Visual Quality**: Consistent pixel art style throughout all game assets

### Development Process Metrics
- **Pipeline Efficiency**: Python art pipeline generates sprites in under 5 seconds per asset
- **Code Quality**: All TypeScript code passes strict linting with zero warnings
- **Documentation**: All major systems have clear inline documentation
- **Maintainability**: New developers can set up the development environment in under 15 minutes

## Open Questions

### Technical Implementation
- **Question 1**: Should the Python PIL pipeline generate sprites at build time or runtime?
- **Question 2**: What's the optimal sprite atlas organization for efficient loading?
- **Question 3**: How should we handle sprite animations - individual frames or sprite sheets?

### Game Design
- **Question 4**: What's the ideal difficulty curve for the monster encounters across the 6 rooms?
- **Question 5**: Should puzzle solutions be randomized or static for consistent testing?
- **Question 6**: How explicit should the tutorial instructions be in the Grand Foyer?

### Art Pipeline
- **Question 7**: Should we generate color palette variations programmatically for different room themes?
- **Question 8**: What level of sprite detail works best at 32x32 resolution for our aesthetic?
- **Question 9**: Should environmental tiles be generated via Python or created manually?

### Deployment & Testing
- **Question 10**: What automated testing framework best suits our React + Phaser architecture?
- **Question 11**: Should we implement A/B testing for different UI layouts during Sprint 1?
- **Question 12**: What analytics (if any) should be included for gathering player behavior data?

---

**Document Version**: 1.0  
**Created**: Sprint 1 Kickoff  
**Last Updated**: Sprint 1 Kickoff  
**Review Required**: Before Sprint 1 development begins

This PRD serves as the definitive guide for Sprint 1 implementation. All requirements should be validated against this document, and any scope changes must be formally reviewed and documented.
