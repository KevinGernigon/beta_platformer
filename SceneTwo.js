var background_boss;
var boss;

var fouet_1;
var fouet_2;
var fouet_3;
var fouet_4;
var fouet_5;
var new_fouet_1;
var new_fouet_2;
var new_fouet_3;
var new_fouet_4;
var new_fouet_5;

var fireball;
var new_fireball;
var fireball_tiree = false;

var phase_1 = false;
var phase_2 = false;
var phase_3 = false;

var whiped = false;

var pv_boss = 10;

class SceneTwo extends Phaser.Scene{
    constructor(){
        super("sceneTwo");
        this.pad = null;
    }
    init(data){
    }
    preload(){
        this.load.image('fouet_1', 'assets/fouet_1.png');
        this.load.image('fouet_2', 'assets/fouet_2.png');
        this.load.image('fouet_3', 'assets/fouet_3.png');
        this.load.image('fouet_4', 'assets/fouet_4.png');
        this.load.image('fouet_5', 'assets/fouet_5.png');
        this.load.image('fireball', 'assets/fireball.png');
    }
    create(){
        
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
        
        this.physics.world.setBounds(0, 0, 896, 448);
        this.cameras.main.setBounds(0, 0, 896, 448);
        
        background_boss = this.add.image(448, 224, 'village_gobelin');
        
        boss = this.physics.add.sprite(750, 400, 'ennemy');
        player = this.physics.add.sprite(80, 300, 'player').setScale(0.3);
        player.setSize(250, 400);
        player.setOffset(190, 140);
        
        swing = this.physics.add.group();
        
        heart_full_1 = this.add.image(30, 40, 'heart_full').setScrollFactor(0);
        heart_empty_1 = this.add.image(30, 40, 'heart_empty').setVisible(false).setScrollFactor(0);
        
        heart_full_2 = this.add.image(60, 40, 'heart_full').setScrollFactor(0);
        heart_empty_2 = this.add.image(60, 40, 'heart_empty').setVisible(false).setScrollFactor(0);
        
        heart_full_3 = this.add.image(90, 40, 'heart_full').setScrollFactor(0);
        heart_empty_3 = this.add.image(90, 40, 'heart_empty').setVisible(false).setScrollFactor(0);
        
        heart_full_4 = this.add.image(120, 40, 'heart_full').setScrollFactor(0);
        heart_empty_4 = this.add.image(120, 40, 'heart_empty').setVisible(false).setScrollFactor(0);
        
        heart_full_5 = this.add.image(150, 40, 'heart_full').setScrollFactor(0);
        heart_empty_5 = this.add.image(150, 40, 'heart_empty').setVisible(false).setScrollFactor(0);
        
        inventaire_1 = this.add.image(40, 90, 'inventaire_1').setScrollFactor(0);
        inventaire_2 = this.add.image(40, 90, 'inventaire_2').setScrollFactor(0);
        inventaire_3 = this.add.image(40, 90, 'inventaire_3').setScrollFactor(0);
        
        flamme_1 = this.physics.add.group();
        flamme_2 = this.physics.add.group();
        flamme_3 = this.physics.add.group();
        flamme_4 = this.physics.add.group();
        flamme_5 = this.physics.add.group();
        flamme_6 = this.physics.add.group();
        
        fouet_1 = this.physics.add.group();
        fouet_2 = this.physics.add.group();
        fouet_3 = this.physics.add.group();
        fouet_4 = this.physics.add.group();
        fouet_5 = this.physics.add.group();
        
        fireball = this.physics.add.group();
        
        player.setCollideWorldBounds();
        boss.setCollideWorldBounds();
        
        this.physics.add.overlap(fireball, swing, renvoiFireball, null, this);
        this.physics.add.collider(player, fireball, hitFlamme, null, this);
        this.physics.add.collider(boss, fireball, hitFlammeBoss, null, this);
        this.physics.add.overlap(player, fouet_1, hitBossFouet_1, null, this);
        this.physics.add.overlap(player, fouet_2, hitBossFouet_2, null, this);
        this.physics.add.overlap(player, fouet_3, hitBossFouet_3, null, this);
        this.physics.add.overlap(player, fouet_4, hitBossFouet_4, null, this);
        this.physics.add.overlap(player, fouet_5, hitBossFouet_5, null, this);
        this.physics.add.overlap(player, flamme_1, hitBossFlamme_1, null, this);
        this.physics.add.overlap(player, flamme_2, hitBossFlamme_2, null, this);
        this.physics.add.overlap(player, flamme_3, hitBossFlamme_3, null, this);
        this.physics.add.overlap(player, flamme_4, hitBossFlamme_4, null, this);
        this.physics.add.overlap(player, flamme_5, hitBossFlamme_5, null, this);
        this.physics.add.overlap(player, boss, hitBoss, null, this);
        
        function renvoiFireball(fireball, swing){
            //if (flipped == false){
                //flipped = true;
                if (boss.x > player.x){
                    fireball.setVelocityX(projectileRightSpeed);
                }
                else if (boss.x < player.x){
                    fireball.setVelocityX(projectileLeftSpeed);
                }
                //setTimeout(function(){flipped = false}, 5000);
            //}
        }
        
        function hitFlamme(player, fireball){
            if (invincible == false && pv_player >= 0){
                invincible = true;
                pv_player -= 1;
                player.setAlpha(0);
                setTimeout(function(){player.setAlpha(1)}, 200);
                setTimeout(function(){player.setAlpha(0)}, 400);
                setTimeout(function(){player.setAlpha(1)}, 600);
                setTimeout(function(){player.setAlpha(0)}, 800);
                setTimeout(function(){player.setAlpha(1)}, 1000);
                setTimeout(function(){player.setAlpha(0)}, 1200);
                setTimeout(function(){player.setAlpha(1)}, 1400);
                setTimeout(function(){player.setAlpha(0)}, 1600);
                setTimeout(function(){player.setAlpha(1)}, 1800);
                setTimeout(function(){invincible = false}, 2400);
            }
            fireball.destroy();
        }
        function hitFlammeBoss(boss, fireball){
            if (pv_boss >= 0){
                pv_boss -= 1;
                boss.setAlpha(0);
                setTimeout(function(){boss.setAlpha(1)}, 200);
                setTimeout(function(){boss.setAlpha(0)}, 400);
                setTimeout(function(){boss.setAlpha(1)}, 600);
                setTimeout(function(){boss.setAlpha(0)}, 800);
                setTimeout(function(){boss.setAlpha(1)}, 1000);
                setTimeout(function(){boss.setAlpha(0)}, 1200);
                setTimeout(function(){boss.setAlpha(1)}, 1400);
                setTimeout(function(){boss.setAlpha(0)}, 1600);
                setTimeout(function(){boss.setAlpha(1)}, 1800);
            }
            fireball.destroy();
        }
        function hitBossFouet_1(player, fouet_1){
            if (invincible == false && pv_player >= 0){
                invincible = true;
                pv_player -= 1;
                player.setAlpha(0);
                setTimeout(function(){player.setAlpha(1)}, 200);
                setTimeout(function(){player.setAlpha(0)}, 400);
                setTimeout(function(){player.setAlpha(1)}, 600);
                setTimeout(function(){player.setAlpha(0)}, 800);
                setTimeout(function(){player.setAlpha(1)}, 1000);
                setTimeout(function(){player.setAlpha(0)}, 1200);
                setTimeout(function(){player.setAlpha(1)}, 1400);
                setTimeout(function(){player.setAlpha(0)}, 1600);
                setTimeout(function(){player.setAlpha(1)}, 1800);
                setTimeout(function(){invincible = false}, 2400);
            }
        }
        function hitBossFouet_2(player, fouet_2){
            if (invincible == false && pv_player >= 0){
                invincible = true;
                pv_player -= 1;
                player.setAlpha(0);
                setTimeout(function(){player.setAlpha(1)}, 200);
                setTimeout(function(){player.setAlpha(0)}, 400);
                setTimeout(function(){player.setAlpha(1)}, 600);
                setTimeout(function(){player.setAlpha(0)}, 800);
                setTimeout(function(){player.setAlpha(1)}, 1000);
                setTimeout(function(){player.setAlpha(0)}, 1200);
                setTimeout(function(){player.setAlpha(1)}, 1400);
                setTimeout(function(){player.setAlpha(0)}, 1600);
                setTimeout(function(){player.setAlpha(1)}, 1800);
                setTimeout(function(){invincible = false}, 2400);
            }
        }
        function hitBossFouet_3(player, fouet_3){
            if (invincible == false && pv_player >= 0){
                invincible = true;
                pv_player -= 1;
                player.setAlpha(0);
                setTimeout(function(){player.setAlpha(1)}, 200);
                setTimeout(function(){player.setAlpha(0)}, 400);
                setTimeout(function(){player.setAlpha(1)}, 600);
                setTimeout(function(){player.setAlpha(0)}, 800);
                setTimeout(function(){player.setAlpha(1)}, 1000);
                setTimeout(function(){player.setAlpha(0)}, 1200);
                setTimeout(function(){player.setAlpha(1)}, 1400);
                setTimeout(function(){player.setAlpha(0)}, 1600);
                setTimeout(function(){player.setAlpha(1)}, 1800);
                setTimeout(function(){invincible = false}, 2400);
            }
        }
        function hitBossFouet_4(player, fouet_4){
            if (invincible == false && pv_player >= 0){
                invincible = true;
                pv_player -= 1;
                player.setAlpha(0);
                setTimeout(function(){player.setAlpha(1)}, 200);
                setTimeout(function(){player.setAlpha(0)}, 400);
                setTimeout(function(){player.setAlpha(1)}, 600);
                setTimeout(function(){player.setAlpha(0)}, 800);
                setTimeout(function(){player.setAlpha(1)}, 1000);
                setTimeout(function(){player.setAlpha(0)}, 1200);
                setTimeout(function(){player.setAlpha(1)}, 1400);
                setTimeout(function(){player.setAlpha(0)}, 1600);
                setTimeout(function(){player.setAlpha(1)}, 1800);
                setTimeout(function(){invincible = false}, 2400);
            }
        }
        function hitBossFouet_5(player, fouet_5){
            if (invincible == false && pv_player >= 0){
                invincible = true;
                pv_player -= 1;
                player.setAlpha(0);
                setTimeout(function(){player.setAlpha(1)}, 200);
                setTimeout(function(){player.setAlpha(0)}, 400);
                setTimeout(function(){player.setAlpha(1)}, 600);
                setTimeout(function(){player.setAlpha(0)}, 800);
                setTimeout(function(){player.setAlpha(1)}, 1000);
                setTimeout(function(){player.setAlpha(0)}, 1200);
                setTimeout(function(){player.setAlpha(1)}, 1400);
                setTimeout(function(){player.setAlpha(0)}, 1600);
                setTimeout(function(){player.setAlpha(1)}, 1800);
                setTimeout(function(){invincible = false}, 2400);
            }
        }
        function hitBossFlamme_1(player, flamme_1){
            if (invincible == false && pv_player >= 0){
                invincible = true;
                pv_player -= 1;
                player.setAlpha(0);
                setTimeout(function(){player.setAlpha(1)}, 200);
                setTimeout(function(){player.setAlpha(0)}, 400);
                setTimeout(function(){player.setAlpha(1)}, 600);
                setTimeout(function(){player.setAlpha(0)}, 800);
                setTimeout(function(){player.setAlpha(1)}, 1000);
                setTimeout(function(){player.setAlpha(0)}, 1200);
                setTimeout(function(){player.setAlpha(1)}, 1400);
                setTimeout(function(){player.setAlpha(0)}, 1600);
                setTimeout(function(){player.setAlpha(1)}, 1800);
                setTimeout(function(){invincible = false}, 2400);
            }
        }
        function hitBossFlamme_2(player, flamme_2){
            if (invincible == false && pv_player >= 0){
                invincible = true;
                pv_player -= 1;
                player.setAlpha(0);
                setTimeout(function(){player.setAlpha(1)}, 200);
                setTimeout(function(){player.setAlpha(0)}, 400);
                setTimeout(function(){player.setAlpha(1)}, 600);
                setTimeout(function(){player.setAlpha(0)}, 800);
                setTimeout(function(){player.setAlpha(1)}, 1000);
                setTimeout(function(){player.setAlpha(0)}, 1200);
                setTimeout(function(){player.setAlpha(1)}, 1400);
                setTimeout(function(){player.setAlpha(0)}, 1600);
                setTimeout(function(){player.setAlpha(1)}, 1800);
                setTimeout(function(){invincible = false}, 2400);
            }
        }
        function hitBossFlamme_3(player, flamme_3){
            if (invincible == false && pv_player >= 0){
                invincible = true;
                pv_player -= 1;
                player.setAlpha(0);
                setTimeout(function(){player.setAlpha(1)}, 200);
                setTimeout(function(){player.setAlpha(0)}, 400);
                setTimeout(function(){player.setAlpha(1)}, 600);
                setTimeout(function(){player.setAlpha(0)}, 800);
                setTimeout(function(){player.setAlpha(1)}, 1000);
                setTimeout(function(){player.setAlpha(0)}, 1200);
                setTimeout(function(){player.setAlpha(1)}, 1400);
                setTimeout(function(){player.setAlpha(0)}, 1600);
                setTimeout(function(){player.setAlpha(1)}, 1800);
                setTimeout(function(){invincible = false}, 2400);
            }
        }
        function hitBossFlamme_4(player, flamme_4){
            if (invincible == false && pv_player >= 0){
                invincible = true;
                pv_player -= 1;
                player.setAlpha(0);
                setTimeout(function(){player.setAlpha(1)}, 200);
                setTimeout(function(){player.setAlpha(0)}, 400);
                setTimeout(function(){player.setAlpha(1)}, 600);
                setTimeout(function(){player.setAlpha(0)}, 800);
                setTimeout(function(){player.setAlpha(1)}, 1000);
                setTimeout(function(){player.setAlpha(0)}, 1200);
                setTimeout(function(){player.setAlpha(1)}, 1400);
                setTimeout(function(){player.setAlpha(0)}, 1600);
                setTimeout(function(){player.setAlpha(1)}, 1800);
                setTimeout(function(){invincible = false}, 2400);
            }
        }
        function hitBossFlamme_5(player, flamme_5){
            if (invincible == false && pv_player >= 0){
                invincible = true;
                pv_player -= 1;
                player.setAlpha(0);
                setTimeout(function(){player.setAlpha(1)}, 200);
                setTimeout(function(){player.setAlpha(0)}, 400);
                setTimeout(function(){player.setAlpha(1)}, 600);
                setTimeout(function(){player.setAlpha(0)}, 800);
                setTimeout(function(){player.setAlpha(1)}, 1000);
                setTimeout(function(){player.setAlpha(0)}, 1200);
                setTimeout(function(){player.setAlpha(1)}, 1400);
                setTimeout(function(){player.setAlpha(0)}, 1600);
                setTimeout(function(){player.setAlpha(1)}, 1800);
                setTimeout(function(){invincible = false}, 2400);
            }
        }
        function hitBoss(player, boss){
            if (invincible == false && pv_player >= 0){
                invincible = true;
                pv_player -= 1;
                player.setAlpha(0);
                setTimeout(function(){player.setAlpha(1)}, 200);
                setTimeout(function(){player.setAlpha(0)}, 400);
                setTimeout(function(){player.setAlpha(1)}, 600);
                setTimeout(function(){player.setAlpha(0)}, 800);
                setTimeout(function(){player.setAlpha(1)}, 1000);
                setTimeout(function(){player.setAlpha(0)}, 1200);
                setTimeout(function(){player.setAlpha(1)}, 1400);
                setTimeout(function(){player.setAlpha(0)}, 1600);
                setTimeout(function(){player.setAlpha(1)}, 1800);
                setTimeout(function(){invincible = false}, 2400);
            }
        }
    }
    update(){
        
        if (phase_1 == true && phase_2 == false && phase_3 == false && fireball_tiree == false){
            fireball_tiree = true
            new_fireball = fireball.create(boss.x - 250, boss.y + 100, 'fireball');
            new_fireball.setVelocityX(-150);
            new_fireball.body.setAllowGravity(false);
            setTimeout(function(){
                fireball_tiree = false;
            }, 3000);
        }
        /*if (whiped == false){
            whiped = true;
            whipAttack();
            setTimeout(function(){
                whiped = false;
            }, 2000);
        }*/
        
        if(pv_player == 5){
            heart_full_1.setVisible(true);
            heart_full_2.setVisible(true);
            heart_full_3.setVisible(true);
            heart_full_4.setVisible(true);
            heart_full_5.setVisible(true);
            
            heart_empty_1.setVisible(false);
            heart_empty_2.setVisible(false);
            heart_empty_3.setVisible(false);
            heart_empty_4.setVisible(false);
            heart_empty_4.setVisible(false);
        }
        if(pv_player == 4){
            heart_full_1.setVisible(true);
            heart_full_2.setVisible(true);
            heart_full_3.setVisible(true);
            heart_full_4.setVisible(true);
            heart_full_5.setVisible(false);
            
            heart_empty_1.setVisible(false);
            heart_empty_2.setVisible(false);
            heart_empty_3.setVisible(false);
            heart_empty_4.setVisible(false);
            heart_empty_5.setVisible(true);
        }
        if(pv_player == 3){
            heart_full_1.setVisible(true);
            heart_full_2.setVisible(true);
            heart_full_3.setVisible(true);
            heart_full_4.setVisible(false);
            heart_full_5.setVisible(false);
            
            heart_empty_1.setVisible(false);
            heart_empty_2.setVisible(false);
            heart_empty_3.setVisible(false);
            heart_empty_4.setVisible(true);
            heart_empty_5.setVisible(true);
        }
        if(pv_player == 2){
            heart_full_1.setVisible(true);
            heart_full_2.setVisible(true);
            heart_full_3.setVisible(false);
            heart_full_4.setVisible(false);
            heart_full_5.setVisible(false);
            
            heart_empty_1.setVisible(false);
            heart_empty_2.setVisible(false);
            heart_empty_3.setVisible(true);
            heart_empty_4.setVisible(true);
            heart_empty_5.setVisible(true);
        }
        if(pv_player == 1){
            heart_full_1.setVisible(true);
            heart_full_2.setVisible(false);
            heart_full_3.setVisible(false);
            heart_full_4.setVisible(false);
            heart_full_5.setVisible(false);
            
            heart_empty_1.setVisible(false);
            heart_empty_2.setVisible(true);
            heart_empty_3.setVisible(true);
            heart_empty_4.setVisible(true);
            heart_empty_5.setVisible(true);
        }
        if(pv_player <= 0){
            heart_full_1.setVisible(false);
            heart_full_2.setVisible(false);
            heart_full_3.setVisible(false);
            heart_full_4.setVisible(false);
            heart_full_5.setVisible(false);
            
            heart_empty_1.setVisible(true);
            heart_empty_2.setVisible(true);
            heart_empty_3.setVisible(true);
            heart_empty_4.setVisible(true);
            heart_empty_5.setVisible(true);
            
            this.physics.pause();
        }
        
        if (poids_inventaire <= 3){
            inventaire_1.setVisible(true);
            inventaire_2.setVisible(false);
            inventaire_3.setVisible(false);
        }
        if (poids_inventaire <= 7 && poids_inventaire > 3){
            inventaire_1.setVisible(false);
            inventaire_2.setVisible(true);
            inventaire_3.setVisible(false);
        }
        if (poids_inventaire > 7){
            inventaire_1.setVisible(false);
            inventaire_2.setVisible(false);
            inventaire_3.setVisible(true);
        }
        if (keys.up.isDown && notJumping == true){
            notJumping = false;
            player.setVelocityY(-250);
        }
        
        if (player.body.onFloor()){
            notJumping = true;
        }
        
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
        else if (keys.space.isDown && keys.kright.isDown && canSwing && notJumping){
            player.anims.play('baseball_right', true);
            player.setVelocityX(0);
            canSwing = false;
            attaque(100,0);
            setTimeout(function(){canSwing = true}, 1500);
            setTimeout(function(){newSwing.destroy()}, 1500);
        }
        else if (keys.space.isDown && keys.kleft.isDown && canSwing && notJumping){
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
    }
}

/*function attaque(x, y){
    setTimeout(function(){
    newSwing = swing.create(player.x + x, player.y + y, 'attaque');
    newSwing.body.setAllowGravity(false);
    }, 4000);
}*/

function fireAttack(){
    new_flamme1 = flamme_1.create(600, 350, 'flamme_1');
    new_flamme1.body.setAllowGravity(false);
    setTimeout(function(){
        new_flamme1.destroy();
        new_flamme2 = flamme_2.create(600, 350, 'flamme_2');
        new_flamme2.body.setAllowGravity(false);
    }, 200);
    setTimeout(function(){
        new_flamme2.destroy();
        new_flamme3 = flamme_3.create(600, 350, 'flamme_3');
        new_flamme3.body.setAllowGravity(false);
    }, 400);
    setTimeout(function(){
        new_flamme3.destroy();
        new_flamme4 = flamme_4.create(600, 350, 'flamme_4');
        new_flamme4.body.setAllowGravity(false);
    }, 600);
    setTimeout(function(){
        new_flamme4.destroy();
        new_flamme5 = flamme_5.create(600, 350, 'flamme_5');
        new_flamme5.body.setAllowGravity(false);
    }, 800);
    setTimeout(function(){
        new_flamme5.destroy();
        new_flamme6 = flamme_6.create(600, 350, 'flamme_6');
        new_flamme6.body.setAllowGravity(false);
    }, 1000);
    setTimeout(function(){
        new_flamme6.destroy();
    }, 1200);
}

function whipAttack(){
    new_fouet_1 = fouet_1.create(580, 30, 'fouet_1');
    new_fouet_1.setScale(0.7);
    new_fouet_1.body.setAllowGravity(false);
    setTimeout(function(){
        new_fouet_1.destroy();
        new_fouet_2 = fouet_2.create(600, 30, 'fouet_2');
        new_fouet_2.setScale(0.7);
        new_fouet_2.body.setAllowGravity(false);
    }, 200);
    setTimeout(function(){
        new_fouet_2.destroy();
        new_fouet_3 = fouet_3.create(500, 100, 'fouet_3');
        new_fouet_3.setScale(0.7);
        new_fouet_3.body.setAllowGravity(false);
    }, 400);
    setTimeout(function(){
        new_fouet_3.destroy();
        new_fouet_4 = fouet_4.create(400, 200, 'fouet_4');
        new_fouet_4.setScale(0.7);
        new_fouet_4.body.setAllowGravity(false);
    }, 600);
    setTimeout(function(){
        new_fouet_4.destroy();
        new_fouet_5 = fouet_5.create(350, 400, 'fouet_5');
        new_fouet_5.setScale(0.7);
        new_fouet_5.body.setAllowGravity(false);
    }, 800);
    setTimeout(function(){
        new_fouet_5.destroy();
    }, 1000);
}