var ecran_controles;
var ecran_credits;

var surOptions = false;
var surCredits = false;

var bouton_controles;
var bouton_quitter;

class EcranTitre extends Phaser.Scene{
    constructor(){
        super("ecranTitre");
        this.pad = null;
    }
    init(data){
    }
    preload(){   
        this.load.image('fond_ecran_titre', 'assets/fond_ecran_titre.jpg');
        /*this.load.image('play_button', 'assets/jouer.png');
        this.load.image('bouton_controles', 'assets/controles.png');
        this.load.image('bouton_controles_over', 'assets/controles_on.png');
        this.load.image('bouton_jouer_over', 'assets/jouer_on.png');*/
        this.load.spritesheet('bouton_jouer', 'assets/spritesheets/bouton_jouer.png',{frameWidth: 189, frameHeight: 81});
        this.load.spritesheet('bouton_controles', 'assets/spritesheets/bouton_controles.png',{frameWidth: 253, frameHeight: 67});
        this.load.spritesheet('bouton_quitter', 'assets/spritesheets/bouton_quitter.png',{frameWidth: 80, frameHeight: 80});
        
        this.load.image('ecran_controles', 'assets/ecran_options.png');
    }
    create(){
        
        keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up : Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            escape : Phaser.Input.Keyboard.KeyCodes.ESC
        });
        
        this.add.sprite(448, 224, 'fond_ecran_titre');
        var button_play = this.add.sprite(440, 121, 'bouton_jouer').setInteractive();
        var bouton_controles = this.add.sprite(452, 335, 'bouton_controles').setInteractive();
        //var button_credits = this.add.sprite(458, 460, 'credits_button').setInteractive();
        //var button_options = this.add.sprite(758, 460, 'options_button').setInteractive();
        
        button_play.on('pointerover', function(){
            button_play.anims.play('bouton_jouer_over', true);
        });
        button_play.on('pointerout', function(){
            button_play.anims.play('bouton_jouer_out', true);
        });
        
        button_play.on('pointerdown', function(){
            if (surCredits == false && surOptions == false){
                this.scene.start("sceneOne");
            }
        }, this);
        
        bouton_controles.on('pointerover', function(){
            bouton_controles.anims.play('bouton_controles_over', true);
        });
        bouton_controles.on('pointerout', function(){
            bouton_controles.anims.play('bouton_controles_out', true);
        });
        
        bouton_controles.on('pointerdown', function(){
            surOptions = true;
            ecran_controles.setVisible(true);
            bouton_quitter.setVisible(true);
        });
        
       

        /*button_options.on('pointerdown', function(){
            ecran_controles.setVisible(true);
            surOptions = true;
        });

        button_credits.on('pointerdown', function(){
            ecran_credits.setVisible(true);
            surCredits = true;
        })*/
        this.anims.create({
            key: 'bouton_jouer_over',
            frames: this.anims.generateFrameNumbers('bouton_jouer', {start: 1, end: 1}),
            repeat: -1
        });
        this.anims.create({
            key: 'bouton_jouer_out',
            frames: this.anims.generateFrameNumbers('bouton_jouer', {start: 0, end: 0}),
            repeat: -1
        });
        
        this.anims.create({
            key: 'bouton_controles_over',
            frames: this.anims.generateFrameNumbers('bouton_controles', {start: 1, end: 1}),
            repeat: -1
        });
        this.anims.create({
            key: 'bouton_controles_out',
            frames: this.anims.generateFrameNumbers('bouton_controles', {start: 0, end: 0}),
            repeat: -1
        });
        
        this.anims.create({
            key: 'bouton_quitter_over',
            frames: this.anims.generateFrameNumbers('bouton_quitter', {start: 1, end: 1}),
            repeat: -1
        });
        this.anims.create({
            key: 'bouton_quitter_out',
            frames: this.anims.generateFrameNumbers('bouton_quitter', {start: 0, end: 0}),
            repeat: -1
        });
        
        //ecran_credits = this.add.sprite(608, 384, 'credits').setVisible(false);
        ecran_controles = this.add.sprite(448, 224, 'ecran_controles').setVisible(false);
        var bouton_quitter = this.add.sprite(40, 40, 'bouton_quitter').setInteractive().setVisible(false);
        
         bouton_quitter.on('pointerover', function(){
            bouton_quitter.anims.play('bouton_quitter_over', true);
        });
        bouton_quitter.on('pointerout', function(){
            bouton_quitter.anims.play('bouton_quitter_out', true);
        });
        
        bouton_quitter.on('pointerdown', function(){
            surOptions = false;
            ecran_controles.setVisible(false);
            bouton_quitter.setVisible(false);
        });
    }
    update(){
        /*if (keys.escape.isDown){
            ecran_controles.setVisible(false);
            ecran_credits.setVisible(false);
            surOptions = false;
            surCredits = false;
        }*/
    }
}