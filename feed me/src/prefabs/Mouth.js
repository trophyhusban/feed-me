class Mouth extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, ai) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.speed = game.settings.mouthSpeed;
        this.ai = ai;
        this.direction = -1;
        this.time = 0;
        this.sinSpeed = (1.5/this.speed)*100;
    }

    update() {
        if (this.ai == "back and forth") {
            this.x += this.speed * this.direction;
            if (this.x <= borderUISize) {
                this.direction = 1;
            }
            if (this.x + this.width >= config.width - borderUISize) {
                this.direction = -1;
            }
        } 
        if (this.ai == "sin") {
            this.time++;
            //this.x = config.width/2 + this.width+ ((config.width-borderUISize*2-this.width)/2) * Math.sin(this.time/100);
            this.x = Math.round(Math.sin(this.time/this.sinSpeed) * (config.width-borderUISize*2-this.width)/2 + (config.width-borderUISize*2)/2);

        } 
    }

    reset() {
        this.x = config.width;
    }
}