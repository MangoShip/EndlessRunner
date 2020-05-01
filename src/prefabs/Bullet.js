class BulletGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Bullet,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'bullet'
        })
    }

    shootBullet(x, y){
        let bullet = this.getFirstDead(false);
        if(bullet){
            bullet.fire(x, y);
        }
    }

}
class Bullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'player_bullet');
    }

    fire(x, y){
        //console.log("fire");
        this.body.reset(x + 65, y + 10);
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

