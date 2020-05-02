class Tutorial extends Phaser.Scene{
    constructor(){
        super("tutorialScene");
    }

    preload(){
        this.load.image('HP', './assets/HP_Powerup.png');
        this.load.image('AS', './assets/AS_Powerup.png');
        this.load.image('AD', './assets/AD_Powerup.png');
    }

    create(){
        // menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: "#843605",
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWith: 0
        }
        
        this.add.text(85,50, "Before You Enter the Battle...").setScale(1.5);
        this.add.text(30,120, "1: Move Up & Down: Up & Down Arrow Keys").setScale(1.5);
        this.add.text(30,170, "2: Dodge or Shoot Obstacles and Enemies").setScale(1.5);
        this.add.text(30,220, "3: Pick Up Power Ups for Upgrades").setScale(1.5);
        this.add.text(30,270, "4: Power-Ups:").setScale(1.5);
        
        this.add.image(game.config.width/6,335, 'HP').setScale(2);
        this.add.text(43,360, "Health Boost").setScale(1.2).setColor('pink');
        this.add.image(game.config.width/2,335, 'AS').setScale(2);
        this.add.text(252,360, "Attack Speed").setScale(1.2).setColor('lightgreen');
        this.add.image(game.config.width*(5/6),335, 'AD').setScale(2);
        this.add.text(458,360, "Attack Damage").setScale(1.2).setColor('lightblue');

        this.add.text(85,410, "Press 1 To Go Back To Main Menu").setScale(1.5);


        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyONE)){
            // go back to main menu
            this.scene.start("mainMenuScene");
        }
    }
}