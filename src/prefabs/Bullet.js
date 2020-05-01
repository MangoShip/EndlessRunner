class Bullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'player_bullet');
    }

    fire(x, y){
        //console.log("fire");

        this.setDebugBodyColor(0xFF0000);
        this.body.onCollide = true;

        if(game.settings.tank == 1 || game.settings.tank == 2){
            this.body.reset(x + 95, y + 16);
        }
        else{
            this.body.reset(x + 75, y + 10);
        }
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(300);
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);

        if(this.x >= 640){
            this.setActive(false);
            this.setVisible(false);
        }
    }

}

