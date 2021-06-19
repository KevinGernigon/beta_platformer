var background_boss;
var boss;

class SceneTwo extends Phaser.Scene{
    constructor(){
        super("sceneTwo");
        this.pad = null;
    }
    init(data){
    }
    preload(){
        
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
        
        player.setCollideWorldBounds();
        boss.setCollideWorldBounds();
    }
    update(){
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

function attaque(x, y){
    setTimeout(function(){
    newSwing = swing.create(player.x + x, player.y + y, 'attaque');
    newSwing.body.setAllowGravity(false);
    }, 1000);
}

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