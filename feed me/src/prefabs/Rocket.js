class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        
        this.speed = 2;
        this.isFiring = false;
        this.maxY = borderUISize*3;
        this.initialX = x;
        this.initialY = y;
        this.sfxRocket = scene.sound.add("sfx_rocket"); // add rocket sfx
    }

    update() {
        //left right movement
        if(this.isFiring == false) {
            if(keyLEFT.isDown) {
                this.x -= this.speed;
            } 
            if(keyRIGHT.isDown) {
                this.x += this.speed;
            }
            this.x = Phaser.Math.Clamp(this.x, borderUISize + borderPadding, config.width - borderUISize - borderPadding);
        }

        //fire
        if(Phaser.Input.Keyboard.JustDown(keyF) && this.isFiring == false) {
            this.isFiring = true;
            this.sfxRocket.play();
        }
        
        //if fired, move up
        if(this.isFiring && this.y >= this.maxY + borderPadding) {
            this.y -= this.speed;
        }

        //reset on miss
        if(this.y <= this.maxY + borderPadding) {
            this.isFiring = false;
            this.y = this.initialY;
            this.x = this.initialX;
        }
    }

    reset() {
        this.isFiring = false;
        this.y = this.initialY;
        this.x = this.initialX;
    }
}