import Phaser from 'phaser';

export default class Game extends Phaser.Scene
{
    constructor() {
        super('game');
    }

    preload() {
        this.load.image('background', 'assets/house/bg_repeat_340x640.png');
    
        // load mouse character as atlas
        this.load.atlas(
            'rocket-mouse',
            'assets/characters/rocket-mouse.png',
            'assets/characters/rocket-mouse.json'
        );
    }

    create() {
    
        this.anims.create({
            key: 'rocket-mouse-run', // name of the animation
            // helper to generate frames 
            frames: this.anims.generateFrameNames('rocket-mouse', {
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

        // store the width and height of the game screen
        const width: number = this.scale.width;
        const height: number = this.scale.height;

        //this.add.image(0, 0, 'background').setOrigin(0, 0);
        // change this.add.image to this.add.tileSprite
        // notice the changed parameters
        this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0);
        
        const middleOfWidht: number = width * 0.5; 
        const middleOfHeight: number = height * 0.5;

        this.add.sprite(
            middleOfWidht, 
            middleOfHeight,
            'rocket-mouse',
            'rocketmouse_fly01'
        ).play('rocket-mouse-run');
    }
}