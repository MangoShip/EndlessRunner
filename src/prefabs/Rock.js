class Rock extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        scene.add.existing(this);
        this.points = 10;
        this.health = 1;
    }

    update(){
        // hitbox size
        this.body.setSize(46,42);
        // hitbox coordinate
        this.body.setOffset(5,10); 

        // approach to player
        this.x -= 0.75;
    }


}