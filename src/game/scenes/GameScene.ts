import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Player } from '../Player';
import { Monster } from '../Monster';
import { Ghost } from '../monsters/Ghost';
import { Shadow } from '../monsters/Shadow';
import { Wraith } from '../monsters/Wraith';
import { Poltergeist } from '../monsters/Poltergeist';

export class GameScene extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    player: Player;
    monsters: Monster[] = [];

    constructor ()
    {
        super('GameScene');
    }

    preload ()
    {
        // Load generated character sprites
        this.load.image('gas_huffer_idle', 'assets/sprites/characters/idle.png');
        this.load.image('gas_huffer_walk_0', 'assets/sprites/characters/walk_0.png');
        this.load.image('gas_huffer_walk_1', 'assets/sprites/characters/walk_1.png');
        this.load.image('gas_huffer_walk_2', 'assets/sprites/characters/walk_2.png');
        this.load.image('gas_huffer_walk_3', 'assets/sprites/characters/walk_3.png');
        this.load.image('gas_huffer_flashlight', 'assets/sprites/characters/flashlight_idle.png');

        // Load generated monster sprites - Ghost
        this.load.image('ghost_float_0', 'assets/sprites/monsters/ghost_float_0.png');
        this.load.image('ghost_float_1', 'assets/sprites/monsters/ghost_float_1.png');
        this.load.image('ghost_float_2', 'assets/sprites/monsters/ghost_float_2.png');
        
        // Shadow sprites
        this.load.image('shadow_idle', 'assets/sprites/monsters/shadow_idle.png');
        this.load.image('shadow_alert', 'assets/sprites/monsters/shadow_alert.png');
        
        // Wraith sprites
        this.load.image('wraith_move_0', 'assets/sprites/monsters/wraith_move_0.png');
        this.load.image('wraith_move_1', 'assets/sprites/monsters/wraith_move_1.png');
        this.load.image('wraith_move_2', 'assets/sprites/monsters/wraith_move_2.png');
        this.load.image('wraith_move_3', 'assets/sprites/monsters/wraith_move_3.png');
        this.load.image('wraith_attack', 'assets/sprites/monsters/wraith_attack.png');
        
        // Poltergeist sprites
        this.load.image('poltergeist_energy_0', 'assets/sprites/monsters/poltergeist_energy_0.png');
        this.load.image('poltergeist_energy_1', 'assets/sprites/monsters/poltergeist_energy_1.png');
        this.load.image('poltergeist_energy_2', 'assets/sprites/monsters/poltergeist_energy_2.png');
        this.load.image('poltergeist_energy_3', 'assets/sprites/monsters/poltergeist_energy_3.png');
        this.load.image('poltergeist_throw', 'assets/sprites/monsters/poltergeist_throw.png');

        // Load generated environment sprites
        this.load.image('wood_plank', 'assets/sprites/environment/floors_wood_plank.png');
        this.load.image('stone_tile', 'assets/sprites/environment/floors_stone_tile.png');
        this.load.image('wallpaper_green', 'assets/sprites/environment/walls_wallpaper_green.png');
        this.load.image('stone_wall', 'assets/sprites/environment/walls_stone_wall.png');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x1a1a2e); // Dark haunted atmosphere

        // Enable physics
        this.physics.world.setBounds(0, 0, 800, 600);

        // Create test room with environment tiles
        this.createTestRoom();

        // Create player
        this.player = new Player(this, 400, 300);

        // Create monsters for testing
        this.createTestMonsters();

        // Set up collision detection
        this.setupCollisions();

        // Set camera to follow player
        this.camera.startFollow(this.player, true, 0.05, 0.05);
        this.camera.setZoom(1);

        // Add UI instructions
        this.add.text(20, 20, 'Gas Huffer - Core Gameplay Test', { 
            fontSize: '20px', 
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setScrollFactor(0);

        this.add.text(20, 55, 'Controls:', { 
            fontSize: '14px', 
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 5, y: 3 }
        }).setScrollFactor(0);

        this.add.text(20, 80, 'WASD/Arrows: Move (160 px/sec)', { 
            fontSize: '12px', 
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 5, y: 2 }
        }).setScrollFactor(0);

        this.add.text(20, 100, 'SPACE: Toggle Flashlight', { 
            fontSize: '12px', 
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 5, y: 2 }
        }).setScrollFactor(0);

        this.add.text(20, 120, 'T: Take damage (test)', { 
            fontSize: '12px', 
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 5, y: 2 }
        }).setScrollFactor(0);

        this.add.text(20, 140, 'H: Heal (test)', { 
            fontSize: '12px', 
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 5, y: 2 }
        }).setScrollFactor(0);

        this.add.text(20, 160, 'B: Recharge battery (test)', { 
            fontSize: '12px', 
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 5, y: 2 }
        }).setScrollFactor(0);

        // Add test keys for mechanics
        const testKeys = this.input.keyboard!.addKeys('T,H,B') as any;
        
        // Test damage
        testKeys.T.on('down', () => {
            this.player.takeDamage(1);
        });
        
        // Test heal
        testKeys.H.on('down', () => {
            this.player.heal(1);
        });
        
        // Test battery recharge
        testKeys.B.on('down', () => {
            this.player.rechargeBattery(25);
        });
        
        EventBus.emit('current-scene-ready', this);
    }

    private createTestRoom(): void {
        // Create a larger test room using environment tiles
        const roomWidth = 50; // tiles
        const roomHeight = 38; // tiles
        const tileSize = 16;

        for (let x = 0; x < roomWidth; x++) {
            for (let y = 0; y < roomHeight; y++) {
                const worldX = x * tileSize;
                const worldY = y * tileSize;

                // Create walls around the perimeter
                if (x === 0 || x === roomWidth - 1 || y === 0 || y === roomHeight - 1) {
                    this.add.image(worldX, worldY, 'stone_wall');
                } else {
                    // Fill with floor tiles
                    this.add.image(worldX, worldY, 'wood_plank');
                }
            }
        }

        // Add some decorative elements
        this.add.text(400, 200, 'Test Room - Move around with WASD!', { 
            fontSize: '16px', 
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);
    }

    private createTestMonsters(): void {
        // Create one of each monster type for testing
        
        // Ghost - predictable patrol in top-left
        const ghost = new Ghost(this, 150, 150, this.player);
        this.monsters.push(ghost);
        
        // Shadow - guards center-left area
        const shadow = new Shadow(this, 200, 300, this.player);
        this.monsters.push(shadow);
        
        // Wraith - aggressive patroller in top-right
        const wraith = new Wraith(this, 650, 150, this.player);
        this.monsters.push(wraith);
        
        // Poltergeist - chaotic movement in bottom area
        const poltergeist = new Poltergeist(this, 400, 450, this.player);
        this.monsters.push(poltergeist);
        
        // Add labels for monster identification
        this.add.text(150, 120, 'Ghost', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5);
        this.add.text(200, 270, 'Shadow', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5);
        this.add.text(650, 120, 'Wraith', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5);
        this.add.text(400, 420, 'Poltergeist', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5);
    }

    private setupCollisions(): void {
        // Set up collision detection between player and monsters
        this.monsters.forEach(monster => {
            this.physics.add.overlap(this.player, monster, () => {
                monster.collideWithPlayer();
            }, undefined, this);
        });
    }

    update(time: number, delta: number): void {
        if (this.player) {
            this.player.update(time, delta);
        }
        
        // Update all monsters
        this.monsters.forEach(monster => {
            if (monster && monster.active) {
                monster.update(time, delta);
            }
        });
        
        // Clean up destroyed monsters
        this.monsters = this.monsters.filter(monster => monster && monster.active);
    }
}
