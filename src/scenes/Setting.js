class Setting extends Phaser.Scene{
    constructor(){
        super("settingScene");
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
        
        this.add.text(centerX, centerY - textSpacer, 'SETTINGS', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - textSpacer/3, '1: GO BACK TO MAIN MENU', menuConfig).setOrigin(0.5);
        
        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyONE)){
            // go back to main menu
            if(this.scene.start("mainMenuScene")
        }
}