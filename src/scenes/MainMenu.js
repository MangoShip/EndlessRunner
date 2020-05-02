class MainMenu extends Phaser.Scene{
    constructor(){
        super("mainMenuScene");
    }

    preload(){
        this.load.image('background', './assets/background.png');
    }
    

    create(){
        
        // place tile sprite
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        
        // menu display
        let menuConfig = {
            fontFamily: 'BIZ UDMincho Medium',
            fontSize: '28px',
            color: "#FFFFFF",
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
        
        this.add.text(centerX, centerY - textSpacer, 'ENDLESS RUNNER', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - textSpacer/3, '1: Tank Selection', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer/3, '2: Tutorial', menuConfig).setOrigin(0.5);
        
        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        keyTHREE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyONE)){
            // tank selection
            this.scene.start("tankSelectionScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyTWO)){
            // tutorial
            this.scene.start("tutorialScene");
        }
    }
}