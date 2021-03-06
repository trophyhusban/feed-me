// the reason i made a tutorial screen is because my game is pretty abstract, and i wanted 
// to cement the theme. you are throwing chicken nuggets into a monster named derek's mouth.
// but it doens't exactly look like that, because i chose to keep it with an abstract, graphical
// background rather than explicitly drawing derek's skin. i did this for a couple of reasons.
// i also wanted to make a tutorial to give some voice to derek and make the game make just a little
// more sense. also i changed the mechanics a little bit, and i wanted to make sure the player
// could tell the difference between the mouths and the eye, and why they were aiming for the 
// mouths and not the eye. i hope that this all comes across in the tutorial!

class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }
    preload() {
        // loading images
        this.load.image("tile", "./assets/tile.png");
        this.load.image("white tile", "./assets/white_tile.png");
        this.load.image("tutorial text", "./assets/tutorial_text.png");
        //loading spritesheets
        this.load.spritesheet("pink mouth", "./assets/pink_mouth.png", {frameWidth:120, frameHeight:64, startFrame:0, endFrame: 6});
        this.load.spritesheet("red mouth", "./assets/red_mouth.png", {frameWidth:120, frameHeight:64, startFrame:0, endFrame: 6});
        this.load.spritesheet("eyeball", "./assets/eyeball.png", {frameWidth: 32, frameHeight: 32, startFrame:0, endFrame: 0});
        this.load.spritesheet("eye", "./assets/eye_blink.png", {frameWidth: 120, frameHeight: 64, startFrame:0, endFrame:5} );
        
    }

    create() {
        // mouth animation
        // these are identical to the ones in Play.js. there is more detail on the comments there 
        this.anims.create({
            key: "pink mouth",
            frames: this.anims.generateFrameNumbers("pink mouth", { frames: [0, 1, 2, 3, 4, 5] }),
            frameRate: 10,
            repeat: -1,
            yoyo: true,
        });
        this.anims.create({
            key: "red mouth",
            frames: this.anims.generateFrameNumbers("red mouth", { frames: [0, 1, 2, 3, 4, 5] }),
            frameRate: 10,
            repeat: -1,
            yoyo: true,
        });
        this.anims.create({
            key: "eye",
            frames: this.anims.generateFrameNumbers("eye", { frames: [0, 1, 2, 3, 4, 5] }),
            yoyo: true
        });

        // checkers
        this.checkers = this.add.tileSprite(
            0, 
            0, 
            640, 
            480, 
            "tile"
            ).setOrigin(0,0);

        this.grid = this.add.tileSprite(
            0, 
            0,
            640,
            480,
            "white tile"
            ).setOrigin(0,0);
        
        this.mouth1 = new Mouth(
            this, 
            config.width/2 + config.width/6 + 30, 
            borderUISize*4, 
            "pink mouth",
            0, 
            2,
            "sine",
            ["yum", "mmm"]
            ).setOrigin(0,0);
        
        this.mouth1.play(this.mouth1.texture);
        
        this.mouth2 = new Mouth(
            this, 
            config.width/2, 
            borderUISize*6 + 2, 
            "red mouth",
            0, 
            1,
            "back and forth",
            ["nom", "yummy"]
            ).setOrigin(0,0);
        
        this.mouth2.play(this.mouth2.texture);

        this.mouth3 = new Mouth(
            this, 
            config.width/2 - config.width/6 + 30,
            borderUISize*8 + 4, 
            "eyeball",
            0, 
            -1,
            "back and forth",
            []
            ).setOrigin(0,0); 

        this.leftEye = this.add.sprite(
            borderUISize*2,
            borderUISize*2.5,
            "eye"
            ).setOrigin(0,0.5);
        
        this.rightEye = this.add.sprite(
            config.width - borderUISize*2 - 120,
            borderUISize*2.5,
            "eye"
            ).setOrigin(0,0.5);

        // white bars UI
        this.add.rectangle(
            0, 
            0, 
            game.config.width, 
            borderUISize, 
            0xFFFFFF
            ).setOrigin(0 ,0);
	    this.add.rectangle(
            0, 
            game.config.height - borderUISize, 
            game.config.width, 
            borderUISize, 
            0xFFFFFF
            ).setOrigin(0 ,0);
	    this.add.rectangle(
            0, 
            0, 
            borderUISize, 
            game.config.height, 
            0xFFFFFF
            ).setOrigin(0 ,0);
	    this.frame = this.add.rectangle(
            game.config.width - borderUISize, 
            0, 
            borderUISize, 
            game.config.height, 
            0xFFFFFF
            ).setOrigin(0 ,0);
        
        // making the eyes on top blink
        this.blinkTimer = 0;
        this.nextBlink = Math.floor(Math.random()*500) + 1000;
        
        // this is the textbox UI it's just an image i made in illustrator
        // this time i exported it at regular size, so i have to place it in the scene manually
        this.textbox = this.add.sprite(borderUISize*1.5, config.height-128-borderUISize*1.5, "tutorial text").setOrigin(0, 0);
        
        // all this code is for the triangle that goes from the textbox to derek's second mouth
        // i spent so much time on this because i wanted to 
        // honestly i love coding stuff like this, so it was good practice. 
        // i will probably do more dynamic graphics like this with UI's in future projects
        this.textTriangle = [];
        this.updateTriangle(this.textTriangle);

        this.tri = this.add.polygon(
            0,
            0,
            this.textTriangle,
            0xFFFFFF
            ).setOrigin(0, 0);
        console.log(this.tri);
        console.log(this.frame);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update() {

        // animate tiles, like i do in every scene
        // i describe this function in more detail in Play.js
        this.animateTiles();

        this.mouth1.update();
        this.mouth2.update();
        this.mouth3.update();

        // this is the same blink timer as on Play.js
        this.blinkTimer ++;
        if (this.blinkTimer == this.nextBlink) {
            this.blinkTimer = 0;
            this.nextBlink = Math.floor(Math.random()*500) + 1000;
            this.leftEye.play(this.leftEye.texture);
            this.rightEye.play(this.rightEye.texture);
        }

        // so that you can go back to the main menu after reading the tutorial
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.start("menuScene");
        }

        // i draw the triangle between the mouth and the text box
        this.tri.destroy();
        this.updateTriangle(this.textTriangle);
        this.tri = this.add.polygon(
            0,
            0,
            this.textTriangle,
            0xFFFFFF
            ).setOrigin(0, 0);
    }

    animateTiles() {
        this.checkers.tilePositionX -= .5;
        this.checkers.tilePositionY -= .5;
        this.grid.tilePositionX += .25;
        this.grid.tilePositionY += .25;
    }

    // this looks like a mess and that's because
    // it is.
    // i am using this to change the triangle dynamically.
    updateTriangle(points) {

        // this is the maximum space on the left and right of the screen 
        // before the bottom half of the triangle stops moving 
        let maxWidth = 72;                              
        let bottomWidth = 48;                               // the width of the bottom line on the triangle
        let x1, y1, x2, y2, x3, y3;                         // each of the points of the triangle

        // this is so that when i first call the function, it sets the points to what they should be
        // that way i can put this all in the same function rather than setting the points when i first call the function
        if (points.length == 0) {
            x1 = this.mouth2.x + this.mouth2.width/2;       // the center of the mouth
            y1 = this.mouth2.y + this.mouth2.height/2;      // ^
            x2 = this.textbox.x;                            // x2 actually gets changed right away, so it doesnt matter what it is here
            y2 = this.textbox.y+1;                          // the top of the textbox +1 
            x3 = this.textbox.x + bottomWidth;              // same deal as x2
            y3 = this.textbox.y+1;                          // same as y2
        } else {
            x1 = this.mouth2.x + this.mouth2.width/2;       // this stays constant with the center of the mouth
            y1 = points[1];                                 // so i can increment it
            x2 = points[2];                                 // ^
            y2 = points[3];                                 // ^
            x3 = points[4];                                 // ^
            y3 = points[5];                                 // ^
        }
        // first, i make it so x2 can't move any further left than the max width i set earlier
        // same goes in the other direction for x3
        x2 = Math.max(x1 - bottomWidth/2, this.textbox.x + maxWidth);
        x3 = Math.min(x1 + bottomWidth/2, this.textbox.x + this.textbox.width - maxWidth);

        // then, i make sure that x2 doesn't go any farther right than x3, including the bottom width
        // same for the reverse on x3
        x2 = Math.min(x2, this.textbox.x + this.textbox.width - maxWidth - bottomWidth);
        x3 = Math.max(x3, this.textbox.x + maxWidth + bottomWidth);
        
        // then i update the triangle for the new coordinates
        this.textTriangle = [x1, y1, x2, y2, x3, y3];

    }
}