class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        scene.add.existing(this);
        this.isFiring = false;
        this.health = 50;
    }

    update(){
        console.log(this.y)
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

}