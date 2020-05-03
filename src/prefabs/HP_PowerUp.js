class HP_PowerUp extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
    }

    update(){
        this.x -= 1;
    }

    isHP() {
        return true;
    }

    isAS() {
        return false;
    }

    isAD() {
        return false;
    }

    reset() {
        this.x = game.config.width;
    }
}