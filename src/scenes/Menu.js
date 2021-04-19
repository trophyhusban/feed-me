
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio
        this.load.audio("sfx_select", "./assets/blip_select12.wav");
        this.load.audio("sfx_rocket", "./assets/rocket_shot.wav");
        this.load.audio("yum", "./assets/yum.mp3");
        this.load.audio("nom", "./assets/nom.mp3");
        this.load.audio("mmm", "./assets/mmm.mp3");
        this.load.audio("yummy", "./assets/yummy.mp3");
        this.load.image("tile", "./assets/tile.png");
        this.load.image("white tile", "./assets/white_tile.png");
        this.load.image("menu", "./assets/menu.png");
    }

    create() {
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

        this.add.image(0, 0, "menu").setOrigin(0,0);

        // white bars UI
        this.add.rectangle(
            0, 
            0, 
            game.config.width, 
            borderUISize, 
            borderColor
            ).setOrigin(0 ,0);
	    this.add.rectangle(
            0, 
            game.config.height - borderUISize, 
            game.config.width, 
            borderUISize, 
            borderColor
            ).setOrigin(0 ,0);
	    this.add.rectangle(
            0, 
            0, 
            borderUISize, 
            game.config.height, 
            borderColor
            ).setOrigin(0 ,0);
	    this.add.rectangle(
            game.config.width - borderUISize, 
            0, 
            borderUISize, 
            game.config.height, 
            borderColor
            ).setOrigin(0 ,0);
        
        game.settings = {
            mouthSpeed: 3,
            gameTimer: 60000
        }

        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: '#F3B141',
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }

        //show menu text
        //this.add.text(config.width/2, config.height/2 - borderUISize - borderPadding, "ROCKET PATROL", menuConfig).setOrigin(.5);
        //this.add.text(config.width/2, config.height/2, 'use ⬅ and ➡ to move and "F" to fire', menuConfig).setOrigin(.5);
        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#000000";
        //this.add.text(config.width/2, config.height/2 + borderUISize + borderPadding, "press ⬅ for novice or ➡ for expert", menuConfig).setOrigin(.5);
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // novice mode
            game.settings = {
                mouthSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // novice mode
            game.settings = {
                mouthSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.start("tutorialScene");
        }
        this.animateTiles();
    }
    animateTiles() {
        this.checkers.tilePositionX -= .5;
        this.checkers.tilePositionY -= .5;
        this.grid.tilePositionX += .25;
        this.grid.tilePositionY += .25;
    }
}