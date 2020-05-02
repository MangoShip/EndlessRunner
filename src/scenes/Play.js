class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        // load images/tile sprite
        this.load.spritesheet('player1', './assets/T34.png', {frameWidth: 60, frameHeight: 30, startFrame: 0, endFrame: 2});
        this.load.spritesheet('player2', './assets/SU85.png', {frameWidth: 60, frameHeight: 30, startFrame: 0, endFrame: 2});
        this.load.spritesheet('player3', './assets/KV2.png', {frameWidth: 60, frameHeight: 30, startFrame: 0, endFrame: 2});
        this.load.image('player_bullet', './assets/player_bullet.png');
        this.load.spritesheet('enemy_tank', './assets/enemytank.png', {frameWidth: 60, frameHeight: 30, startFrame: 0, endFrame: 2});
        this.load.spritesheet('enemy_infantry', './assets/enemyinfantry.png', {frameWidth: 50, frameHeight: 40, startFrame: 0, endFrame: 3});
        this.load.image('enemy_bullet', './assets/enemy_bullet.png');
        this.load.image('rock', './assets/rock.png');
        this.load.image('tree', './assets/tree.png');
        this.load.image('background', './assets/background.png');
        this.load.image('power_up', './assets/enemy_bullet.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 50, frameHeight: 50, startFrame: 0, endFrame: 2});
        this.load.spritesheet('T34hit', './assets/T34hit.png', {frameWidth: 60, frameHeight: 30, startFrame: 0, endFrame: 2});
        this.load.spritesheet('SU85hit', './assets/SU85hit.png', {frameWidth: 60, frameHeight: 30, startFrame: 0, endFrame: 2});
        this.load.spritesheet('KV2hit', './assets/KV2hit.png', {frameWidth: 60, frameHeight: 30, startFrame: 0, endFrame: 2});
    }

    create(){
        // place tile sprite
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        // game over flag
        this.gameOver = false;
     
        // create animation for T34
        this.anims.create({
            key: 't34_moving',
            frames: this.anims.generateFrameNumbers('player1', {start: 0, end: 3, first: 0}),
            frameRate: 6,
            repeat: -1
        })

        // create animation for T34 hit
        this.anims.create({
            key: 'T34_hit',
            frames: this.anims.generateFrameNumbers('T34hit', {start: 0, end: 3, first: 0}),
            frameRate: 10,
        })

        // create animation for SU85
        this.anims.create({
            key: 'su85_moving',
            frames: this.anims.generateFrameNumbers('player2', {start: 0, end: 3, first: 0}),
            frameRate: 6,
            repeat: -1
        })

        // create animation for SU85 hit
        this.anims.create({
            key: 'SU85_hit',
            frames: this.anims.generateFrameNumbers('SU85hit', {start: 0, end: 3, first: 0}),
            frameRate: 10,
        })

        // create animation for KV2
        this.anims.create({
            key: 'kv2_moving',
            frames: this.anims.generateFrameNumbers('player3', {start: 0, end: 3, first: 0}),
            frameRate: 6,
            repeat: -1
        })

        // create animation for KV2 hit
        this.anims.create({
            key: 'KV2_hit',
            frames: this.anims.generateFrameNumbers('KV2hit', {start: 0, end: 3, first: 0}),
            frameRate: 10,
        })

        // create animation for enemy tank
        this.anims.create({
            key: 'tank_moving',
            frames: this.anims.generateFrameNumbers('enemy_tank', {start: 0, end: 3, first: 0}),
            frameRate: 6,
            repeat: -1
        })

        // create animation for enemy infantry
        this.anims.create({
            key: 'infantry_moving',
            frames: this.anims.generateFrameNumbers('enemy_infantry', {start: 0, end: 3, first: 0}),
            frameRate: 3,
            repeat: -1
        })

        // create animation for explosion
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 2, first: 0}),
            frameRate: 5,
        })
        
        // add player according to the tank that player has chosen
        if(game.settings.tank == 1){
            // T34
            this.player = this.physics.add.sprite(40, 132, 'player1').setOrigin(0, 0).setScale(2);
            this.player.body.setSize(59,19);
            this.player.body.setOffset(1,7); 
            this.player.anims.play('t34_moving');
        }
        else if(game.settings.tank == 2){
            // SU85
            this.player = this.physics.add.sprite(40, 132, 'player2').setOrigin(0, 0).setScale(2);
            this.player.body.setSize(59,19);
            this.player.body.setOffset(1,7); 
            this.player.anims.play('su85_moving');
        }
        else{
            // KV2
            this.player = this.physics.add.sprite(40, 132, 'player3').setOrigin(0, 0).setScale(2);
            this.player.body.setSize(45,23);
            this.player.body.setOffset(1,3); 
            this.player.anims.play('kv2_moving');
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

        // loop that spawns infantry
        this.time.addEvent({
            delay: 7000, // every 7 seconds
            callback: ()=>{
                this.addEnemyInfantry();
            },
            loop: true
        })

        // loop that spawns tank
        this.time.addEvent({
            delay: 8000, // every 8 seconds
            callback: ()=>{
                this.addEnemyTank();
            },
            loop: true
        })
        
        // loop that spawns tree 
        this.time.addEvent({
            delay: 10000, // every 10 seconds
            callback: ()=>{
                this.addTree();
            },
            loop: true
        })

        // loop that spawns rock
        this.time.addEvent({
            delay: 3000, // every 3 seconds
            callback: ()=>{
                this.addRock();
            },
            loop: true
        })

        //score
        this.Score = 0;

        this.playerHealth = game.settings.health;

        //score display
        this.scoreConfig = {
            fontFamily: 'BIZ UDMincho Medium',
            fontSize: '28px',
            color: "#FFFFFF",
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.scoreDisplay = this.add.text(40, 415, 'Score: ' + this.Score, this.scoreConfig);
        this.healthDisplay = this.add.text(535, 415, 'Hp: '+this.playerHealth, this.scoreConfig);

        this.physics.add.collider(this.bullets, this.enemyGroup, this.handleCollision, null, this);
        this.physics.add.collider(this.player, this.enemyGroup, this.playerCollision, null, this);
    }

    // Handles collision between bullet and enemy
    handleCollision(bullet, enemy){;
        bullet.destroy(true);
        enemy.health -= game.settings.damage;
        if(enemy.health <= 0){
            let boom = this.add.sprite(enemy.x, enemy.y, 'explosion').setOrigin(0, 0).setScale(2);
            boom.anims.play('explode');
            boom.on('animationcomplete', () => {
                boom.destroy(true);
            })
            this.Score += enemy.points;
            this.scoreDisplay.text = 'Score: ' + this.Score;
            enemy.destroy(true);
        }
    }
    
    // Handles collision between player and enemy
    playerCollision(player, enemy){
        this.playerHealth -= 1;
        this.healthDisplay.text = 'Hp:' + this.playerHealth;

        // Play hit animation
        if(game.settings.tank == 1){
            this.player.anims.chain('T34_hit');
            this.player.anims.stop();
            this.player.anims.chain('t34_moving');
        }
        else if(game.settings.tank == 2){
            this.player.anims.chain('SU85_hit');
            this.player.anims.stop();
            this.player.anims.chain('su85_moving');
        }
        else{
            this.player.anims.chain('KV2_hit');
            this.player.anims.stop();
            this.player.anims.chain('kv2_moving');
        }

        let boom = this.add.sprite(enemy.x, enemy.y, 'explosion').setOrigin(0, 0).setScale(2);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            boom.destroy(true);
        })
        enemy.destroy(true);
    }
    
    // Changed coordinates for spawn to avoid sprites going over screen. 
    // function that adds enemy tank to the enemyGroup
    addEnemyTank() {
        let enemy = new EnemyTank(this, this.game.config.width, Phaser.Math.Between(80, 334), 'enemy_tank').setOrigin(0, 0).setScale(2);
        this.enemyGroup.add(enemy); // add it to existing group
    }

    // function that adds enemy infantry to the enemyGroup
    addEnemyInfantry() {
        let enemy = new EnemyInfantry(this, this.game.config.width, Phaser.Math.Between(60, 310), 'enemy_infrantry').setOrigin(0, 0).setScale(2);
        this.enemyGroup.add(enemy); // add it to existing group
    }

    // function that adds rocks
    addRock() {
        let rock = new Rock(this, this.game.config.width, Phaser.Math.Between(80, 340), 'rock').setOrigin(0, 0).setScale(1);
        this.enemyGroup.add(rock); // add it to existing group
    }

    // function that adds trees
    addTree() {
        let tree = new Tree(this, this.game.config.width, Phaser.Math.Between(50, 300), 'tree').setOrigin(0, 0).setScale(1.5);
        this.enemyGroup.add(tree); // add it to existing group
    }

    update(){
        // scroll background
        this.background.tilePositionX += 0.75;
        
        // gameover when playerHealth is 0
        if(this.playerHealth == 0){
            console.log("GameOver");
        }

        // move player up
        if(keyUP.isDown){
            if(this.player.y > 80){
                this.player.y -= game.settings.speed;
            }
        }

        // move player down
        if(keyDOWN.isDown){
            if(this.player.y < 334){
                this.player.y += game.settings.speed;
            }
        }

        // Add delay between each shooting. 
        if(this.input.keyboard.checkDown(keyF, 500)){
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