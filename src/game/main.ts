import { GameScene } from './scenes/GameScene';
import { AUTO, Game } from 'phaser';

//  Gas Huffer Game Configuration
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#1a1a1a', // Dark background for spooky atmosphere
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 }, // Top-down game, no gravity
            debug: false
        }
    },
    scene: [
        GameScene
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
