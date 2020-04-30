class Obstacle extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        scene.add.existing(this);
        // save initial x value;
        this.origin = x;
    }

    update(){
        // approach to player
        this.x -= 1;
    }

    reset(){
        this.x = this.origin;
    }

}