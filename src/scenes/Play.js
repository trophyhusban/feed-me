class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images so they can be used
        this.load.image("nugget1", "./assets/nugget1.png");
        this.load.image("nugget2", "./assets/nugget2.png");
        this.load.image("nugget3", "./assets/nugget3.png");
        this.load.image("nugget4", "./assets/nugget4.png");
        this.load.image("nugget5", "./assets/nugget5.png");
        this.load.image("tile", "./assets/tile.png");
        this.load.image("white tile", "./assets/white_tile.png");
        // load sprite sheets
        this.load.spritesheet("pink mouth", "./assets/pink_mouth.png", {frameWidth:120, frameHeight:64, startFrame:0, endFrame: 6});
        this.load.spritesheet("red mouth", "./assets/red_mouth.png", {frameWidth:120, frameHeight:64, startFrame:0, endFrame: 6});
        this.load.spritesheet("pink lick", "./assets/pink_lick.png", {frameWidth:120, frameHeight:64, startFrame:0, endFrame: 7});
        this.load.spritesheet("red lick", "./assets/red_lick.png", {frameWidth:120, frameHeight:64, startFrame:0, endFrame: 7});
        this.load.spritesheet("eyeball", "./assets/eyeball.png", {frameWidth: 32, frameHeight: 32, startFrame:0, endFrame: 0});
        this.load.spritesheet("eyeball hurt", "./assets/eyeball_hurt.png", {frameWidth: 32, frameHeight:32, startFrame:0, endFrame: 0});
        this.load.spritesheet("eye", "./assets/eye_blink.png", {frameWidth: 120, frameHeight: 64, startFrame:0, endFrame:5} );
    }

    create() {
        // mouth animation
        this.anims.create({
            key: "pink mouth",      // i recolored it to be blue but i dont wanna change the key name
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
            key: "pink lick",
            frames: this.anims.generateFrameNumbers("pink lick", { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
            frameRate: 10,
            });

        this.anims.create({
            key: "red lick",
            frames: this.anims.generateFrameNumbers("red lick", { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
            frameRate: 10,
            });

        this.anims.create({
            key: "eyeball",
            frames: this.anims.generateFrameNumbers("eyeball", { frames: [0] }),
            repeat: -1,
        });

        this.anims.create({
            key: "eyeball hurt",
            frames: this.anims.generateFrameNumbers("eyeball hurt", { frames: [0] }),
            frameRate: 1
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
            this,                                   // scene
            config.width/2 + config.width/6 + 30,   // x
            borderUISize*4,                         // y
            "pink mouth",                           // sprite
            0,                                      // frame
            2,                                      // point value
            "sine",                                 // ai
            ["nom", "yummy", "mmm", "tasty"]        // sounds
            ).setOrigin(0,0);
        
        this.mouth1.play(this.mouth1.texture);
        
        this.mouth2 = new Mouth(
            this, 
            0, 
            borderUISize*6 + 2, 
            "red mouth",
            0, 
            1,
            "back and forth",
            ["nom", "yummy", "mmm", "tasty"]
            ).setOrigin(0,0);
        
        this.mouth2.play(this.mouth2.texture);

        // this is the eyeball. it's technically a mouth worth negative points
        this.mouth3 = new Mouth(
            this, 
            config.width/2 - config.width/6 + 30,
            borderUISize*8 + 4, 
            "eyeball",
            0, 
            -1,
            "back and forth",
            ["ow", "ouch"]
            ).setOrigin(0,0); 

        this.nuggets = ["nugget1", "nugget2", "nugget3", "nugget4", "nugget5"];
        
        // this sprite is off screen when the nugget isn't being launched and visually looks like the next nugget in the array
        // the point of it is to make it look smooth when the next nugget comes on screen
        // it was really hard to make this but i am so happy with how it turned out!
        this.nextNugget = this.add.sprite(
            game.config.width/2,
            game.config.height - borderUISize*3,
            "nugget2"
            ).setOrigin(.5, 0);

        this.p1Nugget = new Nugget(
            this,                                       // scene
            game.config.width/2,                        // x
            game.config.height - borderUISize*2 - 6,    // y
            "nugget1",                                  // sprite
            this.nuggets,                               // this is the array of nuggets
            this.nextNugget                             // this is so i can do stuff with nextNugget inside of p1Nugget
            ).setOrigin(.5, 0);

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
	    this.add.rectangle(
            game.config.width - borderUISize, 
            0, 
            borderUISize, 
            game.config.height, 
            0xFFFFFF
            ).setOrigin(0 ,0);
        
        // these are supposed to be derek's eyes. they blink sometimes but they don't do anything else
        // i was considering adding animations of them looking down, but this is enough LMAO
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
        
        

        // defining keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        // this is the score
        this.p1Score = 0;
        
        // making the eyes on top blink
        this.blinkTimer = 0;                                        // counting up
        this.nextBlink = Math.floor(Math.random()*500) + 1000;      // blinkTimer == nextBlink, they blink and i reset blinkTimer
        
        //display score
        let scoreConfig = {
            fontFamily: "Verdana",
            fontSize: "24px",
            color: "#000",
            backgroundColor: "#fff",
            align: "center",
            padding: 5,
            fixedWidth: 50,
            borderRadius: 32
        }
        this.scoreLeft = this.add.text(
            config.width/2 - scoreConfig.fixedWidth/2,
            borderUISize + borderPadding*2,
            this.p1Score,
            scoreConfig);

        // game over flag
        this.gameOver = false;
        this.gameOverText = '"i\'m still hungry... :/"';   // different text depending on how well you did

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2 - 48 - borderUISize/8, 'game over', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 48 + 14 + borderUISize/8, '"f" to restart\n⬅ or ➡ for menu', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2, this.gameOverText, scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart();
        }
        
        this.animateTiles();

        this.mouth1.update();
        this.mouth2.update();
        this.mouth3.update();
        
        // when the game ends, show different text
        if (nuggetsEaten >= 5) {
            this.gameOverText = '"i\'m still hungry... :/"';
        }
        if (nuggetsEaten >= 10) {
            this.gameOverText = '"that was an alright meal :x"';
        }
        if (nuggetsEaten >= 15) {
            this.gameOverText = '"i\'d say i\'m satisfied! :-)"';
        }
        if (nuggetsEaten >= 20) {
            this.gameOverText = '"i am so full! thank you! ^_^"';
        }
        if (eyeHits >= 5) {
            this.gameOverText = '"you really beat up my eye :\'("';
        }

        // so you can't do anything when the game is over
        if (this.gameOver == false) {
            this.p1Nugget.update();    
        }

        // to go to the title screen
        if (this.gameOver) {
            if (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
                this.scene.start("menuScene");
            }
        }
        
        // collision checks for each of the "mouths"
        // note that i change the variables for the different endings here
        if (this.checkCollision(this.p1Nugget, this.mouth1)) {
            this.p1Nugget.reset();
            this.eatNugget(this.mouth1, "pink lick");
            nuggetsEaten++;
        }
        if (this.checkCollision(this.p1Nugget, this.mouth2)) {
            this.p1Nugget.reset();
            this.eatNugget(this.mouth2, "red lick");
            nuggetsEaten++
        }
        if (this.checkCollision(this.p1Nugget, this.mouth3)) {
            this.p1Nugget.reset();
            this.eatNugget(this.mouth3, "eyeball hurt");
            eyeHits++;
        }

        // this is all so i can make the eyes blink on a semi-random basis.
        this.blinkTimer ++;
        if (this.blinkTimer == this.nextBlink) {
            this.blinkTimer = 0;
            this.nextBlink = Math.floor(Math.random()*500) + 1000;  // between ten and fifteen seconds
            this.leftEye.play(this.leftEye.texture);
            this.rightEye.play(this.rightEye.texture);
        }

        // this is so that the nextNugget sprite is the texture of the next nugget
        if (this.p1Nugget.currentNugget == 4) { 
            this.nextNugget.setTexture(this.nuggets[0]);
        } else {
            this.nextNugget.setTexture(this.nuggets[this.p1Nugget.currentNugget+1]);
        }

    }

    // i changed this code a little from what we made in class so it checks against the entire top half of the nugget/mouth
    checkCollision(nugget, mouth) {
        // simple AABB checking
        if (nugget.x < mouth.x + mouth.width && 
            nugget.x + nugget.width > mouth.x && 
            mouth.y + mouth.height/2 <= nugget.y + nugget.height/2 &&
            mouth.y + mouth.height/2 >= nugget.y) {
                return true;
        } else {
            return false;
        }
    }
    
    // this is the animation for when the mouths are eating the nuggets. 
    eatNugget(mouth, key) {
        if (mouth.isEating == false) {
            let tex = mouth.texture;
            mouth.texture = key;
            mouth.play(key);
            mouth.isEating = true;
            mouth.on("animationcomplete", () => {
                mouth.texture = tex;
                mouth.play(tex);
                mouth.isEating = false;
            });
        }
        this.p1Score += mouth.points;
        if (this.p1Score < 0) {
            this.p1Score = 0;
        }
        this.scoreLeft.text = this.p1Score;
        this.sound.play(mouth.sounds[Math.floor(Math.random()*mouth.sounds.length)]);
    }

    // this counts as parallax, right? it's two images for the background scrolling at different speeds
    // "grid" is transparent and going in the opposite direction as "checkers,"  
    // which is what creates the look of the yellow flashing like that. big inspiration from earthbound
    // actually derek's design is sort of inspired by the department store mook from earthbound
    animateTiles() {
        this.checkers.tilePositionX -= .5;
        this.checkers.tilePositionY -= .5;
        this.grid.tilePositionX += .25;
        this.grid.tilePositionY += .25;
    }
}