class Nugget extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, textureArray, nextNugget, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.speed = 2;                                     // how fast the nuggets move. they move faster vertically
        this.isFiring = false;                              // if they are firing
        this.maxY = borderUISize*3;                         // the max y value they can go before resetting
        this.initialX = x;                                  // so i know where to reset them to
        this.initialY = y;                                  // ^
        this.throwNugget = scene.sound.add("throw nugget"); // add sfx
        this.currentNugget = 0;                             // current nugget out of the array of five 
        this.nuggets = textureArray;                        // the array of five nuggets
        this.nextNugget = nextNugget;                       // the next nugget sprite
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
            this.x = Phaser.Math.Clamp(this.x, borderUISize + 4 + this.width/2, config.width - borderUISize - 4 - this.width/2);
        }

        //fire
        if(Phaser.Input.Keyboard.JustDown(keyF) && this.isFiring == false) {
            this.isFiring = true;
            this.throwNugget.play();
        }
        
        //if fired, move up
        if(this.isFiring && this.y >= this.maxY + borderPadding) {
            this.y -= this.speed*2;
        }

        //reset on miss
        if(this.y <= this.maxY + borderPadding) {
            this.reset();
        }

        // control the y of nextNugget
        if(this.isFiring) {
            if(this.nextNugget.y > this.initialY) {
                this.nextNugget.y -= this.speed;
            }
            if (this.nextNugget.y < this.initialY) {
                this.nextNugget.y == this.initialY;
            }
        }
        // when not firing, hide the next nugget below the border
        if(this.isFiring == false) {
            this.nextNugget.y = config.height - borderUISize;
        }
        this.x = Math.round(this.x);
    }

    reset() {
        // stop firing, reset x and y, cycle to the next nugget sprite on the array
        this.isFiring = false;
        this.y = this.initialY;
        this.x = this.initialX;
        this.currentNugget++;
        if (this.currentNugget == this.nuggets.length) {
            this.currentNugget = 0;
        }
        this.setTexture(this.nuggets[this.currentNugget]);
        this.nextNugget.y = config.height - borderUISize;
    }
}