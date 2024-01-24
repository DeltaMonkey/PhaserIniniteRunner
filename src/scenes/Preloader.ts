import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';

export default class Preloader extends Phaser.Scene 
{
    constructor() {
        super('preloader');
    }

    preload() {
        this.load.image(TextureKeys.Background, 'assets/house/bg_repeat_340x640.png');
    
        // load mouse character as atlas
        this.load.atlas(
            TextureKeys.RocketMouse,
            'assets/characters/rocket-mouse.png',
            'assets/characters/rocket-mouse.json'
        );
    }

    create() {
        this.anims.create({
            key: 'rocket-mouse-run', // name of the animation
            // helper to generate frames 
            frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
                start: 1,
                end: 4,
                prefix: 'rocketmouse_run',
                zeroPad: 2,
                suffix: ''
            }),
            // manuel version of the helper to create frames
            //frames: [
            // { key: 'rocket-mouse', frame: 'rocketmouse_run01.png' },
            // { key: 'rocket-mouse', frame: 'rocketmouse_run02.png' },
            // { key: 'rocket-mouse', frame: 'rocketmouse_run03.png' },
            // { key: 'rocket-mouse', frame: 'rocketmouse_run04.png' }
            //],
            frameRate: 10,
            repeat: -1 // -1 to loop forever
        });

        this.scene.start('game');
    }
}