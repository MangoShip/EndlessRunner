class Tree extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        scene.add.existing(this);
        this.points = 30;
        this.health = 3;
    }

    update(){
        // hitbox size
        this.body.setSize(50,55);
        // hitbox coordinate
        this.body.setOffset(1,0); 

        this.body.immovable = true;
        
        // approach to player
        this.x -= 0.50;
    }

}