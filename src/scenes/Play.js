class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        // load images/tile sprite
        this.load.image('player', './assets/player.png');
        this.load.image('player_bullet', './assets/player_bullet.png');
        this.load.image('enemy', './assets/enemy.png');
        this.load.image('enemy_bullet', './assets/enemy_bullet.png');
        this.load.image('rock', './assets/rock.png');
        this.load.image('background', './assets/background.png');
        this.load.image('power_up', './assets/enemy_bullet.png');
    }

    create(){
        // place tile sprite
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        // game over flag
        this.gameOver = false;
             
        // add player
        this.player = new Player(this, 40, 132, 'player'). setOrigin(0, 0);

        // add obstacles
        this.rock = new Obstacle(this, 500, 200, 'rock').setOrigin(0, 0);

        /// add bullets
        this.bulletGroup = new BulletGroup(this);

        // add powerup
        this.powerUp = new PowerUp(this, 600, 200, 'power_up').setOrigin(0,0);

        // define keyboard keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        // set up enemy group and add first enemy to kick things off
        this.enemyGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        this.addEnemy();

        this.time.addEvent({
            delay: 7000,
            callback: ()=>{
                this.addEnemy();
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
    }

    addEnemy() {
        let enemy = new Enemy(this, this.game.config.width, Phaser.Math.Between(0, this.game.config.height+50), 'enemy').setOrigin(0, 0);
        this.enemyGroup.add(enemy); // add it to existing group
    }

    update(){
        // scroll background
        this.background.tilePositionX += 0.75;
        
        // update if game isn't over
        if(!this.gameOver){
            this.player.update();
            this.rock.update();
            this.powerUp.update();
        }

        if(keyF.isDown){
            this.shoot();
        }
       
        // check collisions (player and rock)
        if(this.checkObstacleCollision(this.player, this.rock)){
            this.rock.reset();
        }

        // check collision with health powerup
        if(this.checkObstacleCollision(this.player, this.powerUp)){
            this.powerUp.reset();
            this.player.health += 10;
        }
        console.log(this.player.health);
    }

    shoot(){
        this.bulletGroup.shootBullet(this.player.x, this.player.y);
    }

    // check collision for player and obstacle
    checkObstacleCollision(player, obstacle){
        // simple AABB checking
        if(player.x < obstacle.x + obstacle.width && 
           player.x + player.width > obstacle.x && 
           player.y < obstacle.y + obstacle.height && 
           player.height + player.y > obstacle.y){
            return true;
        }
        else{
            return false;
        }
    }
}