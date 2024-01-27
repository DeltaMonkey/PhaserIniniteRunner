import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import SceneKeys from '../consts/SceneKeys';
import AnimationKeys from '../consts/AnimationKeys';

export default class Preloader extends Phaser.Scene 
{
    constructor() {
        super(SceneKeys.Preloader);
    }

    preload() {

        // load background image
        this.load.image(TextureKeys.Background, 'assets/house/bg_repeat_340x640.png');
        
        // load mouse character as atlas
        this.load.atlas(
            TextureKeys.RocketMouse,
            'assets/characters/rocket-mouse.png',
            'assets/characters/rocket-mouse.json'
            );
       
        // load mouse holes
        this.load.image(TextureKeys.MouseHole, 'assets/house/object_mousehole.png');

        // load windows
        this.load.image(TextureKeys.Window1, 'assets/house/object_window1.png');
        this.load.image(TextureKeys.Window2, 'assets/house/object_window2.png');

        // load the bookcases
        this.load.image(TextureKeys.Bookcase1, 'assets/house/object_bookcase1.png');
        this.load.image(TextureKeys.Bookcase2, 'assets/house/object_bookcase2.png');
    }

    create() {
        this.anims.create({
            key: AnimationKeys.RocketMouseRun, // name of the animation
            // helper to generate frames 
            frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
                start: 1,
                end: 4,
                prefix: 'rocketmouse_run',
                zeroPad: 2,
                suffix: ''
            }),
            frameRate: 10,
            repeat: -1 // -1 to loop forever
        });

        this.anims.create({
            key: AnimationKeys.RocketFlamesOn,
            frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
              start: 1,
              end: 2,
              prefix: "flame",
            }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.start(SceneKeys.Game);
    }
}