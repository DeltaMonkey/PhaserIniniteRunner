import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';

export default class Game extends Phaser.Scene
{
    constructor() {
        super('game');
    }

    create() {
        // store the width and height of the game screen
        const width: number = this.scale.width;
        const height: number = this.scale.height;

        //this.add.image(0, 0, 'background').setOrigin(0, 0);
        // change this.add.image to this.add.tileSprite
        // notice the changed parameters
        this.add.tileSprite(0, 0, width, height, TextureKeys.Background).setOrigin(0);
        
        const middleOfWidht: number = width * 0.5; 
        const middleOfHeight: number = height * 0.5;

        this.add.sprite(
            middleOfWidht, 
            middleOfHeight,
            TextureKeys.RocketMouse,
            'rocketmouse_fly01'
        ).play('rocket-mouse-run');
    }
}