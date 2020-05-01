class EnemyTank extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        scene.add.existing(this);
    }

    update(){   
        // hitbox size
        this.body.setSize(60,19);
        // hitbox coordinate
        this.body.setOffset(0,7); 

        this.x -= 1;

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