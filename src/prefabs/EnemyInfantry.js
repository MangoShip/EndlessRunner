class EnemyInfantry extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        scene.add.existing(this);
        this.isFiring = false;
        this.anims.play('infantry_moving');
    }

    update(){
        // hitbox size
        this.body.setSize(43, 35);
        // hitbox coordinate
        this.body.setOffset(0, 2); 

        this.x -= 1.15;

        //wraparound the spaceship from left to right
        if(this.x <= 0-this.width) {
            this.x = game.config.width;
            this.y = Phaser.Math.Between(20, 400);
        }
    }

    reset() {
        this.x = game.config.width;
    }
}