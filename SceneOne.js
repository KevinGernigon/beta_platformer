var player;

var ennemy; 
var ennemyATire = false;
var leopard;

var keys;
var left;
var right;
var gamepad;
var paddle;
var padConnected;
var pad;

var swing;
var newSwing;
var canSwing = true;

var projectile;
var newProjectile;
var tirEnJeu = false;
var tirToDestroy;
var projectileLeftSpeed = -150;
var projectileRightSpeed = 150;
var flipped = false;


//var combo_1 = false;
//var combo_2 = false;

class SceneOne extends Phaser.Scene{
    constructor(){
        super("sceneOne");
        this.pad = null;
    }
    init(data){
    }
    preload(){
        
        this.load.image('arbres_front', 'assets/foreground.png');
        this.load.image('arbres_mid', 'assets/midfront.png');
        this.load.image('arbres_back', 'assets/background_arbres.png');
        this.load.image('background', 'assets/background.jpg');
        
        this.load.image('village_gobelin', 'assets/village_gobelin.png');
        
        //this.load.image('player', 'assets/player_placeholdere.png');
        this.load.spritesheet('player', 'assets/spritesheets/spritesheet_joueur.png', {frameWidth: 524,frameHeight: 552});
        this.load.spritesheet('leopard', 'assets/spritesheets/spritesheet_leopard.png', {frameWidth: 472, frameHeight: 223});
        
        this.load.image('attaque', 'assets/tile_green.jpg');
        
        this.load.image('ennemy', 'assets/ennemy.png');

    }
    create(){
            
        this.add.image(448, 224, 'background').setScrollFactor(0.3); 
        this.add.image(1344, 224, 'background').setScrollFactor(0.3);
        this.add.image(2240, 224, 'background').setScrollFactor(0.3);
        
        
        this.add.image(448, 224, 'arbres_back').setScrollFactor(0.3);   
        this.add.image(1344, 224, 'arbres_back').setScrollFactor(0.3); 
        this.add.image(2240, 224, 'arbres_back').setScrollFactor(0.3); 
        
        
        this.add.image(448, 224, 'arbres_mid').setScrollFactor(0.6);
        this.add.image(1344, 224, 'arbres_mid').setScrollFactor(0.6);
        this.add.image(2240, 224, 'arbres_mid').setScrollFactor(0.6);
        
        
        this.add.image(448, 224, 'arbres_front').setScrollFactor(0.9); 
        this.add.image(1344, 224, 'arbres_front').setScrollFactor(0.9); 
        this.add.image(2240, 224, 'arbres_front').setScrollFactor(0.9); 
        
        this.add.image(3136, 224, 'village_gobelin');
        
        
        player = this.physics.add.sprite(100, 400, 'player').setScale(0.35);
        
        ennemy = this.physics.add.sprite(3250, 400, 'ennemy').setScale(0.3);
        
        swing = this.physics.add.group();
        
        projectile = this.physics.add.group();
        
        //projectile = this.physics.add.sprite(1000, 550, 'attaque');
        //projectile.body.setAllowGravity(false);
        
        //clavier
        keys = this.input.keyboard.addKeys({
            kleft: Phaser.Input.Keyboard.KeyCodes.LEFT,
            kright: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up : Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            escape : Phaser.Input.Keyboard.KeyCodes.ESC,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            E: Phaser.Input.Keyboard.KeyCodes.E
        });
        
        left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        //manette
        if (this.input.gamepad.total === 0){
            this.input.gamepad.once('connected', function (pad, button, index) {
                paddle = pad;
                padConnected = true;
            }); 
        }
        else {
            paddle = this.input.gamepad.pad1;
        }
        
        //colliders & overlaps
        this.physics.add.collider(player, projectile, hitOnPlayer, null, this);
        this.physics.add.overlap(projectile, swing, renvoiProjectile, null, this);
        
        function hitOnPlayer(player, projectile){
            player.setTint(0xff0000);
        }
        
        function renvoiProjectile(projectile, swing){
            //if (flipped == false){
                //flipped = true;
                if (ennemy.x > player.x){
                    projectile.setVelocityX(projectileRightSpeed);
                }
                else if (ennemy.x < player.x){
                    projectile.setVelocityX(projectileLeftSpeed);
                }
                //setTimeout(function(){flipped = false}, 5000);
            //}
        }
        player.setCollideWorldBounds();
        ennemy.setCollideWorldBounds();
        this.physics.world.setBounds(0, 0, 3564, 448);
        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, 3564, 448);
        
        
        //anims//
        this.anims.create({
            key: 'idle_right',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 0}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {start: 1, end: 4}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'baseball_right',
            frames: this.anims.generateFrameNumbers('player', {start: 5, end: 12}),
            frameRate: 6,
            repeat: 0
        });
        this.anims.create({
            key: 'idle_left',
            frames: this.anims.generateFrameNumbers('player', {start: 13, end: 13}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {start: 14, end: 17}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'baseball_left',
            frames: this.anims.generateFrameNumbers('player', {start: 18, end: 25}),
            frameRate: 6,
            repeat: 0
        });
    }
    
    update(){
        
        //test keycombos pour Tibs//
        /*if(combo_1 == false && keys.A.isDown){
            combo_1 = true;
            this.keybombo1 = this.input.keyboard.createCombo('BCD');
        }
        
        if (combo_2 == false && keys.E.isDown){
            combo_2 = true;
            this.keybombo2 = this.input.keyboard.createCombo('ERT');
        }

        this.input.keyboard.on('keycombomatch', function (event) {
          if (combo_1 == true) {
              console.log('combo_1');
              combo_1 = false;
              
          } else if (combo_2 == true) {
              console.log('combo_2');
              combo_2 = false;
              
          }
        });*/
        
        
        if(keys.kright.isDown && keys.space.isUp && canSwing == true){
            player.anims.play('right', true);
            player.setVelocityX(200);
        }
        else if (keys.kleft.isDown && keys.space.isUp && canSwing == true){
            player.anims.play('left', true);
            player.setVelocityX(-200);
        }
        /*if(keys.right.isUp && keys.left.isUp && canSwing == true){
            player.anims.play('idle_right', true);
            player.setVelocityX(0);
        }*/
        else if (keys.space.isDown && keys.kright.isDown && canSwing){
            player.anims.play('baseball_right', true);
            player.setVelocityX(0);
            canSwing = false;
            attaque(100,0);
            setTimeout(function(){canSwing = true}, 1500);
            setTimeout(function(){newSwing.destroy()}, 1500);
        }
        else if (keys.space.isDown && keys.kleft.isDown && canSwing){
            player.anims.play('baseball_left', true);
            player.setVelocityX(0);
            canSwing = false;
            attaque(-100,0);
            setTimeout(function(){canSwing = true}, 1500);
            setTimeout(function(){newSwing.destroy()}, 1500);
        }
        else if (canSwing == true && Phaser.Input.Keyboard.JustUp(left)){
            player.anims.play('idle_left', true);
            player.setVelocityX(0);
        }
        
        else if (canSwing == true && Phaser.Input.Keyboard.JustUp(right)){
            player.anims.play('idle_right', true);
            player.setVelocityX(0);
        }
        

        if (ennemy.x > player.x && ennemy.x >= 3100){
            ennemy.setVelocityX(-100);
            if (ennemyATire == false && ennemy.x - player.x > 200){
                ennemyATire = true;
                tirEnnemi(-30, -30, projectileLeftSpeed);
                setTimeout(function(){ennemyATire = false}, 4000);
            }
        }
        else if (ennemy.x < player.x && ennemy.x <= 3584){
            ennemy.setVelocityX(100);
            if (ennemyATire == false && player.x - ennemy.x > 200){
                ennemyATire = true;
                tirEnnemi(30, -30, projectileRightSpeed)
                setTimeout(function(){ennemyATire = false}, 4000);
            }
        }
        else {
            ennemy.setVelocityX(0);
        }
        
        
        
    }
}

function attaque(x, y){
    setTimeout(function(){
    newSwing = swing.create(player.x + x, player.y + y, 'attaque');
    newSwing.body.setAllowGravity(false);
    }, 1000);
}

function tirEnnemi(x, y, velocity){
    newProjectile = projectile.create(ennemy.x + x, ennemy.y + y, 'attaque');
    newProjectile.body.setAllowGravity(false);
    newProjectile.setVelocityX(velocity);
    setTimeout(function(){tirToDestroy = projectile.getFirstAlive(false)}, 7000);
    setTimeout(function(){tirToDestroy.destroy()}, 7000);
    tirEnJeu = true;
}