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
        
        this.add.text(centerX, centerY - textSpacer, 'Move Up & Down: Up & Down Arrow Keys', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - textSpacer/3, 'Dodge Obstacles & Shoot Enemies', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer/3, 'Pick Up PowerUps for Upgrades', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, 'Survive! Press 1 to Go Back', menuConfig).setOrigin(0.5);
        
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