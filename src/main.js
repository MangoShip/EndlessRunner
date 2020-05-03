/*
    Game Title:
    Group Name: Tekkaden
    Group Members: Mingun Cho, Joonsu Jun, Sean Kang
    Date Completed: 5/3/2020
    Creative Tile Justification: 
        In our game, we have three tanks that players can choose to play with.
        These tanks have different damage, health, and movement speed. Each tank 
        will provide a unique gameplay to the players, so players can choose
        the tank that match with their preferences. The players' ability to
        shoot to eliminate enemies is another technically interesting game
        mechanic. Instead of dodging all the obstacles/enemies, players can 
        now choose to shoot them to survive longer. Throughout the gameplay,
        there will be three unique power-ups that will help the player by
        temporarily giving small boost. 

        The game also focuses on visual and audio effects. All the sprites (except
        obstacles) have animation to give a more realistic sense of their 
        movement. When players receive damage, the tank(player) will quickly blink
        to give a feedback to the players that they got hit. There are also explosion
        animation when sprite gets destroyed. When players collect the power-ups, 
        they will also see animation according to the power-ups that they have collected.
        There are also a wide variety of audio effects that players will hear during their 
        gameplay.
*/
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false, // allows to see the hitbox of sprites
            gravity: { y: 0}
        }
    },
    scene:  [ MainMenu, Play, TankSelection, Tutorial ],
};

let game = new Phaser.Game(config);

// define game settings
game.setting = {
    tank: 0,   // tank type
    health: 0, // player armor
    damage: 0, // player damage
    speed: 0 // player speed
}

// reserve some keyboard variables
let keyONE, keyTWO, keyTHREE, keyFOUR;
let keyUP, keyDOWN, keyF;

