
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio
        this.load.audio("sfx_select", "./assets/blip_select12.wav");
        this.load.audio("sfx_explosion", "./assets/explosion38.wav");
        this.load.audio("sfx_rocket", "./assets/rocket_shot.wav");
        this.load.audio("yum", "./assets/yum.mp3");
        this.load.audio("thank you", "./assets/thank you.mp3");
        this.load.audio("tasty", "./assets/tasty.mp3");
        this.load.audio("nom", "./assets/nom.mp3");
        this.load.audio("mmm", "./assets/mmm.mp3");
        this.load.audio("yummy", "./assets/yummy.mp3");
    }

    create() {
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
        this.add.text(config.width/2, config.height/2 - borderUISize - borderPadding, "ROCKET PATROL", menuConfig).setOrigin(.5);
        this.add.text(config.width/2, config.height/2, 'use ⬅ and ➡ to move and "F" to fire', menuConfig).setOrigin(.5);
        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#000000";
        this.add.text(config.width/2, config.height/2 + borderUISize + borderPadding, "press ⬅ for novice or ➡ for expert", menuConfig).setOrigin(.5);
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
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
    }
}