class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        // load images/tile sprite
        this.load.image('player1', './assets/T34.png');
        this.load.image('player2', './assets/SU85.png');
        this.load.image('player3', './assets/KV2.png');
        this.load.image('player_bullet', './assets/player_bullet.png');
        this.load.image('enemy_infantry', './assets/enemy1.png');
        this.load.image('enemy_tank', './assets/enemy2.png');
        this.load.image('enemy_bullet', './assets/enemy_bullet.png');
        this.load.image('rock', './assets/rock.png');
        this.load.image('tree', './assets/tree.png');
        this.load.image('background', './assets/background.png');
        this.load.image('power_up', './assets/enemy_bullet.png');
    }

    create(){
        // place tile sprite
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        // game over flag
        this.gameOver = false;
     
        // add player according to the tank that player has chosen
        if(game.settings.tank == 1){
            // T34
            this.player = this.physics.add.sprite(40, 132, 'player1').setOrigin(0, 0).setScale(1.5);
            this.player.body.setSize(59,19);
            this.player.body.setOffset(1,7); 
        }
        else if(game.settings.tank == 2){
            // SU85
            this.player = this.physics.add.sprite(40, 132, 'player2').setOrigin(0, 0).setScale(1.5);
            this.player.body.setSize(59,19);
            this.player.body.setOffset(1,7); 
        }
        else{
            // KV2
            this.player = this.physics.add.sprite(40, 132, 'player3').setOrigin(0, 0).setScale(1.5);
            this.player.body.setSize(45,23);
            this.player.body.setOffset(1,3); 
        }

        // add bullets
        this.bullets = this.physics.add.group({
            classType: Bullet,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'bullet',
            runChildUpdate: true
        })

        // add powerup
        this.powerUp = new PowerUp(this, 600, 200, 'power_up').setOrigin(0,0);

        // define keyboard keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        // set up enemy group and add first enemy to kick things off
        this.enemyGroup = this.physics.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        this.addEnemyTank(); // first enemy tank added to enemyGroup
        this.addEnemyInfantry(); // first enemy infantry added to enemyGroup

        // a loop that spawns enemies
        this.time.addEvent({
            delay: 7000, // delay time in ms 
            callback: ()=>{
                this.addEnemyTank();
                this.addEnemyInfantry();
            },

            delay: 10000, // delay time in ms 
            callback: ()=>{
                this.addRock();
                this.addTree();
            },
            loop: true
        })

        //score
        this.p1Score = 0;

        //score display
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, this.scoreConfig);

        this.physics.add.collider(this.bullets, this.enemyGroup, this.handleCollision, null, this);
        this.physics.add.collider(this.player, this.enemyGroup, this.playerCollision, null, this);
    }

    // Handles collision between bullet and enemy
    handleCollision(bullet, enemy){
        bullet.destroy(true);
        enemy.destroy(true);
    }
    
    // Handles collision between player and enemy
    playerCollision(player, enemy){
        enemy.destroy(true);
    }
    
    // Changed coordinates for spawn to avoid sprites going over screen. 
    // function that adds enemy tank to the enemyGroup
    addEnemyTank() {
        let enemy = new EnemyTank(this, this.game.config.width, Phaser.Math.Between(20, 400), 'enemy_tank').setOrigin(0, 0).setScale(2);
        this.enemyGroup.add(enemy); // add it to existing group
    }

    // function that adds enemy infantry to the enemyGroup
    addEnemyInfantry() {
        let enemy = new EnemyInfantry(this, this.game.config.width, Phaser.Math.Between(20, 400), 'enemy_infantry').setOrigin(0, 0).setScale(2);
        this.enemyGroup.add(enemy); // add it to existing group
    }

    // function that adds rocks
    addRock() {
        let rock = new Rock(this, this.game.config.width, Phaser.Math.Between(34, 400), 'rock').setOrigin(0, 0).setScale(1);
        this.enemyGroup.add(rock); // add it to existing group
    }

    // function that adds trees
    addTree() {
        let tree = new Tree(this, this.game.config.width, Phaser.Math.Between(80, 350), 'tree').setOrigin(0, 0).setScale(2);
        this.enemyGroup.add(tree); // add it to existing group
    }

    update(){
        // scroll background
        this.background.tilePositionX += 0.75;
        
        // update if game isn't over
        if(!this.gameOver){
            this.powerUp.update();
        }

        // move player up
        if(keyUP.isDown){
            if(this.player.y > 0){
                this.player.y -= 2;
            }
        }

        // move player down
        if(keyDOWN.isDown){
            if(this.player.y < 430){
                this.player.y += 2;
            }
        }

        // Add delay between each shooting. 
        if(this.input.keyboard.checkDown(keyF, 250)){
            this.shoot(this.player.x, this.player.y);
        }
       
    }

    shoot(x, y){
        let bullet = this.bullets.getFirstDead(false);
        //console.log(bullet);
        if(bullet){
            bullet.fire(x, y);
        }
    }

}