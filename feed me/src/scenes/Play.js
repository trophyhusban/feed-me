class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images so they can be used
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("tile", "./assets/tile.png");
        // load explosion sprite sheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet("pink mouth", "./assets/pink_mouth.png", {frameWidth:60, frameHeight:32, startFrame:0, endFrame: 5});
        this.load.spritesheet("red mouth", "./assets/red_mouth.png", {frameWidth:60, frameHeight:32, startFrame:0, endFrame: 5});
    }

    create() {

        // mouth animation
        this.anims.create({
            key: "pink mouth",
            frames: this.anims.generateFrameNumbers("pink mouth", { frames: [0, 1, 2, 3, 4] }),
            frameRate: 10,
            repeat: -1,
            yoyo: true,
        })
        this.anims.create({
            key: "red mouth",
            frames: this.anims.generateFrameNumbers("red mouth", { frames: [0, 1, 2, 3, 4] }),
            frameRate: 10,
            repeat: -1,
            yoyo: true,
        })

        // checkers
        this.background = this.add.tileSprite(
            0, 
            0, 
            640, 
            480, 
            "tile"
            ).setOrigin(0,0);

        // green UI background
        this.add.rectangle(
            0, 
            borderUISize + borderPadding, 
            game.config.width,
            borderUISize * 2,
            0x00FF00
            ).setOrigin(0,0);

        this.p1Rocket = new Rocket(
            this, 
            game.config.width/2, 
            game.config.height - borderUISize*2, 
            "rocket"
            ).setOrigin(.5, 0);

        this.mouth1 = new Mouth(
            this, 
            config.width/2 + config.width/6 + 30, 
            borderUISize*4, 
            "pink mouth",
            0, 
            30,
            "back and forth"
            ).setOrigin(0,0);
        
        this.mouth1.play(this.mouth1.texture);
        
        this.mouth2 = new Mouth(
            this, 
            config.width/2 + 30, 
            borderUISize*5, 
            "red mouth",
            0, 
            20,
            "sin"
            ).setOrigin(0,0);
        
        this.mouth2.play(this.mouth2.texture);

        this.mouth3 = new Mouth(
            this, 
            config.width/2 - config.width/6 + 30,
            borderUISize*6, 
            "red mouth",
            0, 
            10,
            "back and forth"
            ).setOrigin(0,0); 

        this.mouth3.play(this.mouth3.texture);

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 9, first: 0}),
            frameRate: 30
        })

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

        


        // defining keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        this.p1Score = 0;
        
        //display score
        let scoreConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: '#F3B141',
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(
            borderUISize + borderPadding,
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
        if (this.gameOver == false) {
            this.background.tilePositionX -= 1;
            this.background.tilePositionY -= 1;
            this.p1Rocket.update();
            this.mouth1.update();
            this.mouth2.update();
            this.mouth3.update();
        }

        if (this.gameOver &&Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
        if (this.checkCollision(this.p1Rocket, this.mouth1)) {
            this.p1Rocket.reset();
            this.shipExplode(this.mouth1);
        }
        if (this.checkCollision(this.p1Rocket, this.mouth2)) {
            this.p1Rocket.reset();
            this.shipExplode(this.mouth2);
        }
        if (this.checkCollision(this.p1Rocket, this.mouth3)) {
            this.p1Rocket.reset();
            this.shipExplode(this.mouth3);
        }
    }

    checkCollision(rocket, mouth) {
        // simple AABB checking
        if (rocket.x < mouth.x + mouth.width && 
            rocket.x + rocket.width > mouth.x && 
            rocket.y < mouth.y + mouth.height &&
            rocket.height + rocket.y > mouth.y) {
                return true;
        } else {
            return false;
        }
    }
    
    shipExplode(ship) {
        //hide the ship
        ship.alpha = 0;
        
        //create explosion sprite
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0,0);
        boom.anims.play("explode");
        boom.on("animationcomplete", () =>{
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        })
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play("sfx_explosion");
    }
}