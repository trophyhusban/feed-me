class Nugget extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, textureArray, nextNugget, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.currentScene = scene;
        this.speed = 2;
        this.isFiring = false;
        this.maxY = borderUISize*3;
        this.initialX = x;
        this.initialY = y;
        this.throwNugget = scene.sound.add("throw nugget"); // add rocket sfx
        this.currentNugget = 0;
        this.nuggets = textureArray;
        this.nextNugget = nextNugget;
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
        // draw the next nugget
        if(this.isFiring) {
            if(this.nextNugget.y > this.initialY) {
                this.nextNugget.y -= this.speed;
            }
            if (this.nextNugget.y < this.initialY) {
                this.nextNugget.y == this.initialY;
            }
        }
        if(this.isFiring == false) {
            this.nextNugget.y = config.height - borderUISize;
        }
    }

    reset() {
        this.isFiring = false;
        this.y = this.initialY;
        this.x = this.initialX;
        this.currentNugget++;
        if (this.currentNugget == this.nuggets.length) {
            this.currentNugget = 0;
        }
        this.setTexture(this.nuggets[this.currentNugget]);
        this.nextNugget.y = config.height;
        
    }
}