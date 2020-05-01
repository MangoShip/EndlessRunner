class EnemyTank extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        scene.add.existing(this);
        this.anims.play('tank_moving');
    }

    update(){   
        // hitbox size
        this.body.setSize(60,19);
        // hitbox coordinate
        this.body.setOffset(0,7); 

        this.x -= 1;

    }

    reset() {
        this.x = game.config.width;
    }

}