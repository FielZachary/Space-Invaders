class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {




    }

    create() {

        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller()

        this.mediaManager = new MediaManager({ scene: this })


        // var sb = new SoundButtons({ scene: this })
        this.text1 = this.add.text(12, 200, "SCORE - 2")
        this.text2 = this.add.text(12, 200, "TAITO")
        this.text3 = this.add.text(12, 200, "SCORE - 1")
        this.text4 = this.add.text(12, 200, "0")
        this.text5 = this.add.text(12, 200, "Credit - ")



        this.player = this.physics.add.sprite(game.config.width / 2, game.config.height - 100, 'player')
        this.player.setOrigin(0.5, 0.5)
        Align.scaleToGameW(this.player, 0.06)
        Align.scaleToGameW(this.text1, 0.26)
        Align.scaleToGameW(this.text2, 0.18)
        Align.scaleToGameW(this.text3, 0.26)
        Align.scaleToGameW(this.text4, 0.03)
        
        Align.scaleToGameW(this.text5, 0.24)

        this.bullet = this.add.sprite()
        //this.enemy1 = this.physics.add.sprite(38, 176, 'enemy1')
        this.enemyGroup = this.physics.add.group()
        this.enemy1 = new Enemy({ scene: this }, 12, 176, "enemy1", this.bulletGroup)
        this.enemyGroup.add(this.enemy1.object)

        Align.scaleToGameW(this.enemy1, 0.06)

        this.enemy2 = new Enemy({ scene: this }, 54, 176, "enemy2", this.bulletGroup)
        this.enemyGroup.add(this.enemy2.object)

        this.enemy3 = new Enemy({ scene: this }, 96, 176, "enemy3", this.bulletGroup)
        this.enemyGroup.add(this.enemy3.object)

        // enemy1.moveEnemy()
        // enemy1.moveEnemy()

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //this.shootBullet()
        this.uiGrid = new AlignGrid({ scene: this, rows: 20, cols: 20 })
        ///this.uiGrid.showNumbers()
        this.uiGrid.placeAtIndex(0, this.text1)
        this.uiGrid.placeAtIndex(8, this.text2)
        this.uiGrid.placeAtIndex(14, this.text3)
        this.uiGrid.placeAtIndex(340, this.text4)
        this.uiGrid.placeAtIndex(354, this.text5)

        // Align.scaleToGameW(this.enemy3, 0.06)
        this.index = 101
        this.counterL = 120
        this.counterR = 119
        this.plus19 = true
        this.speedNum = 1
        this.goRight = true
        console.log("vvvvvv")
        this.bulletGroup = this.physics.add.group()
        this.bulletShot = false

        this.physics.add.collider(this.bulletGroup, this.enemyGroup, this.destroyEnemies, null, this);


        this.time.addEvent({ delay: 500, callback: this.enemy1.checkTask, callbackScope: this.enemy1, loop: true })
        this.time.addEvent({ delay: 500, callback: this.enemy2.checkTask, callbackScope: this.enemy2, loop: true })
        this.time.addEvent({ delay: 500, callback: this.enemy3.checkTask, callbackScope: this.enemy3, loop: true })
        //this.time.addEvent({ delay: 500, callback: this.moveEnemies, callbackScope: this, loop: true })
        this.time.addEvent({ delay: 500, callback: this.enemy3.moveEnemy, callbackScope: this.enemy3, loop: true })
        this.time.addEvent({ delay: 500, callback: this.enemy2.moveEnemy, callbackScope: this.enemy2, loop: true })
        this.time.addEvent({ delay: 500, callback: this.enemy1.moveEnemy, callbackScope: this.enemy1, loop: true })

        this.input.keyboard.on("keydown", this.handleKey, this);

        //this.time.addEvent({ delay: 150, callback: this.checkEnemy, callbackScope: this, loop: true })

    }
    // checkEnemy()
    // {
    //     var p = this.enemy1.x - this.enemy2.x
    //     var c = this.enemy2.x - this.enemy3.x
    //     if (p != 44)
    //     {
    //         p = 44
    //         this.enemy1.x = p
    //         this.enemy2.x = p
    //     }
    //     if (c != 44)
    //     {
    //         c = 44
    //         this.enemy1.x = c
    //         this.enemy2.x = c
    //     }
    // }


    /*buttonPressed(params)   
    {
        console.log(params)
        //this.scene.start('SceneOver')
        //emitter.emit(G.PLAY_SOUND, "cat")
        model.musicOn = false

    }*/
    destroyEnemies(bullet, enemy) {
        console.log('It Finnaly Worked!!')
        bullet.destroy()
        enemy.destroy()
        emitter.emit(G.PLAY_SOUNDS, 'EDeadSFX')
    }
    handleKey(e) {
        if (e.code == "Space") {
            this.makeBullet();
        }

    }
    moveEnemies() {
        this.enemy3.moveEnemy()
        this.enemy2.moveEnemy()
        this.enemy1.moveEnemy()
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
    ToF() {
        this.bulletShot = false
    }
    TIME() {
        this.time.addEvent({ delay: 500, callback: this.ToF, callbackScope: this, loop: false })
    }
    makeBullet() {

        if (this.bulletShot == false) {
            var bullet = this.physics.add.sprite(this.player.x, this.player.y - 40, 'bullet')
            this.bulletGroup.add(bullet)
            Align.scaleToGameW(bullet, 0.01)
            this.tweens.add({ targets: bullet, duration: 500, y: -30 });
            this.bulletShot = true
            emitter.emit(G.PLAY_SOUNDS, 'bulletSFX')
            this.TIME()
        }
    }




    update() {
        //this.destroyEnemies()
        //console.log(this.bullet.y)
        //console.log(this.bulletGroup)
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