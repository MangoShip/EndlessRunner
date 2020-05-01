class Tree extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        scene.add.existing(this);
        // save initial x value;
        this.origin = x;
    }

    update(){
        // hitbox size
        this.body.setSize(50,55);
        // hitbox coordinate
        this.body.setOffset(1,0); 
        
        // approach to player
        this.x -= 0.75;
    }

    reset(){
        this.x = this.origin;
    }
}