class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {




    }

    create() {

        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller()

        var mediaManager = new MediaManager({ scene: this })


        var sb = new SoundButtons({ scene: this })



        this.player = this.add.sprite(game.config.width / 2, game.config.height - 100, 'player')
        this.player.setOrigin(0.5, 0.5)
        Align.scaleToGameW(this.player, 0.08)

        this.bullet = this.add.sprite()
        // this.enemy3 = this.add.sprite(12, 280, 'enemy1')

        var enemy1 = new Enemy({ scene: this }, 12, 176, "enemy1")
        var enemy2 = new Enemy({ scene: this }, 56, 176, "enemy2")
        
        var enemy3 = new Enemy({ scene: this }, 100, 176, "enemy3")

        // enemy1.moveEnemy()
        // enemy1.moveEnemy()


        

        


        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.shootBullet()
        this.uiGrid = new AlignGrid({ scene: this, rows: 20, cols: 20 })
        //this.uiGrid.showNumbers()
        // this.uiGrid.placeAtIndex(100, this.enemy3)
        // Align.scaleToGameW(this.enemy3, 0.06)
        this.index = 101
        this.counterL = 120
        this.counterR = 119
        this.plus19 = true
        this.speedNum = 1
        this.goRight = true
        console.log("vvvvvv")
        
       this.time.addEvent({ delay: 150, callback: enemy1.moveEnemy, callbackScope: enemy1, loop: true })
       this.time.addEvent({ delay: 150, callback: enemy2.moveEnemy, callbackScope: enemy2, loop: true })
       this.time.addEvent({ delay: 500, callback: enemy1.checkTask, callbackScope: enemy1, loop: true })
       this.time.addEvent({ delay: 500, callback: enemy2.checkTask, callbackScope: enemy2, loop: true })
       this.time.addEvent({ delay: 500, callback: enemy3.checkTask, callbackScope: enemy3, loop: true })
       this.time.addEvent({ delay: 150, callback: enemy3.moveEnemy, callbackScope: enemy3, loop: true })

    }

    
    /*buttonPressed(params)   
    {
        console.log(params)
        //this.scene.start('SceneOver')
        //emitter.emit(G.PLAY_SOUND, "cat")
        model.musicOn = false

    }*/
    
    moveEnemy() {
        if (this.goRight == true) {
            if (this.enemy1.x > game.config.width-10) {
                this.goRight = false
                this.enemy1.y += 10
            } else {
                this.enemy1.x += 7
            }

        } else {
            if (this.enemy1.x < 12) {
                this.goRight = true
                this.enemy1.y += 10
            } else {
                this.enemy1.x -= 7
            }
        }
    }
    movePlayerR() {
        // var Fx = this.player.x+20
        // this.tweens.add({targets: this.player,duration: 100,x:Fx});
        // this.player.x = Fx
        this.player.x += 4
    }
    movePlayerL() {
        //var Fx = this.player.x-20
        //this.tweens.add({targets: this.player,duration: 100,x:Fx});
        this.player.x -= 4
        //this.player.x = Fx
    }
    bulletSetUp() {
        this.bullet = this.add.sprite(this.player.x, this.player.y - 40, 'bullet')
        Align.scaleToGameW(this.bullet, 0.01)
    }
    bullet2SetUp() {
        this.bullet2 = this.add.sprite(300, -30, 'bullet')
    }
    shootBullet() {
        this.bulletSetUp()
        this.tweens.add({ targets: this.bullet, duration: 500, y: -30 });
        emitter.emit(G.PLAY_SOUND, 'bulletSFX')
    }


    checkBullet() {
        if (this.bullet.y == -30) {
            this.bullet.destroy()
        }
    }


    update() {

        //console.log(this.bullet.y)
        if (this.keyA.isDown) {
            this.movePlayerL()
            //this.time.addEvent({ delay: 10000, callback: null, callbackScope: this, loop: false });
        }
        if (this.keyD.isDown) {
            this.movePlayerR()
        }
        if (this.bullet.y == -30) {
            //console.log('aiopwrhnfjkhjklhdlhjjdfhwelfhldkjfahfkdjthowehfisd')
            if (this.keyR.isDown) {
                this.shootBullet()
                this.checkBullet()

            }

        }

        //     if(this.plus19 == true) {

        //     if(this.counter == 19){
        //         this.counter = 0
        //         this.plus19 = false
        //         this.index+=20
        //     }

        // }
        // else {
        //     if(this.counter == 19){
        //         this.counter = 0
        //         this.plus19 = true
        // }

        // }
    }
}