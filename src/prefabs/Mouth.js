class Mouth extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, ai, sounds) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.points = pointValue;                       // the points this mouth is worth
        this.speed = game.settings.mouthSpeed;          // how fast they go, from the setting object
        this.ai = ai;                                   // ai, one of two, "back and forth" or "sine"
        this.direction = Math.floor(Math.random()*2);   // this randomizes the direction at the start of the game
        if (this.direction == 0) {
            this.direction = -1;
        }
        this.time = 0;                                  // i count time up for the sine ai
        this.sinSpeed = (1.25/this.speed)*100;          // this controls the speed for the sine ai, relative to the speed from the menu
        this.eatingSpeedDifference = 0;                 // so that they can slow when they are eating
        this.sounds = sounds;                           // the sounds
        if (texture == "eyeball") {                     // i wanted the eyeball to be slower
            this.speed --;
        }
        this.isEating = false;                          // this is used when changing the texture/animation
    }

    update() {
        this.time++;

        // i make them slower when they are eating so the path of the mouths changes based on player actions
        // that way it is not the same every time
        // changing the speed this way doesn't work with the algorithm i use for the sine ai
        if (this.isEating) { 
            this.eatingSpeedDifference = 1;
        } else {
            this.eatingSpeedDifference = 0;
        }

        // it bounces off the walls
        if (this.ai == "back and forth") {
            this.x += (this.speed - this.eatingSpeedDifference) * this.direction;
            if (this.x <= borderUISize) {   // reverse direction
                this.direction = 1;
            }
            if (this.x + this.width >= config.width - borderUISize) {
                this.direction = -1;        // reverse again
            }
        } 
        
        // it follows a sine wave across the screen
        if (this.ai == "sine") {
            this.x = Math.cos(this.time/this.sinSpeed) * (config.width-borderUISize*2-this.width)/2 + (config.width-borderUISize*2-this.width/2)/2;
        } 
    }
}