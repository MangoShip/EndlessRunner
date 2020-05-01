let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0}
        }
    },
    scene:  [ MainMenu, Play, Setting, TankSelection, Tutorial ],
};

let game = new Phaser.Game(config);

// define game settings
game.setting = {
    tank: 0,   // tank type
    armor: 0, // player armor
    damage: 0, // player damage
    speed: 0 // player speed
}

// reserve some keyboard variables
let keyONE, keyTWO, keyTHREE, keyFOUR;
let keyUP, keyDOWN, keyF;