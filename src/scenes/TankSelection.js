class TankSelection extends Phaser.Scene{
    constructor(){
        super("tankSelectionScene");
    }

    preload(){
        // load images/tile sprite
        this.load.image('T34', './assets/T34.png');
        this.load.image('SU85', './assets/SU85.png');
        this.load.image('kv2', './assets/kv2.png');
    }

    create(){
        //add tank selection menu image
        this.add.image(500, 100, 'T34').setOrigin(7,0);
        this.add.image(600, 100, 'SU85').setOrigin(5,0);
        this.add.image(650, 100, 'kv2').setOrigin(3,0);
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
        this.add.text(centerX, centerY - textSpacer, '1: T-34', menuConfig).setOrigin(2.25,0);
        this.add.text(centerX, centerY - textSpacer/3, '2: SU-85', menuConfig).setOrigin(0.5,1.85);
        this.add.text(centerX, centerY + textSpacer/3, '3: KV-2', menuConfig).setOrigin(-1, 3.7);
        this.add.text(centerX, centerY + textSpacer, '4: Go Back to Main Menu', menuConfig).setOrigin(0.5, 0);
        
        //T-34 Attributes
        this.add.text(centerX, centerY - textSpacer, 'Armor: 1', menuConfig).setOrigin(2,-1.25);
        this.add.text(centerX, centerY - textSpacer, 'Damage: 2', menuConfig).setOrigin(1.85,-2.5);
        this.add.text(centerX, centerY - textSpacer, 'Speed: 3', menuConfig).setOrigin(2,-3.7);
        
        //SU-85 Attributes
        this.add.text(centerX, centerY - textSpacer/3, 'Armor: 2', menuConfig).setOrigin(0.5,0.75);
        this.add.text(centerX, centerY - textSpacer/3, 'Damage: 3', menuConfig).setOrigin(0.5,-0.4);
        this.add.text(centerX, centerY - textSpacer/3, 'Speed: 1', menuConfig).setOrigin(0.5,-1.5);
        
        //KV-2 Attributes
        this.add.text(centerX, centerY - textSpacer/3, 'Armor: 3', menuConfig).setOrigin(-0.85,0.75);
        this.add.text(centerX, centerY - textSpacer/3, 'Damage: 1', menuConfig).setOrigin(-0.7,-0.3);
        this.add.text(centerX, centerY - textSpacer/3, 'Speed: 2', menuConfig).setOrigin(-0.8,-1.5);

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