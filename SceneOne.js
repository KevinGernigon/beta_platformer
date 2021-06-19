var player;

var notJumping = true;

var ennemy; 
var ennemyATire = false;
var leopard;
var pv_leopard = 2;
var leopard_invincible = false;
var leopard_mort = false;

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
var degats_swing = 1;

var projectile;
var newProjectile;
var tirEnJeu = false;
var tirToDestroy;
var projectileLeftSpeed = -150;
var projectileRightSpeed = 150;
var flipped = false;

var invincible = false;
var pv_player = 5;
var heart_full_1;
var heart_full_2;
var heart_full_3;
var heart_full_4;
var heart_full_5;
var heart_empty_1;
var heart_empty_2;
var heart_empty_3;
var heart_empty_4;
var heart_empty_5;
var poids_inventaire = 0;
var inventaire_1;
var inventaire_2;
var inventaire_3;

var bd_1;

//var combo_1 = false;
//var combo_2 = false;

//flameAttack//
var flamme_1;
var flamme_2;
var flamme_3;
var flamme_4;
var flamme_5;
var flamme_6;
var new_flamme1;
var new_flamme2;
var new_flamme3;
var new_flamme4;
var new_flamme5;
var new_flamme6;
var fireAttackUsed = false;

var gameStarted = false;

//loot//
var loot_branche_1;
var loot_caillou_1;
var loot_branche_2;
var loot_caillou_2;
var loot_branche_3;
var loot_caillou_3;
var loot_branche_4;
var loot_caillou_4;
var loot_branche_5;
var loot_caillou_5;
var loot_heart;
var new_heart;

var message_fin_foret;
var message_jouer = false;
var message_jouer_present = false;

var fond_gris;
var menu_choix_fin;
var bouton_oui;
var bouton_non;
var choix_effectue = false;
var en_pause = false;

class SceneOne extends Phaser.Scene{
    constructor(){
        super("sceneOne");
        this.pad = null;
    }
    init(data){
    }
    preload(){
        this.load.image('bd_1', 'assets/spritesheets/bd_1.png');
        
        this.load.image('arbres_front', 'assets/foreground.png');
        this.load.image('arbres_mid', 'assets/midfront.png');
        this.load.image('arbres_back', 'assets/background_arbres.png');
        this.load.image('background', 'assets/background.jpg');
        this.load.image('fin_foret', 'assets/decor_1_fin.png');
        this.load.image('arbres_front_fin', 'assets/foreground_fin.png');
        this.load.image('arbres_mid_fin', 'assets/midfront_fin.png');
        this.load.image('arbres_back_fin', 'assets/background_arbres_fin.png');
        this.load.image('background_fin', 'assets/background_foret_fin.png');
        this.load.image('rouge_fin', 'assets/rouge_fin.png');
        
        this.load.image('village_gobelin', 'assets/village_gobelin.png');
        
        //this.load.image('player', 'assets/player_placeholdere.png');
        this.load.spritesheet('player', 'assets/spritesheets/spritesheet_joueur.png', {frameWidth: 524,frameHeight: 552});
        this.load.spritesheet('leopard', 'assets/spritesheets/spritesheet_leopard.png', {frameWidth: 472, frameHeight: 223});
        
        this.load.image('attaque', 'assets/tile_green.jpg');
        
        this.load.image('ennemy', 'assets/rakshaja.png');
        
        //flammes fireAttack//
        this.load.image('flamme_1', 'assets/flamme_1.png');
        this.load.image('flamme_2', 'assets/flamme_2.png');
        this.load.image('flamme_3', 'assets/flamme_3.png');
        this.load.image('flamme_4', 'assets/flamme_4.png');
        this.load.image('flamme_5', 'assets/flamme_5.png');
        this.load.image('flamme_6', 'assets/flamme_6.png');
        
        //hud//
        this.load.image('heart_full', 'assets/heart_full.png');
        this.load.image('heart_empty', 'assets/heart_empty.png');
        this.load.image('inventaire_1', 'assets/inventaire_1.png');
        this.load.image('inventaire_2', 'assets/inventaire_2.png');
        this.load.image('inventaire_3', 'assets/inventaire_3.png');
        
        //ennemis//
        this.load.spritesheet('ennemi_arbre', 'assets/spritesheets/spritesheet_ennemi_arbre.png',{frameWidth: 214, frameHeight: 270});
        this.load.spritesheet('ennemi_serpent', 'assets/spritesheets/spritesheet_serpent.png',{frameWidth: 127, frameHeight: 137});
        
        //loot//
        this.load.spritesheet('loot_branche', 'assets/spritesheets/spritesheet_branche.png', {frameWidth: 19, frameHeight: 22});
        this.load.spritesheet('loot_caillou', 'assets/spritesheets/spritesheet_caillou.png', {frameWidth: 16, frameHeight: 13});
        
        //bulle message//
        this.load.image('message_fin_foret', 'assets/message_fin_foret.png');
        
        //menu choix fin foret//
        this.load.image('fond_gris', 'assets/fond_gris.png');
        this.load.image('bouton_oui', 'assets/bouton_oui.png');
        this.load.image('bouton_non', 'assets/bouton_non.png');
        this.load.image('menu_choix_fin', 'assets/menu_choix_fin.png');

    }
    create(){
            
        
        
        
        this.add.image(448, 224, 'background').setScrollFactor(0.3); 
        this.add.image(1344, 224, 'background').setScrollFactor(0.3);
        this.add.image(2240, 224, 'background').setScrollFactor(0.3);
        this.add.image(3136, 224, 'background').setScrollFactor(0.3);
        
        this.add.image(448, 224, 'arbres_back').setScrollFactor(0.3);   
        this.add.image(1344, 224, 'arbres_back').setScrollFactor(0.3); 
        this.add.image(2240, 224, 'arbres_back').setScrollFactor(0.3); 
        this.add.image(3136, 224, 'arbres_back').setScrollFactor(0.3); 
        
        
        this.add.image(448, 224, 'arbres_mid').setScrollFactor(0.6);
        this.add.image(1344, 224, 'arbres_mid').setScrollFactor(0.6);
        this.add.image(2240, 224, 'arbres_mid').setScrollFactor(0.6);
        this.add.image(3136, 224, 'arbres_mid').setScrollFactor(0.6);
        
        
        this.add.image(448, 224, 'arbres_front').setScrollFactor(0.9); 
        this.add.image(1344, 224, 'arbres_front').setScrollFactor(0.9); 
        this.add.image(2240, 224, 'arbres_front').setScrollFactor(0.9); 
        this.add.image(3136, 224, 'arbres_front').setScrollFactor(0.9); 
        
        this.add.image(3492, 224, 'rouge_fin');
        
        //this.add.image(3136, 224, 'fin_foret');
        
        //this.add.image(4388, 224, 'village_gobelin');
        
        loot_heart = this.physics.add.group();
        
        player = this.physics.add.sprite(100, 300, 'player').setScale(0.35);
        player.setSize(250, 400);
        player.setOffset(190, 140);
        
        leopard = this.physics.add.sprite(1000, 300, 'leopard').setScale(0.4);
        
        //ennemy = this.physics.add.sprite(3450, 400, 'ennemy');
        
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
        this.physics.add.overlap(leopard, swing, killLeopard, null, this);
        this.physics.add.overlap(player, leopard, perdPv, null, this);
        this.physics.add.overlap(player, loot_heart, restaurePV, null, this);
        
        function restaurePV(player, loot_heart){
            loot_heart.destroy();
            pv_player += 1;
        }
        
        function perdPv(player, leopard){
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
        
        function killLeopard(leopard, swing){
             if(!leopard_invincible){
                leopard_invincible = true;
                pv_leopard -= degats_swing;
                leopard.setAlpha(0);
                setTimeout(function(){leopard.setAlpha(1)}, 200);
                setTimeout(function(){leopard.setAlpha(0)}, 400);
                setTimeout(function(){leopard.setAlpha(1)}, 600);
                setTimeout(function(){leopard.setAlpha(0)}, 800);
                setTimeout(function(){leopard.setAlpha(1)}, 1000);
                setTimeout(function(){leopard.setAlpha(0)}, 1200);
                setTimeout(function(){leopard.setAlpha(1)}, 1400);
                setTimeout(function(){leopard.setAlpha(0)}, 1600);
                setTimeout(function(){leopard.setAlpha(1)}, 1800);
                setTimeout(function(){leopard_invincible = false}, 2400);
            }
            if (pv_leopard <= 0){
                leopard_mort = true;
                leopard.destroy();
                new_heart = loot_heart.create(leopard.x, leopard.y + 10, 'heart_full');
                new_heart.body.setAllowGravity(false);
            }
        }
        
        
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
        
        flamme_1 = this.physics.add.group();
        flamme_2 = this.physics.add.group();
        flamme_3 = this.physics.add.group();
        flamme_4 = this.physics.add.group();
        flamme_5 = this.physics.add.group();
        flamme_6 = this.physics.add.group();
        
        player.setCollideWorldBounds();
        //ennemy.setCollideWorldBounds();
        leopard.setCollideWorldBounds();
        this.physics.world.setBounds(0, 0, 3940, 448);
        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, 3940, 448);
        
        
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
            frameRate: 10,
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
            frameRate: 10,
            repeat: 0
        });
        
        this.anims.create({
            key: 'leopard_left',
            frames: this.anims.generateFrameNumbers('leopard', {start: 0, end: 5}),
            frameRate: 6,
            repeat: -1
        });
        
        this.anims.create({
            key: 'leopard_right',
            frames: this.anims.generateFrameNumbers('leopard', {start: 6, end: 11}),
            frameRate: 6,
            repeat: -1
        });
        
        this.anims.create({
            key: 'leopard_idle_right',
            frames: this.anims.generateFrameNumbers('leopard', {start: 0, end: 0}),
            repeat: -1
        });
        
        this.anims.create({
            key: 'leopard_idle_left',
            frames: this.anims.generateFrameNumbers('leopard', {start: 6, end: 6}),
            repeat: -1
        });
        
        //loot//
        this.anims.create({
            key: 'branche_out',
            frames: this.anims.generateFrameNumbers('loot_branche', {start: 0, end: 0}),
            repeat: -1
        });
        this.anims.create({
            key: 'branche_on',
            frames: this.anims.generateFrameNumbers('loot_branche', {start: 1, end: 1}),
            repeat: -1
        });
        this.anims.create({
            key: 'caillou_out',
            frames: this.anims.generateFrameNumbers('loot_caillou', {start: 1, end: 1}),
            repeat: -1
        });
        this.anims.create({
            key: 'caillou_on',
            frames: this.anims.generateFrameNumbers('loot_caillou', {start: 0, end: 0}),
            repeat: -1
        });
        
        loot_branche_1 = this.add.sprite(400, 400, 'loot_branche').setInteractive();
        loot_branche_1.on('pointerover', function(){
            loot_branche_1.anims.play('branche_on', true);
        });
        loot_branche_1.on('pointerout', function(){
            loot_branche_1.anims.play('branche_out', true);
        });
        loot_branche_1.on('pointerdown', function(){
            loot_branche_1.destroy();
            poids_inventaire += 1;
            degats_swing += 1;
        })
    
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
        
        message_fin_foret = this.physics.add.sprite(3200, 300, 'message_fin_foret').setVisible(false);
        message_fin_foret.body.setAllowGravity(false);
        
        fond_gris = this.add.image(3492, 224, 'fond_gris').setVisible(false);
        menu_choix_fin = this.add.image(3540, 121, 'menu_choix_fin').setVisible(false);
        bouton_oui = this.add.image(3400, 350, 'bouton_oui').setVisible(false).setInteractive();
        bouton_non = this.add.image(3700, 350, 'bouton_non').setVisible(false).setInteractive();
        
        bouton_oui.on('pointerdown', function(){
            choix_effectue = true;
            menu_choix_fin.setVisible(false);
            bouton_oui.setVisible(false);
            bouton_non.setVisible(false);
            fond_gris.setVisible(false);
            this.scene.start('sceneTwo');
        }, this);
        bouton_non.on('pointerdown', function(){
            choix_effectue = true;
            menu_choix_fin.setVisible(false);
            bouton_oui.setVisible(false);
            bouton_non.setVisible(false);
            fond_gris.setVisible(false);
        });
        
        bd_1 = this.add.image(448, 224, 'bd_1').setInteractive();
        
        bd_1.on('pointerdown', function(){
            bd_1.destroy();
            gameStarted = true;
        });
}
    update(){
        
        if(player.x >= 3840 && choix_effectue == false){
            en_pause = true;
            //this.physics.pause();
            //console.log('menu_fin');
            fond_gris.setVisible(true);
            menu_choix_fin.setVisible(true);
            bouton_oui.setVisible(true);
            bouton_non.setVisible(true);
        }
        
        if (player.x < 3800 && choix_effectue == true){
            choix_effectue = false;
        }
        
        if(message_jouer == false && player.x >= 3075){
            message_jouer = true;
            message_jouer_present = true;
            message_fin_foret.setVisible(true);
            //message_fin_foret.setScrollFactor(1);
        }
        if (message_jouer == true && message_jouer_present == true){
            message_fin_foret.setVelocityX(player.body.velocity.x);
            setTimeout(function(){
                message_jouer_present = false;
                message_fin_foret.destroy();
            }, 5000);
        }
        
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
        
        if(gameStarted == false){
            this.physics.pause();
        }
        else {
            this.physics.resume();
        }
    
        
        
        if (fireAttackUsed == false){
            fireAttackUsed = true;
            fireAttack();
        }
        
        if (pv_player <= 0){
            player.setTint(0xff0000);
            this.physics.pause();
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
        
        
        if (leopard_mort == false){
            if (leopard.x >= 1500){
                leopard.anims.play('leopard_idle_left', true);
                leopard.setVelocityX(0);
            }
            /*else if (leopard.x <= 500){
                leopard.anims.play('leopard_idle_right', true);
                leopard.setVelocityX(0);
            }*/
            else if (leopard.x - player.x <= 600 && leopard.x - player.x >= 150){
                leopard.setVelocityX(-200);
                leopard.anims.play('leopard_left', true);
            }

            else if (player.x - leopard.x <= 600 && player.x - leopard.x >= 150){
                leopard.setVelocityX(200);
                leopard.anims.play('leopard_right', true);
            }
            else {
                leopard.setVelocityX(0);
            }
        }
        /*if (leopard.body.velocity.x == 0 && leopard.x - player.x > 0){
            leopard.anims.play('leopard_idle_right');
        }
        else if (leopard.body.velocity.x == 0 && player.x - leopard.x > 0){
            leopard.anims.play('leopard_idle_left');
        }*/
            
    }
}

function attaque(x, y){
    setTimeout(function(){
    newSwing = swing.create(player.x + x, player.y + y, 'attaque');
    newSwing.body.setAllowGravity(false);
    }, 500);
}

function tirEnnemi(x, y, velocity){
    newProjectile = projectile.create(ennemy.x + x, ennemy.y + y, 'attaque');
    newProjectile.body.setAllowGravity(false);
    newProjectile.setVelocityX(velocity);
    setTimeout(function(){tirToDestroy = projectile.getFirstAlive(false)}, 7000);
    setTimeout(function(){tirToDestroy.destroy()}, 7000);
    tirEnJeu = true;
}

/*function fireAttack(){
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
}*/