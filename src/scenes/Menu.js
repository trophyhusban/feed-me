class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio
        this.load.audio("blip", "./assets/blip.wav");
        this.load.audio("throw nugget", "./assets/throw_nugget.wav");
        this.load.audio("nom", "./assets/nom.mp3");
        this.load.audio("yummy", "./assets/yummy.mp3");
        this.load.audio("mmm", "./assets/mmmm.mp3");
        this.load.audio("tasty", "./assets/tasty.mp3");
        this.load.audio("ouch", "./assets/ouch.mp3");
        this.load.audio("ow", "./assets/ow.mp3");
        this.load.image("tile", "./assets/tile.png");
        this.load.image("white tile", "./assets/white_tile.png");
        this.load.image("menu", "./assets/menu.png");
    }

    create() {
        // checkers. i explain these more at the bottom of Play.js
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

        // the UI for the menu is just an image i make in illustrator LMAO 
        // it is so much easier to make UI's in illustrator than with code lol
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

        // key bindings
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update() {
        // choosing difficulty
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // novice mode
            game.settings = {
                mouthSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play("blip");
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // novice mode
            game.settings = {
                mouthSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play("blip");
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.start("tutorialScene");
        }
        // the same as in Play.js and Tutorial.js
        // maybe i could have the tiles and this function global, but this was easier cuz i only have three scenes
        this.animateTiles();
    }
    animateTiles() {
        this.checkers.tilePositionX -= .5;
        this.checkers.tilePositionY -= .5;
        this.grid.tilePositionX += .25;
        this.grid.tilePositionY += .25;
    }
}