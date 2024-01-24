import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene 
{
    constructor() {
        super('preloader');
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
        this.scene.start('game');
    }
}