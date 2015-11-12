/**
 * Created by brentmcivor on 11/11/15.
 */
import pixi from 'pixi.js'
import Howler from 'howler'

//Make sure your assets are imported to ensure that webpack packages hashed versions up into /build
import bunnypng from './_assets/bunny.png'
import burpOgg from './assets/burp.ogg'


class PixiHowler{
    constructor(){

    }

    setup(config) {
        console.log('setup')

        // You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
        // which will try to choose the best renderer for the environment you are in.
        this.renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
        this.renderer.backgroundColor = config.fillColour

        // The renderer will create a canvas element for you that you can then insert into the DOM.
        document.body.appendChild(this.renderer.view);

        // You need to create a root container that will hold the scene you want to draw.
        this.stage = new PIXI.Container();


        this.createBunny()
        this.createText()
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
                this.bunny.position.x = window.innerWidth/2;
                this.bunny.position.y = window.innerHeight/2;

                this.bunny.scale.x = 2;
                this.bunny.scale.y = 2;

                // Add the bunny to the scene we are building.
                this.stage.addChild(this.bunny);

                this.bunny.interactive = true

                //We need .tap for tablet and .click for browser
                this.bunny.tap = () => {

                    console.log('clicked')

                    var audio = new Audio(burpOgg);
                    audio.play();

                    console.log('audio', audio)

                    //TODO it is possible that Howl would have worked the entire time if we had correctly built in the .ogg file and used tap instead of click
                   // console.log('bunny click')
                //    let burp = new Howl({
                //        urls: [burpMp3],
                //    })
                 //   burp.play()
                    //TODO check this

                }

                // kick off the animation loop (defined below)
                this.animate();
            }
        );
    }

    createText(){
        var text = new PIXI.Text("Hola Sr McIvor!")
        text.position.x = window.innerWidth/2;
        text.position.y = window.innerHeight/2 - 100;
        this.stage.addChild(text)
    }

    createGraphics(){
        var graphics = new PIXI.Graphics();

        // set a fill and line style
        graphics.beginFill(0xFF3300);
        graphics.lineStyle(4, 0xffd900, 1);

        // draw a shape
        graphics.moveTo(50,50);
        graphics.lineTo(250, 50);
        graphics.lineTo(100, 100);
        graphics.lineTo(50, 50);
        graphics.endFill();

        // set a fill and a line style again and draw a rectangle
        graphics.lineStyle(2, 0x0000FF, 1);
        graphics.beginFill(0xFF700B, 1);
        graphics.drawRect(50, 250, 120, 120);

        // draw a rounded rectangle
        graphics.lineStyle(2, 0xFF00FF, 1);
        graphics.beginFill(0xFF00BB, 0.25);
        graphics.drawRoundedRect(150, 450, 300, 100, 15);
        graphics.endFill();

        // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
        graphics.lineStyle(0);
        graphics.beginFill(0xFFFF0B, 0.5);
        graphics.drawCircle(470, 90,60);
        graphics.endFill();

        graphics.interactive = true

        graphics.click = () => {
            console.log('graphics click')
            let burp = new Howl({
                urls: [burpOgg],
            })
            burp.play()

        }


        this.stage.addChild(graphics);
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