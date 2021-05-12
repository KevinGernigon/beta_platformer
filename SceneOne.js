var player;

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
var projectileSpeed = -100;
var flipped = false;

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

    }
    create(){
        
        mountainsBack = this.add.image(1024, 447, 'mountains_back').setScrollFactor(0.3);
        mountainsMid1 = this.add.image(1024, 385, 'mountains_mid1').setScrollFactor(0.6);
        mountainsMid2 = this.add.image(1024, 482, 'mountains_mid2').setScrollFactor(0.9);
        
        player = this.physics.add.sprite(150, 550, 'player').setScale(0.35);
        
        swing = this.physics.add.group();
        
        projectile = this.physics.add.sprite(1000, 550, 'attaque');
        projectile.body.setAllowGravity(false);
        //clavier
        keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up : Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            escape : Phaser.Input.Keyboard.KeyCodes.ESC
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
        this.physics.add.overlap(swing, projectile, renvoiProjectile, null, this);
        
        function hitOnPlayer(player, projectile){
            player.setTint(0xff0000);
        }
        
        function renvoiProjectile(swing, projectile){
            if (flipped == false){
                flipped = true;
                //setTimeout(function(){flipped = false}, 5000);
            }
        }
        player.setCollideWorldBounds();
        this.physics.world.setBounds(0, 0, 2000, 720);
        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, 2000, 720);
    }
    
    update(){
        if (flipped == false){
            projectile.setVelocityX(projectileSpeed);
        }
        else if (flipped == true){
            projectile.setVelocityX(projectileSpeed * (-2))
        }
        
        if(keys.right.isDown){
            player.setVelocityX(200);
        }
        if (keys.left.isDown){
            player.setVelocityX(-200);
        }
        if(keys.right.isUp && keys.left.isUp){
            player.setVelocityX(0);
        }
        if (keys.space.isDown && canSwing){
            canSwing = false;
            attaque(100,0);
            setTimeout(function(){canSwing = true}, 1000);
            setTimeout(function(){newSwing.destroy()}, 500);
        }
    }
}

function attaque(x, y){
    newSwing = swing.create(player.x + x, player.y + y, 'attaque');
    newSwing.body.setAllowGravity(false);
}