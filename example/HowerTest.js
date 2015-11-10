/**
 * Created by brentmcivor on 10/11/15.
 */
class HowlerTest{


    setup(){

        this._isLooping = false

        let burpBtn = document.getElementById('burpBtn')
        let munchBtn = document.getElementById('munchBtn')
        let loopBtn = document.getElementById('bgSoundBtn')


        let burp = new Howl({
            urls:['example/assets/burp.mp3'],
            onend:() => console.log('onBurpEnd')})
        burpBtn.onclick = () => burp.play()

        let munch = new Howl({urls:['example/assets/munch.mp3']})
        munchBtn.onclick = () => munch.play()

        let loopingBG = new Howl({urls:['example/assets/ocean_bg.mp3'], loop:true})
        loopBtn.onclick = () => {
            if(this._isLooping){
                console.log('time to pause')
                this._isLooping = false
                loopingBG.pause()
            }else{
                console.log('time to play')
                this._isLooping = true
                loopingBG.play()
            }

        }








    }
}

export default HowlerTest