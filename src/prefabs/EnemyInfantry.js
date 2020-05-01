class EnemyInfantry extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        scene.add.existing(this);
        this.isFiring = false;
    }

    update(){
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