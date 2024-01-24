import Phaser from 'phaser';

import Preloader from './scenes/Preloader';
import Game from './scenes/Game';

let configObject: Phaser.Types.Core.GameConfig = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'thegame',
        width: 800,
        height: 640
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 200
            }
        }
    },
    scene: [Preloader, Game]
};

export default new Phaser.Game(configObject);