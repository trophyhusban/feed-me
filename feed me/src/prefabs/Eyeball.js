class Eyeball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.direction = Math.floor(Math.random()*2);
        if (this.direction == 0) {
            this.direction = -1;
        }
    }
    update () {
        this.x += (this.speed - this.eatingSpeedDifference) * this.direction;
        if (this.x <= borderUISize) {
            this.direction = 1;
        }
        if (this.x + this.width >= config.width - borderUISize) {
            this.direction = -1;
        }
    }
}