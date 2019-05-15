class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {




    }

    create() {


        //this.scene.start('SceneOver')
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller()

        this.mediaManager = new MediaManager({ scene: this })

        this.IShips = 4
        this.score1 = 0
        this.score2 = 0

        this.playerG = this.physics.add.group()


        // var sb = new SoundButtons({ scene: this })
        this.text1 = this.add.image(12, 100, 'SCORE1')
        this.text2 = this.add.image(12, 100, 'TAITO')
        this.text3 = this.add.image(12, 100, 'SCORE2')
        this.text4 = this.add.text(12, 200, this.IShips, { color: '#FFFF00' })
        this.text5 = this.add.image(12, 100, 'CREDIT')
        this.num31 = this.add.image(12, 100, '0')
        this.num1 = this.add.text(12, 200, this.score1)
        this.num2 = this.add.image(12, 100, '05000')



        this.player = this.physics.add.sprite(game.config.width / 2, game.config.height - 100, 'player')
        this.player2 = this.physics.add.sprite(game.config.width / 2, game.config.height - 100, 'player')
        this.player3 = this.physics.add.sprite(game.config.width / 2, game.config.height - 100, 'player')
        this.player4 = this.physics.add.sprite(game.config.width / 2, game.config.height - 100, 'player')
        this.player.setOrigin(0.5, 0.5)

        this.playerG.add(this.player)


        Align.scaleToGameW(this.player, 0.06)
        Align.scaleToGameW(this.player2, 0.06)
        Align.scaleToGameW(this.player3, 0.06)
        Align.scaleToGameW(this.player4, 0.06)

        Align.scaleToGameW(this.text1, 0.26)

        Align.scaleToGameW(this.text2, 0.18)

        Align.scaleToGameW(this.text3, 0.28)
        Align.scaleToGameW(this.text4, 0.03)
        Align.scaleToGameW(this.text5, 0.21)
        Align.scaleToGameW(this.num1, 0.03)
        Align.scaleToGameW(this.num2, 0.17)
        Align.scaleToGameW(this.num31, 0.04)



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
        //this.uiGrid.showNumbers()
        // this.uiGrid.placeAtIndex(0, this.text1)

        this.uiGrid.placeAtIndex(20, this.num1)
        //this.uiGrid.placeAtIndex(8, this.text2)
        //this.uiGrid.placeAtIndex(28, this.num2)
        //this.uiGrid.placeAtIndex(14, this.text3)
        // this.uiGrid.placeAtIndex(340, this.text4)
        //this.uiGrid.placeAtIndex(354, this.text5)
        console.log('aslkfjjfjfaj;dj;fja ' + this.text4.x)
        // this.title = this.add.image(game.config.width/2, 150, 'GOI2')


        this.text1.x = 80
        this.text1.y = 16

        this.text2.x = 234
        this.text2.y = 16

        this.num2.x = 234
        this.num2.y = 54

        this.text3.x = 390
        this.text3.y = 16

        this.num31.x = 400
        this.num31.y = 590

        this.text5.x = 320
        this.text5.y = 590

        this.player2.x = 52
        this.player3.x = 92
        this.player4.x = 132

        this.player2.y = 600
        this.player3.y = 600
        this.player4.y = 600

        this.text4.x = 12
        this.text4.y = 590

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

        this.P = 2
        this.playerA = [this.player2, this.player3, this.player4]

        this.physics.add.collider(this.bulletGroup, this.enemyGroup, this.destroyEnemies, null, this);
        this.physics.add.collider(this.enemy1.eBG, this.playerG, this.destroyPlayer, null, this);
        this.physics.add.collider(this.enemy2.eBG, this.playerG, this.destroyPlayer, null, this);
        this.physics.add.collider(this.enemy3.eBG, this.playerG, this.destroyPlayer, null, this);



        // this.time.addEvent({ delay: 500, callback: this.moveEnemies, callbackScope: this, loop: true })
        this.timedEvent1 = this.time.addEvent({ delay: 500, callback: this.enemy2.checkTask, callbackScope: this.enemy2, loop: true })
        this.timedEvent2 = this.time.addEvent({ delay: 500, callback: this.enemy3.checkTask, callbackScope: this.enemy3, loop: true })
        this.timedEvent3 = this.time.addEvent({ delay: 500, callback: this.enemy1.checkTask, callbackScope: this.enemy1, loop: true })
        this.timedEvent4 = this.time.addEvent({ delay: 500, callback: this.enemy3.moveEnemy, callbackScope: this.enemy3, loop: true })
        this.timedEvent5 = this.time.addEvent({ delay: 500, callback: this.enemy2.moveEnemy, callbackScope: this.enemy2, loop: true })
        this.timedEvent6 = this.time.addEvent({ delay: 500, callback: this.enemy1.moveEnemy, callbackScope: this.enemy1, loop: true })

        this.input.keyboard.on("keydown", this.handleKey, this);
        this.doIt = true
        


        //this.time.addEvent({ delay: 150, callback: this.checkEnemy, callbackScope: this, loop: true })

    }

    destroyEnemies(bullet, enemy) {
        console.log('It Finnaly Worked!!')
        bullet.destroy()
        enemy.destroy()
        this.score1 += 20
        emitter.emit(G.PLAY_SOUND, 'EDeadSFX')
    }
    respawn() {
        this.player = this.physics.add.sprite(game.config.width / 2, game.config.height - 100, 'player')
        this.playerG.add(this.player)
        Align.scaleToGameW(this.player, 0.06)

    }
    doOver2() {
        this.scene.start('SceneOver');
    }
    doOver() {
        this.doIt = false
        this.enemyGroup.clear(true)
        this.time.addEvent({ delay: 2000, callback: this.doOver2, callbackScope: this, loop: false })

    }
    gameOver() {
        this.timedEvent1.paused = true
        this.timedEvent2.paused = true

        this.timedEvent3.paused = true
        this.timedEvent4.paused = true

        this.timedEvent5.paused = true
        this.timedEvent6.paused = true

        if (this.doIt == true) {
            
            this.enemyGroup.clear(true)

            this.time.addEvent({ delay: 250, callback: this.defineE, callbackScope: this, loop: false })
            this.time.addEvent({ delay: 4000, callback: this.doOver, callbackScope: this, loop: false })

        }
    }
    defineE() {
        if (this.doIt == true) {
            this.title = this.add.image(game.config.width / 2, 150, 'GOI2')
            Align.scaleToGameW(this.title, 0.7)

            //console.log('aweofihaphfaslekfnlksejflasjfle;ajsfkeawjflkaj')

            this.enemyGroup = this.physics.add.group()

            this.enemy1 = new Enemy({ scene: this }, this.enemy1.object.x, this.enemy1.object.y, "enemy1", this.bulletGroup)
            this.enemyGroup.add(this.enemy1.object)

            this.uiGrid.placeAtIndex(107, this.enemy1.object)

            Align.scaleToGameW(this.enemy1, 0.06)

            this.enemy2 = new Enemy({ scene: this }, this.enemy2.object.x, this.enemy2.object.y, "enemy2", this.bulletGroup)
            this.enemyGroup.add(this.enemy2.object)

            this.uiGrid.placeAtIndex(109, this.enemy2.object)

            this.enemy3 = new Enemy({ scene: this }, this.enemy3.object.x, this.enemy3.object.y, "enemy3", this.bulletGroup)
            this.enemyGroup.add(this.enemy3.object)

            this.uiGrid.placeAtIndex(111, this.enemy3.object)

            this.time.addEvent({ delay: 250, callback: this.gameOver, callbackScope: this, loop: false })
        }
    }
    destroyPlayer() {
        if (this.IShips != 1) {
            console.log('aaoisejfeujl;akjfl;ahffkleajffl;kh')
            this.IShips -= 1

            console.log(this.IShips)
            this.player.destroy()
            this.playerA[this.P].destroy()
            this.P--
            if (this.P == 0) {
                console.log('All lives are now gone')
            }
            // this.player = null
            console.log(this.playerG)
            emitter.emit(G.PLAY_SOUND, 'EDeadSFX')
            this.time.addEvent({ delay: 500, callback: this.respawn, callbackScope: this, loop: false })
        }
        else {
            this.player.destroy()
            //this.enemyGroup.clear(true)

            this.time.addEvent({ delay: 1, callback: this.gameOver, callbackScope: this, loop: false });
            // this.title = this.add.image(game.config.width/2, 150, 'GOI2')
            // Align.scaleToGameW(this.title, 0.7)

        }
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
    checkTask() {

    }
    movePlayerR() {
        // var Fx = this.player.x+20
        // this.tweens.add({targets: this.player,duration: 100,x:Fx});
        // this.player.x = Fx
        this.player.x += 4
        //this.playerv2.x += 4
    }
    movePlayerL() {
        //var Fx = this.player.x-20
        //this.tweens.add({targets: this.player,duration: 100,x:Fx});
        this.player.x -= 4
        //this.playerv2.x -= 4
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
            emitter.emit(G.PLAY_SOUND, 'bulletSFX')
            this.TIME()
        }
        // checkELife(enemy)
        // {

        // }
    }




    update() {

        this.game.sound.context.resume()
        //console.log(this.enemyGroup)
        //this.checkELife()
        this.num1.setText(this.score1)
        // if (this.enemyGroup.getChildren().length == 0) {
        //     console.log('aklserfjnhleahf;afjejf')
        // }
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
        this.text4.setText(this.IShips)

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

