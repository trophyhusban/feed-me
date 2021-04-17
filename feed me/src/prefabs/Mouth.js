class Mouth extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, ai, sounds) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.speed = game.settings.mouthSpeed;
        this.ai = ai;
        this.direction = Math.floor(Math.random()*2);
        if (this.direction == 0) {
            this.direction = -1;
        }
        this.time = 0;
        this.sinSpeed = (1.5/this.speed)*100;
        this.minX = x;
        this.maxX = x;
        this.eatingSpeedDifference = 0;
        this.sounds = sounds;
        if (texture == "eyeball") {
            this.speed --;
        }
        //this.alternateY = 2;
    }

    update() {
        this.time++;
        if (this.isEating) {
            this.eatingSpeedDifference = 2;
        } else {
            this.eatingSpeedDifference = 0;
        }
        if (this.ai == "back and forth") {
            this.x += (this.speed - this.eatingSpeedDifference) * this.direction;
            if (this.x <= borderUISize) {
                this.direction = 1;
            }
            if (this.x + this.width >= config.width - borderUISize) {
                this.direction = -1;
            }
        } 
        if (this.ai == "sine") {
            //this.x = config.width/2 + this.width+ ((config.width-borderUISize*2-this.width)/2) * Math.sin(this.time/100);
            this.x = Math.sin(this.time/this.sinSpeed) * (config.width-borderUISize*2-this.width)/2 + (config.width-borderUISize*2-this.width/2)/2;
        } 
        
        /* if (this.time%15 == 0) {
            this.y += this.alternateY;
            this.alternateY*= -1;
        } */
    }

    reset() {
        this.x = config.width;
    }
}