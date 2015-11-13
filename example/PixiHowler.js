/**
 * Created by brentmcivor on 11/11/15.
 */
import pixi from 'pixi.js'
import Howler from 'howler'

//Make sure your assets are imported to ensure that webpack packages hashed versions up into /build
import bunnypng from './_assets/bunny.png'
import burpOgg from './assets/burp.ogg'
import burpMp3 from './assets/burp.mp3'


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
        PIXI.loader.add('bunny', bunnypng).load(

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
                    var audio = new Audio(burpOgg);
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

        let clickHowlOGG = this.createBox(0, 250, "clickHowlOGG")
        clickHowlOGG.click = () => {
            let burp = new Howl({urls: [burpOgg]})
            console.log('clickHowlOGG click - Howl = ', burp)
            burp.play()
        }

        let clickHowlMP3 = this.createBox(210, 250, "clickHowlMP3")
        clickHowlMP3.click = () => {
            let burp = new Howl({urls: [burpMp3]})
            console.log('clickHowlMP3 click - Howl = ', burp)
            burp.play()
        }

        let clickAudioOGG = this.createBox(420, 250, "clickAudioOGG")
        clickAudioOGG.click = () => {
            let audio = new Audio(burpOgg);
            console.log('clickAudioOGG click - audio =', audio)
            audio.play();
        }

        let clickAudioMP3 = this.createBox(630, 250, "clickAudioMP3")
        clickAudioMP3.click = () => {
            let audio = new Audio(burpMp3);
            console.log('clickAudioMP3 click - audio = ', audio)
            audio.play();
        }


        ////////////////////////////////////////////////////////////////////////////////////
        let tapHowlOGG = this.createBox(0, 360, "tapHowlOGG")
        tapHowlOGG.tap = () => {
            let burp = new Howl({urls: [burpOgg]})
            console.log('tapHowlOGG click - burp = ', burp)
            burp.play()
        }

        let tapHowlMP3 = this.createBox(210, 360, "tapHowlMP3")
        tapHowlMP3.tap = () => {
            let burp = new Howl({urls: [burpMp3]})
            console.log('tapHowlMP3 click - burp = ', burp)
            burp.play()
        }

        let tapAudioOGG = this.createBox(420, 360, "tapAudioOGG")
        tapAudioOGG.tap = () => {
            let audio = new Audio(burpOgg);
            console.log('tapAudioOGG click - audio = ', audio)
            audio.play();
        }

        let tapAudioMP3 = this.createBox(630, 360, "tapAudioMP3")
        tapAudioMP3.tap = () => {
            let audio = new Audio(burpMp3);
            console.log('tapAudioMP3 click - audio = ', audio)
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