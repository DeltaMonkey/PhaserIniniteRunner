import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import SceneKeys from '../consts/SceneKeys';
import RocketMouse from '../game/RocketMouse';

export default class Game extends Phaser.Scene
{
    private background!: Phaser.GameObjects.TileSprite;
    private mouseHole!: Phaser.GameObjects.Image;
    private window1!: Phaser.GameObjects.Image;
    private window2!: Phaser.GameObjects.Image;
    private bookcase1!: Phaser.GameObjects.Image;
    private bookcase2!: Phaser.GameObjects.Image;

    private windows: Phaser.GameObjects.Image[] = [];
    private bookcases: Phaser.GameObjects.Image[] = [];

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

        // Create a new array with the 2 windows
        this.windows = [this.window1, this.window2];

        // Create bookcase 1
        this.bookcase1 = this.add.image(
            Phaser.Math.Between(2200, 2700),
            580,
            TextureKeys.Bookcase1
        ).setOrigin(0.5, 1);

        // Create bookcase 2
        this.bookcase2 = this.add.image(
            Phaser.Math.Between(2900, 3400),
            580,
            TextureKeys.Bookcase2
        ).setOrigin(0.5, 1);

        // Add rocket mouse
        const mouse = new RocketMouse(this, width * 0.5, height - 30);
        this.add.existing(mouse);

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

        this.wrapBookcases();
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
            
            // Pick random position
            this.window1.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 800
            );

            // use find() to look for a bookcase that overlaps
            // width the new window position
            const overlap: Phaser.GameObjects.Image | undefined = this.bookcases.find(bc => 
                {
                    return Math.abs(this.window1.x - bc.x) <= this.window1.width;
                }
            );

            // then set visible to true if there is no overlap
            // false if there is an overlap
            this.window1.visible = !overlap
        }

        width = this.window2.width
        if(this.window2.x + width < scrollX)
        {
            // Pick random position
            this.window2.x = Phaser.Math.Between(
                this.window1.x + width,
                this.window1.x + width + 800
            );

            const overlap: Phaser.GameObjects.Image | undefined = this.bookcases.find(bc => 
                {
                    return Math.abs(this.window2.x - bc.x) <= this.window2.width;
                }
            );

            // then set visible to true if there is no overlap
            // false if there is an overlap
            this.window2.visible = !overlap;
        }
    }

    private wrapBookcases() {
        const scrollX = this.cameras.main.scrollX;
        const rightEdge = scrollX + this.scale.width;

        let width = this.bookcase1.width * 2;
        if(this.bookcase1.x + width < scrollX)
        {
            this.bookcase1.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 800
            );

            const overlap = this.windows.find(win => 
                {
                    return Math.abs(this.bookcase1.x - win.x) <= win.width;
                }    
            );

            this.bookcase1.visible = !overlap;
        }

        width = this.bookcase2.x;
        if(this.bookcase2.x + width < scrollX)
        {
            this.bookcase2.x = Phaser.Math.Between(
                this.bookcase1.x + width,
                this.bookcase1.x + width + 800
            );

            const overlap = this.windows.find(win => 
                {
                    return Math.abs(this.bookcase2.x - win.x) <= win.width;
                }
            )

            this.bookcase2.visible = !overlap;
        }
    }
}