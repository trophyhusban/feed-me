class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }
    preload() {
        this.load.image("tile", "./assets/tile.png");
        this.load.image("white tile", "./assets/white_tile.png");
        this.load.spritesheet("pink mouth", "./assets/pink_mouth.png", {frameWidth:120, frameHeight:64, startFrame:0, endFrame: 6});
        this.load.spritesheet("red mouth", "./assets/red_mouth.png", {frameWidth:120, frameHeight:64, startFrame:0, endFrame: 6});
        this.load.spritesheet("eyeball", "./assets/eyeball.png", {frameWidth: 32, frameHeight: 32, startFrame:0, endFrame: 0});
        this.load.spritesheet("eye", "./assets/eye_blink.png", {frameWidth: 120, frameHeight: 64, startFrame:0, endFrame:5} );
        this.load.image("tutorial text", "./assets/tutorial_text.png");
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

        this.textbox = this.add.sprite(borderUISize*1.5, config.height-128-borderUISize*1.5, "tutorial text").setOrigin(0, 0);
        
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
        this.animateTiles();

        this.mouth1.update();
        this.mouth2.update();
        this.mouth3.update();

        this.blinkTimer ++;
        if (this.blinkTimer == this.nextBlink) {
            this.blinkTimer = 0;
            this.nextBlink = Math.floor(Math.random()*500) + 1000;
            this.leftEye.play(this.leftEye.texture);
            this.rightEye.play(this.rightEye.texture);
        }
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.start("menuScene");
        }
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
    updateTriangle(points) {
        let maxWidth = 128 + 32;
        let currentWidth = 0;
        let bottomWidth = 48;
        let x1, y1, x2, y2, x3, y3;
        if (points.length == 0) {
            x1 = this.mouth2.x + this.mouth2.width/2;
            y1 = this.mouth2.y + this.mouth2.height/2;
            x2 = this.textbox.x + currentWidth;
            y2 = this.textbox.y+1;
            x3 = this.textbox.x + bottomWidth;
            y3 = this.textbox.y+1;
        } else {
            x1 = this.mouth2.x + this.mouth2.width/2;
            y1 = points[1];
            x2 = points[2];
            y2 = points[3];
            x3 = points[4];
            y3 = points[5];
        }

        x2 = x1 - bottomWidth/2;
        x3 = x1 + bottomWidth/2;

        if (x2 < this.textbox.x + maxWidth) {
            x2 = this.textbox.x + maxWidth;
        }

        if (x2 > this.textbox.x + this.textbox.width - maxWidth - bottomWidth) {
            x2 = this.textbox.x + this.textbox.width - maxWidth - bottomWidth;
        }

        x3 = x2 + bottomWidth;

        this.textTriangle = [x1, y1, x2, y2, x3, y3];

    }
}