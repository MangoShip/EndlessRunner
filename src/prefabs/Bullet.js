class Bullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'player_bullet');

        this.scene = scene;
    }

    fire(x, y){
        if(game.settings.tank == 1 || game.settings.tank == 2){
            this.body.reset(x + 125, y + 22);
        }
        else{
            this.body.reset(x + 95, y + 14);
        }
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(300);
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);

        if(this.x >= 640){
            this.x = 900;
            this.setActive(false);
            this.setVisible(false);
        }
    }

}

