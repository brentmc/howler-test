/**
 * Created by brentmcivor on 10/11/15.
 */
import Howler from 'howler'

class HowlerTest{
    constructor(){
        this.soundsAr = []
        this.MAX_SPLASHES = 10
    }

    setup() {
        this.setupBurp()
        this.setupMunch()
        this.setupLoopingBG()
        this.setupCountdown()
        this.setupSplash()
    }

    setupBurp(){
        let burpBtn = document.getElementById('burpBtn')
        let burp = new Howl({
            urls: ['example/assets/burp.mp3'],
        })
        burpBtn.onclick = () => burp.play()
    }

    setupMunch(){
        let munchBtn = document.getElementById('munchBtn')
        let munch = new Howl({urls: ['example/assets/munch.mp3']})
        munchBtn.onclick = () => munch.play()
    }

    setupLoopingBG(){
        this._isLooping = false
        let loopBtn = document.getElementById('bgSoundBtn')
        let loopingBG = new Howl({urls: ['example/assets/ocean_bg.mp3'], loop: true})
        loopBtn.onclick = () => {
            if (this._isLooping) {
                this._isLooping = false
                loopingBG.pause()
            } else {
                this._isLooping = true
                loopingBG.play()
            }
        }
    }

    playNextNumber(){
        if(this.soundsAr && this.soundsAr.length > 0){
            let tempSound = this.soundsAr.pop()
            tempSound.onend = () => this.playNextNumber()
            tempSound.play()
        }
    }

    setupCountdown(){
        let countBtn = document.getElementById('countBtn')

        this.soundsAr = []
        let numbersAr = ['burp', '1', '2', '3', 4]
        numbersAr.forEach(num => {
            this.soundsAr.push(new Howl(
                {   urls: ['example/assets/' + num + '.mp3'],
                    onend:() => this.playNextNumber()
                }))
        });

        countBtn.onclick = () => this.playNextNumber()
    }

    playSplash() {
        if (this._splashCount < this.MAX_SPLASHES) {
            this._splashCount++
            let splashSound = new Howl({urls: ['example/assets/WaterSplash02.mp3']})
            splashSound.play()

            setTimeout(() => {
                this.playSplash()
            }, 500)
        }
    }

    setupSplash(){
        this._splashCount = 0
        let splashBtn = document.getElementById('splashBtn')
        splashBtn.onclick = () => this.playSplash()
    }



}

export default HowlerTest