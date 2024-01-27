import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import AnimationKeys from '../consts/AnimationKeys';

export default class RocketMouse extends Phaser.GameObjects.Container
{
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        // Create the Rocker Mouse sprite
        const mouse = scene.add.sprite(0, 0, TextureKeys.RocketMouse)
            .setOrigin(0.5, 1)
            .play(AnimationKeys.RocketMouseRun);

        // Create the flames and play the animation
        const flames = scene.add.sprite(-60, 45, TextureKeys.RocketMouse)
            .play(AnimationKeys.RocketFlamesOn);
        
        // Add as child of Container
        this.add(flames);
        this.add(mouse);

        // Add a physics body
        scene.physics.add.existing(this);

        // adjust physics body size and offset
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(mouse.width, mouse.height);
        body.setOffset(mouse.width * -0.5, mouse.height * -0.5);
    }
}