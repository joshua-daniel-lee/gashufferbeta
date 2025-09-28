import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class GameScene extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;

    constructor ()
    {
        super('GameScene');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x2c3e50); // Dark blue-grey background for haunted atmosphere

        // Gas Huffer game will be implemented here
        
        EventBus.emit('current-scene-ready', this);
    }
}
