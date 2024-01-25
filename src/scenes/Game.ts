import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import SceneKeys from '../consts/SceneKeys';
import AnimationKeys from '../consts/AnimationKeys';

export default class Game extends Phaser.Scene
{
    private background!: Phaser.GameObjects.TileSprite;
    private mouseHole!: Phaser.GameObjects.Image;
    private window1!: Phaser.GameObjects.Image;
    private window2!: Phaser.GameObjects.Image;

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
        
        // Create mouse hole
        this.mouseHole = this.add.image(
            Phaser.Math.Between(900, 1500),
            501,
            TextureKeys.MouseHole
        );

        // Create Window 1
        this.window1 = this.add.image(
            Phaser.Math.Between(900, 1300),
            200,
            TextureKeys.Window1
        )
        
        // Create Window 2
        this.window2 = this.add.image(
            Phaser.Math.Between(1600, 2000),
            200,
            TextureKeys.Window2
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

        this.wrapMouseHole();

        this.wrapWindows();
    }

    private wrapMouseHole() {
        const scrollX = this.cameras.main.scrollX;

        // hole x position must be bigger than all passed way and screen width
        const rightEdge = scrollX + this.scale.width;

        if(this.mouseHole.x + this.mouseHole.width < scrollX) {
            this.mouseHole.x = Phaser.Math.Between(
                rightEdge + 100,
                rightEdge + 1000
            );
        }
    }

    private wrapWindows() {
        const scrollX = this.cameras.main.scrollX;

        // the window x position must be bigger than all passed way and screen width
        const rightEdge = scrollX + this.scale.width

        let width = this.window1.width * 2; // multiply by 2 to add some more padding
        if(this.window1.x + width < scrollX) {
            this.window1.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 800
            );
        }

        width = this.window2.width
        if(this.window2.x + width < scrollX)
        {
            this.window2.x = Phaser.Math.Between(
                this.window1.x + width,
                this.window1.x + width + 800
            );
        }


    }
}