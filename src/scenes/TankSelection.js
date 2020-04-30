class TankSelection extends Phaser.Scene{
    constructor(){
        super("tankSelectionScene");
    }

    preload(){
        // load images/tile sprite
        this.load.image('T34', './assets/T34.png');
        this.load.image('SU85', './assets/SU85.png');
        this.load.image('kv2', './assets/kv2.png')
    }

    create(){
        //add tank selection menu image
        this.add.image(600, 300, 'T34').setOrigin(7,0);
        this.add.image(600, 300, 'SU85').setOrigin(5,0);
        this.add.image(600, 300, 'kv2').setOrigin(3,0);
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
        
        //added tank sprites for selection
        this.add.text(centerX, centerY - textSpacer, '1: T-34', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - textSpacer/3, '2: SU-85', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer/3, '3: KV-2', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, '4: Go Back to Main Menu', menuConfig).setOrigin(0.5, 0);
        
        
        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyONE)){
            // play
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyTWO)){
            // go back to main menu
            this.scene.start("mainMenuScene");
        }
    }
}