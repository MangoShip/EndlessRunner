class Tutorial extends Phaser.Scene{
    constructor(){
        super("tutorialScene");
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
        
        // display menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 100;
        
        this.add.text(85,50, "Before You Enter the Battle...").setScale(1.5);
        this.add.text(30,120, "1: Move Up & Down: Up & Down Arrow Keys").setScale(1.5);
        this.add.text(30,170, "2: Dodge Obstacles & Shoot Enemies").setScale(1.5);
        this.add.text(30,220, "3: Pick Up Power Ups for Upgrades").setScale(1.5);
        this.add.text(30,270, "4: Survive!").setScale(1.5);
        this.add.text(85,350, "Press 1 To Go Back To Main Menu").setScale(1.5);

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