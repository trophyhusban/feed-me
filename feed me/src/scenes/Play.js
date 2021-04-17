class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images so they can be used
        this.load.image("nugget", "./assets/nugget.png");
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
    }

    create() {

        // mouth animation
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
            ["yum", "mmm"]
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

        this.p1Fry = new Fry(
            this, 
            game.config.width/2, 
            game.config.height - borderUISize*3, 
            "nugget"
            ).setOrigin(.5, 0);

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
            fontFamily: "Courier",
            fontSize: "28px",
            color: "#000",
            backgroundColor: "#fff",
            align: "center",
            padding: 5
        }
        this.scoreLeft = this.add.text(
            config.width/2,
            borderUISize + borderPadding*2,
            this.p1Score,
            scoreConfig);

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'F to restart or ⬅ for menu', scoreConfig).setOrigin(0.5);
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

        if (this.gameOver == false) {
            this.p1Fry.update();    
        }

        if (this.gameOver &&Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
        if (this.checkCollision(this.p1Fry, this.mouth1)) {
            this.p1Fry.reset();
            this.eatNugget(this.mouth1, "pink lick");
        }
        if (this.checkCollision(this.p1Fry, this.mouth2)) {
            this.p1Fry.reset();
            this.eatNugget(this.mouth2, "red lick");
        }
        if (this.checkCollision(this.p1Fry, this.mouth3)) {
            this.p1Fry.reset();
            this.eatNugget(this.mouth3, "eyeball hurt");
        }
        this.blinkTimer ++;
        if (this.blinkTimer == this.nextBlink) {
            this.blinkTimer = 0;
            this.nextBlink = Math.floor(Math.random()*500) + 1000;
            this.leftEye.play(this.leftEye.texture);
            this.rightEye.play(this.rightEye.texture);
        }
    }

    checkCollision(fry, mouth) {
        // simple AABB checking
        if (fry.x < mouth.x + mouth.width && 
            fry.x + fry.width > mouth.x && 
            mouth.y + mouth.height/2 <= fry.y + fry.height/2 &&
            mouth.y + mouth.height/2 >= fry.y) {
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

        let randSound = Math.floor(Math.random()*2);
        
        this.p1Score += mouth.points;
        if (this.p1Score < 0) {
            this.p1Score = 0;
        }
        this.scoreLeft.text = this.p1Score;
        if (mouth.sounds.length > 0) {
            this.sound.play(mouth.sounds[randSound]);
        }
    }
    animateTiles() {
        this.checkers.tilePositionX -= .5;
        this.checkers.tilePositionY -= .5;
        this.grid.tilePositionX += .25;
        this.grid.tilePositionY += .25;
    }
}