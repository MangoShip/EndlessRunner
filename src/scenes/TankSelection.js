class TankSelection extends Phaser.Scene{
    constructor(){
        super("tankSelectionScene");
    }

    preload(){
        // load spritesheets
        this.load.spritesheet('player1', './assets/T34.png', {frameWidth: 60, frameHeight: 30, startFrame: 0, endFrame: 2});
        this.load.spritesheet('player2', './assets/SU85.png', {frameWidth: 60, frameHeight: 30, startFrame: 0, endFrame: 2});
        this.load.spritesheet('player3', './assets/KV2.png', {frameWidth: 60, frameHeight: 30, startFrame: 0, endFrame: 2});
    }

    create(){
        // create animation for T34
        this.anims.create({
            key: 't34_moving',
            frames: this.anims.generateFrameNumbers('player1', {start: 0, end: 3, first: 0}),
            frameRate: 6,
            repeat: -1
        })

        // create animation for SU85
        this.anims.create({
            key: 'su85_moving',
            frames: this.anims.generateFrameNumbers('player2', {start: 0, end: 3, first: 0}),
            frameRate: 6,
            repeat: -1
        })

        // create animation for KV2
        this.anims.create({
            key: 'kv2_moving',
            frames: this.anims.generateFrameNumbers('player3', {start: 0, end: 3, first: 0}),
            frameRate: 6,
            repeat: -1
        })

        //add tank selection menu image
        this.tank1 = this.add.sprite(70, 70, 'player1').setOrigin(0,0).setScale(2);
        this.tank1.anims.play('t34_moving');

        this.tank2 = this.add.sprite(270, 70, 'player2').setOrigin(0,0).setScale(2);
        this.tank2.anims.play('su85_moving');

        this.tank3 = this.add.sprite(450, 70, 'player3').setOrigin(0,0).setScale(2);
        this.tank3.anims.play('kv2_moving');
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
        keyTHREE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        keyFOUR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyONE)){
            // play with T-34
            this.scene.start("playScene");
            game.settings = {
                tank: 1,
                armor: 1,
                damage: 2,
                speed: 3
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keyTWO)){
            // play with SU-85
            this.scene.start("playScene");
            game.settings = {
                tank: 2,
                armor: 2,
                damage: 3,
                speed: 1
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keyTHREE)){
            // play with KV-2
            this.scene.start("playScene");
            game.settings = {
                tank: 3,
                armor: 3,
                damage: 1,
                speed: 2
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keyFOUR)){
            // go back to main menu
            this.scene.start("mainMenuScene");
        }
    }
}

