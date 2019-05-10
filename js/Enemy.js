class Enemy extends Phaser.GameObjects.Container {
    constructor(config, xS, yS, sprite) {
        console.log("sssssssssss")
        console.log(xS)
        super(config.scene)
        this.scene = config.scene;

        //this.mediaManager = new MediaManager({ scene: this })

        this.object = this.scene.physics.add.sprite(xS, yS, sprite)
        Align.scaleToGameW(this.object, 0.05)


        this.uiGrid = new AlignGrid({ scene: this, rows: 20, cols: 20 })
        //this.uiGrid.placeAtIndex(100, this.object)


        this.scene.add.existing(this);
        this.goRight = true
        this.X = this.object.x
        this.Y = this.object.y
        this.i = 0
        this.counter = 1
        this.EArray = [1, 2, 3, 4]
        this.ESArray = ['moveSFX1', 'moveSFX2', 'moveSFX3', 'moveSFX4']
        


    }
    destroyEnemies()
    {
        console.log('Wow it acctually worked')
    }
    moveEnemy() {
        if (this.goRight == true) {
            if (this.object.x > game.config.width - 50) {
                this.goRight = false
                this.object.y += 40
            } else {
                this.object.x += 7
                if (this.counter == this.EArray[this.i]) {
                    emitter.emit(G.PLAY_SOUND, this.ESArray[this.i])
                    this.counter++
                    this.i++
                    if (this.counter > 4) {
                        this.counter = 1
                    }
                    if (this.i > 3) {
                        this.i = 0
                    }
                }
            }

        } else {
            if (this.object.x < 20) {
                this.goRight = true
                this.object.y += 40

            } else {
                this.object.x -= 7
                if (this.counter == this.EArray[this.i]) {
                    emitter.emit(G.PLAY_SOUND, this.ESArray[this.i])
                    this.counter++
                    this.i++
                    if (this.counter > 4) {
                        this.counter = 1
                    }
                    if (this.i > 3) {
                        this.i = 0
                    }
                }
            }
        }
        this.Y = this.object.y
        this.X = this.object.x
    }
    ebulletSetUp() {
        this.ebullet = this.scene.add.sprite(this.object.x, this.object.y + 40, 'bullet')
        Align.scaleToGameW(this.ebullet, 0.01)
    }
    ebullet2SetUp() {
        this.ebullet2 = this.add.sprite(300, -30, 'bullet')
    }
    eshootBullet() {
        this.ebulletSetUp()
        this.scene.tweens.add({ targets: this.ebullet, duration: 2000, y: game.config.height + 100 });
        //emitter.emit(G.PLAY_SOUND, 'bulletSFX')
    }
    checkTask() {
        var r = Math.floor(Math.random() * 100)
        if (r < 4) {
            this.eshootBullet()
        }
        else {

        }
    }

}
