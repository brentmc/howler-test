/**
 * Created by brentmcivor on 10/11/15.
 */
import Howler from 'howler'

class HowlerTest{
    constructor(){
        this.soundsAr = []
    }

    setup() {
        this.setupBurp()
        this.setupMunch()
        this.setupLoopingBG()
        this.setupCountdown()
    }

    setupBurp(){
        let burpBtn = document.getElementById('burpBtn')
        let burp = new Howl({
            urls: ['example/assets/burp.mp3'],
            onend: () => console.log('onBurpEnd')
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
                console.log('time to pause')
                this._isLooping = false
                loopingBG.pause()
            } else {
                console.log('time to play')
                this._isLooping = true
                loopingBG.play()
            }
        }
    }

    playNextNumber(){
        console.log('playNextNumber() - this.soundsAr = ', this.soundsAr)
        // this.soundsAr.forEach(sound => console.log('02 sound = ', sound))

        if(this.soundsAr && this.soundsAr.length > 0){
            let tempSound = this.soundsAr.shift()
            tempSound.onend = () => this.playNextNumber()
            tempSound.play()
        }else{
            console.log('soundAr is null or empty')
        }
    }

    setupCountdown(){
        let countBtn = document.getElementById('countBtn')

        this.soundsAr = []
        let numbersAr = ['0', '1', '2', '3', 4, 5, 6, 7, 8, 9, 10]
        numbersAr.forEach(num => {
            console.log('num = ' + num)
            this.soundsAr.push(new Howl(
                {   urls: ['example/assets/' + num + ".mp3"],
                    onend:() => this.playNextNumber()
                }))
        });

        this.soundsAr.forEach(sound => console.log('01 sound = ', sound))

        countBtn.onclick = () => this.playNextNumber()
    }

}

export default HowlerTest