class EnemyTank extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        scene.add.existing(this);
        this.anims.play('tank_moving');
        this.points = 20;
        this.health = 2;
    }

    update(){   
        // hitbox size
        this.body.setSize(60,19);
        // hitbox coordinate
        this.body.setOffset(0,7); 

        this.body.immovable = true;

        this.x -= 1;

    }

}