// CURRENTLY NOT USING THIS CLASS FILE.
//
//
//
//
//
class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        scene.add.existing(this);
        this.isFiring = false;
        this.health = 50;

    }

    update(){
        // hitbox size
        //this.body.setSize(100,100);
        // hitbox coordinate
        //this.body.setOffset(1,0); 

        // move up
        if(keyUP.isDown){
            if(this.y > 0){
                this.y -= 2;
            }
        }

        // move down
        if(keyDOWN.isDown){
            if(this.y < 430){
                this.y += 2;
            }
        }
        
    }

    getX(){
        return this.x;
    }

}