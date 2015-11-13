/**
 * Created by brentmcivor on 11/11/15.
 */
import pixi from 'pixi.js'
import Howler from 'howler'

//Make sure your assets are imported to ensure that webpack packages hashed versions up into /build
import bunnyPNG from './assets/bunny.png'
import successOGG from './assets/success.ogg'
import successMP3 from './assets/success.mp3'


class PixiHowler{
    constructor(){

    }

    setup(config) {
        console.log('setup')

        // You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
        // which will try to choose the best renderer for the environment you are in.
        this.renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {view:document.getElementById("tutorial")});
        this.renderer.backgroundColor = config.fillColour

        // The renderer will create a canvas element for you that you can then insert into the DOM.
        document.body.appendChild(this.renderer.view);

        // You need to create a root container that will hold the scene you want to draw.
        this.stage = new PIXI.Container();


        this.createBunny()
        this.createText(config.isBrowser)
        this.createGraphics()

    }

    createBunny(){
      //  const bunnypng = require('./_assets/bunny.png')

        // load the texture we need
        PIXI.loader.add('bunny', bunnyPNG).load(

            (loader, resources) => {
                // This creates a texture from a 'bunny.png' image.
                this.bunny = new PIXI.Sprite(resources.bunny.texture);

                // Setup the position and scale of the bunny
                this.bunny.position.x = 50//window.innerWidth/2;
                this.bunny.position.y = 50//window.innerHeight/2;

                this.bunny.scale.x = 2;
                this.bunny.scale.y = 2;

                // Add the bunny to the scene we are building.
                this.stage.addChild(this.bunny);

                this.bunny.interactive = true

                //We need .tap for tablet and .click for browser
                this.bunny.tap = () => {
                    console.log('clicked bunny')
                    var audio = new Audio(successOGG);
                    audio.play();
                    console.log('audio', audio)
                }

                // kick off the animation loop (defined below)
                this.animate();
            }
        );
    }

    createText($isBrowser){
        let str = $isBrowser ? "This is browser mode. \nAre you on a computer?" : "This is tablet mode. Are you on a tablet?"
        var text = new PIXI.Text(str)
        text.position.x = window.innerWidth/2 - text.width/2;
        text.position.y = window.innerHeight/8;
        this.stage.addChild(text)
    }

    createGraphics(){

        let clickHowlOGG = this.createBox(0, 250, "click \nHowlOGG")
        clickHowlOGG.click = () => {
            let howl = new Howl({urls: [successOGG]})
            console.log('clickHowlOGG click - Howl = ', howl)
            howl.play()
        }

        let clickHowlMP3 = this.createBox(210, 250, "click \nHowlMP3")
        clickHowlMP3.click = () => {
            let howl = new Howl({urls: [successMP3]})
            console.log('clickHowlMP3 click - Howl = ', howl)
            howl.play()
        }

        let clickAudioOGG = this.createBox(420, 250, "click \nAudioOGG")
        clickAudioOGG.click = () => {
            let audio = new Audio(successOGG);
            console.log('clickAudioOGG click - audio =', audio)
            audio.play();
        }

        let clickAudioMP3 = this.createBox(630, 250, "click \nAudioMP3")
        clickAudioMP3.click = () => {
            let audio = new Audio(successMP3);
            console.log('clickAudioMP3 click - audio = ', audio)
            audio.play();
        }


        ////////////////////////////////////////////////////////////////////////////////////
        let tapHowlOGG = this.createBox(0, 360, "tap \nHowlOGG")
        tapHowlOGG.tap = () => {
            let howl = new Howl({urls: [successOGG]})
            console.log('tapHowlOGG click - howl = ', howl)
            howl.play()
        }

        let tapHowlMP3 = this.createBox(210, 360, "tap \nHowlMP3")
        tapHowlMP3.tap = () => {
            let howl = new Howl({urls: [successMP3]})
            console.log('tapHowlMP3 click - howl = ', howl)
            howl.play()
        }

        let tapAudioOGG = this.createBox(420, 360, "tap \nAudioOGG")
        tapAudioOGG.tap = () => {
            let audio = new Audio(successOGG);
            console.log('tapAudioOGG click - audio = ', audio)
            audio.play();
        }

        let tapAudioMP3 = this.createBox(630, 360, "tap \nAudioMP3")
        tapAudioMP3.tap = () => {
            let audio = new Audio(successMP3);
            console.log('tapAudioMP3 click - audio = ', audio)
            audio.play();
        }

        ////////////////////////////////////////////////////////////////////////////////////
        let touchStartHowlOGG = this.createBox(0, 470, "touchStart \nHowlOGG")
        touchStartHowlOGG.touchStart = () => {
            let howl = new Howl({urls: [successOGG]})
            console.log('touchStartHowlOGG click - howl = ', howl)
            howl.play()
        }

        let touchStartHowlMP3 = this.createBox(210, 470, "touchStart \nHowlMP3")
        touchStartHowlMP3.touchStart = () => {
            let howl = new Howl({urls: [successMP3]})
            console.log('touchStartHowlMP3 click - howl = ', howl)
            howl.play()
        }

        let touchStartAudioOGG = this.createBox(420, 470, "touchStart \nAudioOGG")
        touchStartAudioOGG.touchStart = () => {
            let audio = new Audio(successOGG);
            console.log('touchStartAudioOGG click - audio = ', audio)
            audio.play();
        }

        let touchStartAudioMP3 = this.createBox(630, 470, "touchStart \nAudioMP3")
        touchStartAudioMP3.touchStart = () => {
            let audio = new Audio(successMP3);
            console.log('touchStartAudioMP3 click - audio = ', audio)
            audio.play();
        }

        ////////////////////////////////////////////////////////////////////////////////////
        let touchEndHowlOGG = this.createBox(0, 580, "touchEnd \nHowlOGG")
        touchEndHowlOGG.touchEnd = () => {
            let howl = new Howl({urls: [successOGG]})
            console.log('touchEndHowlOGG click - howl = ', howl)
            howl.play()
        }

        let touchEndHowlMP3 = this.createBox(210, 580, "touchEnd \nHowlMP3")
        touchEndHowlMP3.touchEnd = () => {
            let howl = new Howl({urls: [successMP3]})
            console.log('touchEndHowlMP3 click - howl = ', howl)
            howl.play()
        }

        let touchEndAudioOGG = this.createBox(420, 580, "touchEnd \nAudioOGG")
        touchEndAudioOGG.touchEnd = () => {
            let audio = new Audio(successOGG);
            console.log('touchEndAudioOGG click - audio = ', audio)
            audio.play();
        }

        let touchEndAudioMP3 = this.createBox(630, 580, "touchEnd \nAudioMP3")
        touchEndAudioMP3.touchEnd = () => {
            let audio = new Audio(successMP3);
            console.log('touchEndAudioMP3 click - audio = ', audio)
            audio.play();
        }


    }


    createBox(xPos, yPos, str){
        const lineThickness = 2
        const fillColour = 0x3AA6D0
        const lineColour = 0x000000
        const rectH = 100
        const rectW = 2 * rectH

        var graphics = new PIXI.Graphics()
        graphics.lineStyle(lineThickness, lineColour, 1)
        graphics.beginFill(fillColour, 1)
        graphics.drawRect(xPos, yPos, rectW, rectH)
        this.stage.addChild(graphics)
        graphics.interactive = true

        var labelText = new PIXI.Text(str)
        labelText.position.x = (graphics.width - labelText.width)/2 + xPos
        labelText.position.y = (graphics.height - labelText.height)/2 + yPos
        this.stage.addChild(labelText)


        return graphics
    }

    animate() {
        // start the timer for the next animation loop
        requestAnimationFrame(() => this.animate());

        // each frame we spin the bunny around a bit
     //   this.bunny.rotation += 0.1;

        // this is the main render call that makes pixi draw your container and its children.
        this.renderer.render(this.stage);
    }
}

export default PixiHowler