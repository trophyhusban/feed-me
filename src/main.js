// 👁️👄👁️, by ardent eliot :-) reinhard
// 4/19/21
// i spent a lot of time on this! i don't know how much. estimated > 20 hours
//
// modifications:
// redesign the game's artwork, ui, and sound to change its theme/aesthetic         60
// randomize each spaceship's movement direction at the start of each play          5
// create four new explosion sfx and randomize whihc one plays on impact            10
// create a new title screen (eg., new artwork, typography, layout)                 10
// implement parallax scrolling                                                     10
// create a new spaceship type (w/ new artwork)                                     20
// total                                                                            115
// i think some of my things may not count, depending on exactly how you are 
// grading them, so i have 15 extra points in case of that.

let config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    scene: [ Menu, Play, Tutorial ],
    zoom: 1
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height /15;   
let borderPadding = borderUISize /3;
let keyF, keyR, keyLEFT, keyRIGHT;
let borderColor = 0xFFFFFF;

let nuggetsEaten = 0;                           // giving a different game over message depending on the number of times
let eyeHits = 0;                                // players hit the eye or the mouths