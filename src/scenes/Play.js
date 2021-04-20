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
        // load explosion sprite sheet
        this.load.spritesheet("pink mouth", "./assets/pink_mouth.png", {frameWidth:120, frameHeight:64, startFrame:0, endFrame: 6});
        this.load.spritesheet("red mouth", "./assets/red_mouth.png", {frameWidth:120, frameHeight:64, startFrame:0, endFrame: 6});
        this.load.spritesheet("pink lick", "./assets/pink_lick.png", {frameWidth:120, frameHeight:64, startFrame:0, endFrame: 7});
        this.load.spritesheet("red lick", "./assets/red_lick.png", {frameWidth:120, frameHeight:64, startFrame:0, endFrame: 7});
        this.load.spritesheet("eyeball", "./assets/eyeball.png", {frameWidth: 32, frameHeight: 32, startFrame:0, endFrame: 0});
        this.load.spritesheet("eyeball hurt", "./assets/eyeball_hurt.png", {frameWidth: 32, frameHeight:32, startFrame:0, endFrame: 0});
        this.load.spritesheet("eye", "./assets/eye_blink.png", {frameWidth: 120, frameHeight: 64, startFrame:0, endFrame:5} );
        this.load.spritesheet("all nuggets", "./assets/nugget.png", {frameWidth: 32, frameHeight: 34, startFrame: 0, endFrame: 4});
    }

    create() {
        // nuggets
        this.nuggetLog = this.anims.create({
            key: "all nuggets",
            frames: this.anims.generateFrameNumbers("all nuggets", { frames: [0, 1, 2, 3, 4] }),
            frameRate: 10,
        });

        console.log(this.nuggetLog);

        // mouth animation
        this.mouthLog = this.anims.create({
            key: "pink mouth",
            frames: this.anims.generateFrameNumbers("pink mouth", { frames: [0, 1, 2, 3, 4, 5] }),
            frameRate: 10,
            repeat: -1,
            yoyo: true,
        });

        console.log(this.mouthLog);

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
            this, 
            config.width/2 + config.width/6 + 30, 
            borderUISize*4, 
            "pink mouth",
            0, 
            2,
            "sine",
            ["nom", "yummy", "mmm", "tasty"]
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
        
        this.nextNugget = this.add.sprite(
            game.config.width/2,
            game.config.height - borderUISize*3,
            "nugget2"
            ).setOrigin(.5, 0);

        this.p1Nugget = new Nugget(
            this, 
            game.config.width/2, 
            game.config.height - borderUISize*2 - 6, 
            "all nuggets",
            this.nuggets,
            this.nextNugget
            ).setOrigin(.5, 0);

        console.log(this.p1Nugget);

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
        
        this.p1Score = 0;
        
        // making the eyes on top blink
        this.blinkTimer = 0;
        this.nextBlink = Math.floor(Math.random()*500) + 1000;
        
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
        this.gameOverText = "i'm still hungry... :/";

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

        if (nuggetsEaten >= 5) {
            this.gameOverText = "i'm still hungry... :/";
        }
        if (nuggetsEaten >= 10) {
            this.gameOverText = "that was an alright meal :x";
        }
        if (nuggetsEaten >= 15) {
            this.gameOverText = "i'd say i'm satisfied! :-)";
        }
        if (nuggetsEaten >= 20) {
            this.gameOverText = "i am so full! thank you! ^_^";
        }
        if (eyeHits >= 5) {
            this.gameOverText = "you really beat up my eye :'(";
        }

        if (this.gameOver == false) {
            this.p1Nugget.update();    
        }

        if (this.gameOver) {
            if (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
                this.scene.start("menuScene");
            }
        }
        
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
        this.blinkTimer ++;
        if (this.blinkTimer == this.nextBlink) {
            this.blinkTimer = 0;
            this.nextBlink = Math.floor(Math.random()*500) + 1000;
            this.leftEye.play(this.leftEye.texture);
            this.rightEye.play(this.rightEye.texture);
        }

        if (this.p1Nugget.currentNugget == 5) {
            console.log("2");
            this.nextNugget.setTexture(this.nuggets[0]);
        } else {
            console.log("3");
            this.nextNugget.setTexture(this.nuggets[this.p1Nugget.currentNugget+1]);
        }

    }

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
    
    eatNugget(mouth, key) {
        let tex = mouth.texture;
        mouth.texture = key;
        mouth.play(key);
        mouth.isEating = true;
        mouth.on("animationcomplete", () => {
            mouth.texture = tex;
            mouth.play(tex);
            mouth.isEating = false;
        })
        
        this.p1Score += mouth.points;
        if (this.p1Score < 0) {
            this.p1Score = 0;
        }
        this.scoreLeft.text = this.p1Score;
        this.sound.play(mouth.sounds[Math.floor(Math.random()*mouth.sounds.length)]);
    }
    animateTiles() {
        this.checkers.tilePositionX -= .5;
        this.checkers.tilePositionY -= .5;
        this.grid.tilePositionX += .25;
        this.grid.tilePositionY += .25;
    }
}