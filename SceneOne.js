var player;

var ennemy; 
var ennemyATire = false;


var keys;
var gamepad;
var paddle;
var padConnected;
var pad;

var mountainsBack;
var mountainsMid1;
var mountainsMid2;

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
        //calques parallax
        this.load.image('mountains_back', 'assets/mountains_back.png');
        this.load.image('mountains_mid1', 'assets/mountains_mid1.png');
        this.load.image('mountains_mid2', 'assets/mountains_mid2.png');
        
        this.load.image('player', 'assets/player_placeholdere.png');
        
        this.load.image('attaque', 'assets/tile_green.jpg');
        
        this.load.image('ennemy', 'assets/ennemy.png');

    }
    create(){
        
        
           

           
        mountainsBack = this.add.image(1024, 447, 'mountains_back').setScrollFactor(0.3);
        mountainsMid1 = this.add.image(1024, 385, 'mountains_mid1').setScrollFactor(0.6);
        mountainsMid2 = this.add.image(1024, 482, 'mountains_mid2').setScrollFactor(0.9);
        
        player = this.physics.add.sprite(150, 550, 'player').setScale(0.35);
        ennemy = this.physics.add.sprite(1100, 600, 'ennemy').setScale(0.1);
        
        swing = this.physics.add.group();
        
        projectile = this.physics.add.group();
        
        //projectile = this.physics.add.sprite(1000, 550, 'attaque');
        //projectile.body.setAllowGravity(false);
        
        //clavier
        keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up : Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            escape : Phaser.Input.Keyboard.KeyCodes.ESC,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            E: Phaser.Input.Keyboard.KeyCodes.E
        });
        
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
        this.physics.world.setBounds(0, 0, 2000, 720);
        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, 2000, 720);
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
        
        
        if(keys.right.isDown && keys.space.isUp){
            player.setVelocityX(200);
        }
        if (keys.left.isDown && keys.space.isUp){
            player.setVelocityX(-200);
        }
        if(keys.right.isUp && keys.left.isUp){
            player.setVelocityX(0);
        }
        if (keys.space.isDown && keys.right.isDown && canSwing){
            player.setVelocityX(0);
            canSwing = false;
            attaque(100,0);
            setTimeout(function(){canSwing = true}, 1000);
            setTimeout(function(){newSwing.destroy()}, 500);
        }
        if (keys.space.isDown && keys.left.isDown && canSwing){
            player.setVelocityX(0);
            canSwing = false;
            attaque(-100,0);
            setTimeout(function(){canSwing = true}, 1000);
            setTimeout(function(){newSwing.destroy()}, 500);
        }
        
        

        if (ennemy.x > player.x && ennemy.x >= 500){
            ennemy.setVelocityX(-100);
            if (ennemyATire == false && ennemy.x - player.x > 200){
                ennemyATire = true;
                tirEnnemi(-30, -30, projectileLeftSpeed);
                setTimeout(function(){ennemyATire = false}, 4000);
            }
        }
        else if (ennemy.x < player.x && ennemy.x <= 1200){
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
    newSwing = swing.create(player.x + x, player.y + y, 'attaque');
    newSwing.body.setAllowGravity(false);
}

function tirEnnemi(x, y, velocity){
    newProjectile = projectile.create(ennemy.x + x, ennemy.y + y, 'attaque');
    newProjectile.body.setAllowGravity(false);
    newProjectile.setVelocityX(velocity);
    setTimeout(function(){tirToDestroy = projectile.getFirstAlive(false)}, 5000);
    setTimeout(function(){tirToDestroy.destroy()}, 5000);
    tirEnJeu = true;
}