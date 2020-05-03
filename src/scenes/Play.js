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
        this.load.spritesheet('bullet_effect', './assets/bullet_effect.png', {frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 2});
        this.load.spritesheet('enemy_tank', './assets/enemytank.png', {frameWidth: 60, frameHeight: 30, startFrame: 0, endFrame: 2});
        this.load.spritesheet('enemy_infantry', './assets/enemyinfantry.png', {frameWidth: 50, frameHeight: 40, startFrame: 0, endFrame: 3});
        this.load.image('rock', './assets/rock.png');
        this.load.image('tree', './assets/tree.png');
        this.load.image('background', './assets/background.png');
        this.load.image('HP', './assets/HP_Powerup.png');
        this.load.image('AS', './assets/AS_Powerup.png');
        this.load.image('AD', './assets/AD_Powerup.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 50, frameHeight: 50, startFrame: 0, endFrame: 2});
        this.load.spritesheet('T34hit', './assets/T34hit.png', {frameWidth: 60, frameHeight: 30, startFrame: 0, endFrame: 2});
        this.load.spritesheet('SU85hit', './assets/SU85hit.png', {frameWidth: 60, frameHeight: 30, startFrame: 0, endFrame: 2});
        this.load.spritesheet('KV2hit', './assets/KV2hit.png', {frameWidth: 60, frameHeight: 30, startFrame: 0, endFrame: 2});
        this.load.audio('WW2', './assets/WW2.wav');
        this.load.audio('bulletHit', './assets/bulletHit.wav');
        this.load.audio('expplosion', './assets/explosion.wav');
        this.load.audio('powerUp', './assets/powerUp.wav');
        this.load.audio('tankFire', './assets/tankFire.wav');
        this.load.audio('tankMoving', './assets/tankMoving.wav');
    }

    create(){
        // set up audio, play bgm
        this.bgm = this.sound.add('WW2', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.bgm.play();

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

        // create animation for bullet effect
        this.anims.create({
            key: 'bullet_gone',
            frames: this.anims.generateFrameNumbers('bullet_effect', {start: 0, end: 2, first: 0}),
            frameRate: 20,
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

        // define keyboard keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        // set up enemy group and add first enemy to kick things off
        this.enemyGroup = this.physics.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        // set up powerup group
        this.powerUpGroup = this.physics.add.group({
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

        // loop that spawns powerups
        this.time.addEvent({
            delay: 15000, // every 15 seconds
            callback: ()=>{
                var val = Phaser.Math.Between(0,2);
                if(val == 0) {
                    this.addHP();
                }

                else if(val == 1) {
                    this.addAS();
                }

                else {
                    this.addAD();
                }
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

        // Print GAME OVER Screen Once
        this.printOnce = 1;
    }

    // Handles collision between bullet and enemy
    handleCollision(bullet, enemy){;
        let bullet_trace = this.add.sprite(bullet.x, bullet.y, 'bullet_effect').setOrigin(0.5).setScale(2);
        bullet_trace.anims.play('bullet_gone');
        bullet_trace.on('animationcomplete', () => {
            bullet_trace.destroy(true);
        })
        bullet.x = 700;
        enemy.health -= game.settings.damage;
        if(enemy.health <= 0){
            let boom = this.add.sprite(enemy.x, enemy.y, 'explosion').setOrigin(0.2).setScale(2);
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

        if(this.playerHealth == 0){
            let boom = this.add.sprite(player.x, player.y, 'explosion').setOrigin(0, 0).setScale(2);
            boom.anims.play('explode');
            boom.on('animationcomplete', () => {
                boom.destroy(true);
            })
            player.destroy(true);
        }
    }
    
    // Changed coordinates for spawn to avoid sprites going over screen. 
    // function that adds enemy tank to the enemyGroup
    addEnemyTank() {
        if(!this.gameOver){
            let enemy = new EnemyTank(this, this.game.config.width, Phaser.Math.Between(80, 334), 'enemy_tank').setOrigin(0, 0).setScale(2);
            this.enemyGroup.add(enemy); // add it to existing group
        }
    }

    // function that adds enemy infantry to the enemyGroup
    addEnemyInfantry() {
        if(!this.gameOver){
            let enemy = new EnemyInfantry(this, this.game.config.width, Phaser.Math.Between(60, 310), 'enemy_infrantry').setOrigin(0, 0).setScale(2);
            this.enemyGroup.add(enemy); // add it to existing group
        }
    }

    // function that adds rocks
    addRock() {
        if(!this.gameOver){
            let rock = new Rock(this, this.game.config.width, Phaser.Math.Between(80, 340), 'rock').setOrigin(0, 0).setScale(1);
            this.enemyGroup.add(rock); // add it to existing group
        }
    }

    // function that adds trees
    addTree() {
        if(!this.gameOver){
            let tree = new Tree(this, this.game.config.width, Phaser.Math.Between(50, 300), 'tree').setOrigin(0, 0).setScale(1.5);
            this.enemyGroup.add(tree); // add it to existing group
        }
    }

    // function that adds HP Powerups
    addHP() {
        if(!this.gameOver){
            let HP = new HP_PowerUp(this, this.game.config.width, Phaser.Math.Between(105, 300), 'HP').setOrigin(0, 0).setScale(1.5);
            this.powerUpGroup.add(HP); // add it to existing group
        }
    }

    // function that adds AD Powerups
    addAD() {
        if(!this.gameOver){
            let AD = new AD_PowerUp(this, this.game.config.width, Phaser.Math.Between(105, 300), 'AD').setOrigin(0, 0).setScale(1.5);
            this.powerUpGroup.add(AD); // add it to existing group
        }
    }

    // function that adds AS Powerups
    addAS() {
        if(!this.gameOver){
            let AS = new AS_PowerUp(this, this.game.config.width, Phaser.Math.Between(105, 300), 'AS').setOrigin(0, 0).setScale(1.5);
            this.powerUpGroup.add(AS); // add it to existing group
        }
    }

    update(){
        // gameover when playerHealth is 0
        if(this.playerHealth == 0){
            this.gameOver = true;
        }
        // NOT game over
        if(!this.gameOver){
            // scroll background
            this.background.tilePositionX += 0.75;

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
        else{ // Game Over
            if(this.printOnce == 1){
                this.scoreConfig.fontSize = "60px";
                this.add.text(game.config.width/2, (game.config.height/2) - 50, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
                this.scoreConfig.fontSize = "28px";
                this.add.text(game.config.width/2, (game.config.height/2) + 20, 'YOUR SCORE: ' + this.Score, this.scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, (game.config.height/2) + 70, 'Press (F) to go back to main menu', this.scoreConfig).setOrigin(0.5);
                this.printOnce = 2;
            }

            // go back to main menu
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.scene.start("mainMenuScene");
            }
        }
    }

    shoot(x, y){
        let bullet = this.bullets.getFirstDead(false);
        if(bullet){
            bullet.fire(x, y);
        }
    }
}