import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import SceneKeys from '../consts/SceneKeys';
import AnimationKeys from '../consts/AnimationKeys';

export default class Game extends Phaser.Scene
{
    private background!: Phaser.GameObjects.TileSprite;

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
        this.background = this.add.tileSprite(
            0, 0, 
            width, height,
            TextureKeys.Background
        )
        .setOrigin(0)
        .setScrollFactor(0,0); // <-- keep from scrolling
        
        this.add.image(
            Phaser.Math.Between(900, 1500),
            501,
            TextureKeys.MouseHole
        );

        const middleOfWidht: number = width * 0.5; 
        const middleOfHeight: number = height * 0.5;

        const mouse = this.physics.add.sprite(
            middleOfWidht, 
            height - 30, // set y to top of floor
            TextureKeys.RocketMouse,
            'rocketmouse_fly01'
        )
        .setOrigin(0.5, 1) // set origin to mouse feet
        .play(AnimationKeys.RocketMouseRun);

        const body = mouse.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);
        body.setVelocityX(200);

        this.physics.world.setBounds(
            0, 0, // x, y
            Number.MAX_SAFE_INTEGER, height - 30 // width, height
        ); 

        this.cameras.main.startFollow(mouse);
        this.cameras.main.setBounds(
            0, 0,
            Number.MAX_SAFE_INTEGER, height
        );
    }

    update(time: number, delta: number): void {
        // scroll the background
        this.background.setTilePosition(this.cameras.main.scrollX);
    }
}