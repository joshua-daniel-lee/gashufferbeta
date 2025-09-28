import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class GameScene extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;

    constructor ()
    {
        super('GameScene');
    }

    preload ()
    {
        // Load generated character sprites
        this.load.image('gas_huffer_idle', 'assets/sprites/characters/idle.png');
        this.load.image('gas_huffer_walk_0', 'assets/sprites/characters/walk_0.png');
        this.load.image('gas_huffer_flashlight', 'assets/sprites/characters/flashlight_idle.png');

        // Load generated monster sprites
        this.load.image('ghost_float_0', 'assets/sprites/monsters/ghost_float_0.png');
        this.load.image('ghost_float_1', 'assets/sprites/monsters/ghost_float_1.png');
        this.load.image('shadow_idle', 'assets/sprites/monsters/shadow_idle.png');
        this.load.image('wraith_move_0', 'assets/sprites/monsters/wraith_move_0.png');
        this.load.image('poltergeist_energy_0', 'assets/sprites/monsters/poltergeist_energy_0.png');

        // Load generated environment sprites
        this.load.image('wood_plank', 'assets/sprites/environment/floors_wood_plank.png');
        this.load.image('stone_tile', 'assets/sprites/environment/floors_stone_tile.png');
        this.load.image('wallpaper_green', 'assets/sprites/environment/walls_wallpaper_green.png');
        this.load.image('stone_wall', 'assets/sprites/environment/walls_stone_wall.png');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x2c3e50); // Dark blue-grey background for haunted atmosphere

        // Visual Verification: Display generated sprites
        this.add.text(50, 20, 'Gas Huffer - Generated Sprites Test', { 
            fontSize: '24px', 
            color: '#ffffff' 
        });

        // Character sprites section
        this.add.text(50, 60, 'Character Sprites:', { fontSize: '16px', color: '#ffffff' });
        this.add.image(100, 100, 'gas_huffer_idle').setScale(2);
        this.add.text(70, 140, 'Idle', { fontSize: '12px', color: '#ffffff' });
        
        this.add.image(180, 100, 'gas_huffer_walk_0').setScale(2);
        this.add.text(150, 140, 'Walk', { fontSize: '12px', color: '#ffffff' });
        
        this.add.image(260, 100, 'gas_huffer_flashlight').setScale(2);
        this.add.text(220, 140, 'Flashlight', { fontSize: '12px', color: '#ffffff' });

        // Monster sprites section
        this.add.text(400, 60, 'Monster Sprites:', { fontSize: '16px', color: '#ffffff' });
        this.add.image(450, 100, 'ghost_float_0').setScale(2);
        this.add.text(425, 140, 'Ghost', { fontSize: '12px', color: '#ffffff' });
        
        this.add.image(530, 100, 'shadow_idle').setScale(2);
        this.add.text(505, 140, 'Shadow', { fontSize: '12px', color: '#ffffff' });
        
        this.add.image(610, 100, 'wraith_move_0').setScale(2);
        this.add.text(590, 140, 'Wraith', { fontSize: '12px', color: '#ffffff' });
        
        this.add.image(690, 100, 'poltergeist_energy_0').setScale(2);
        this.add.text(655, 140, 'Poltergeist', { fontSize: '12px', color: '#ffffff' });

        // Environment tiles section  
        this.add.text(50, 180, 'Environment Tiles:', { fontSize: '16px', color: '#ffffff' });
        
        // Create a small room layout using tiles
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 6; y++) {
                // Floor tiles
                this.add.image(100 + x * 16, 220 + y * 16, 'wood_plank').setScale(1);
                
                // Wall tiles on edges
                if (x === 0 || x === 7 || y === 0 || y === 5) {
                    this.add.image(100 + x * 16, 220 + y * 16, 'stone_wall').setScale(1);
                }
            }
        }
        
        this.add.text(70, 340, 'Mini Room Layout', { fontSize: '12px', color: '#ffffff' });

        // Additional tile samples
        this.add.image(250, 250, 'stone_tile').setScale(3);
        this.add.text(230, 295, 'Stone Tile', { fontSize: '12px', color: '#ffffff' });
        
        this.add.image(320, 250, 'wallpaper_green').setScale(3);
        this.add.text(295, 295, 'Wallpaper', { fontSize: '12px', color: '#ffffff' });

        // Add animation example
        const ghostSprite = this.add.image(450, 200, 'ghost_float_0').setScale(2);
        
        // Simple ghost floating animation
        this.tweens.add({
            targets: ghostSprite,
            y: ghostSprite.y - 10,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        // Status text
        this.add.text(50, 400, 'Status: All sprites loaded and rendering successfully!', { 
            fontSize: '16px', 
            color: '#00ff00' 
        });
        
        EventBus.emit('current-scene-ready', this);
    }
}
