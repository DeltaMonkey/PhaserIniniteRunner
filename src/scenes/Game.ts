import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import SceneKeys from '../consts/SceneKeys';
import AnimationKeys from '../consts/AnimationKeys';

export default class Game extends Phaser.Scene
{
    constructor() {
        super(SceneKeys.Game);
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

        const mouse = this.physics.add.sprite(
            middleOfWidht, 
            middleOfHeight,
            TextureKeys.RocketMouse,
            'rocketmouse_fly01'
        ).play(AnimationKeys.RocketMouseRun);

        const body = mouse.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);

        this.physics.world.setBounds(
            0, 0, // x, y
            Number.MAX_SAFE_INTEGER, height - 30 // width, height
        ); 
    }
}