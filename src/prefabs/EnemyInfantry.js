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
    }

    reset() {
        this.x = game.config.width;
    }
}