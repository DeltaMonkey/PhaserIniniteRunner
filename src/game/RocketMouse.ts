import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import AnimationKeys from '../consts/AnimationKeys';

export default class RocketMouse extends Phaser.GameObjects.Container
{
    private mouse: Phaser.GameObjects.Sprite;
    private flames: Phaser.GameObjects.Sprite;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        // Create the Rocker Mouse sprite
        this.mouse = scene.add.sprite(0, 0, TextureKeys.RocketMouse)
            .setOrigin(0.5, 1)
            .play(AnimationKeys.RocketMouseRun);

        // Create the flames and play the animation
        this.flames = scene.add.sprite(-60, 45, TextureKeys.RocketMouse)
            .play(AnimationKeys.RocketFlamesOn);
        
        this.enableJetpack(false);

        // Add as child of Container
        this.add(this.flames);
        this.add(this.mouse);

        // Add a physics body
        scene.physics.add.existing(this);

        // adjust physics body size and offset
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(this.mouse.width, this.mouse.height);
        body.setOffset(this.mouse.width * -0.5, this.mouse.height * -0.5);

        this.cursors = scene.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;
    }

    preUpdate() {
        const body = this.body as Phaser.Physics.Arcade.Body;

        // Check is Space bar is down
        if (this.cursors.space?.isDown) {
            //set y acceleration to -600 if so
            body.setAccelerationY(-600);
            this.enableJetpack(true);
            this.mouse.play(AnimationKeys.RocketMouseFly, true);
        } else{
            // turn off acceleration otherwise
            body.setAccelerationY(0);
            this.enableJetpack(false);
        }

        //check if touching the ground
        if(body.blocked.down) {
            // play run when toching the ground
            this.mouse.play(AnimationKeys.RocketMouseRun, true);
        } else if(body.velocity.y > 0) {
            // play fall when no longer ascending
            this.mouse.play(AnimationKeys.RocketMouseFall, true);
        }
    }

    enableJetpack(enabled: boolean) {
        this.flames.setVisible(enabled);
    }
}