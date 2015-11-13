/**
 * Created by brentmcivor on 11/11/15.
 */
import pixi from 'pixi.js'
import Howler from 'howler'

//Make sure your assets are imported to ensure that webpack packages hashed versions up into /build
import bunnyPNG from './assets/bunny.png'
import successOGG from './assets/success.ogg'
import successMP3 from './assets/success.mp3'
import musicLoopOGG from './assets/musicLoop.ogg'
import musicLoopMP3 from './assets/musicLoop.mp3'


class PixiHowler{
    constructor(){

    }

    setup(config) {
        // You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
        // which will try to choose the best renderer for the environment you are in.
        this.renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {view:document.getElementById("tutorial")});
        this.renderer.backgroundColor = config.fillColour

        // The renderer will create a canvas element for you that you can then insert into the DOM.
        document.body.appendChild(this.renderer.view);

        // You need to create a root container that will hold the scene you want to draw.
        this.stage = new PIXI.Container();



        this.createText(config.isBrowser)
        this.createButtons()
        this.createBunny()

        setInterval(() => this.createBunny(), 5000)

        // kick off the animation loop (defined below)
        this.animate();
    }

    createBunny(){
        if(!this.bunniesAr){
            this.bunniesAr = []
        }

        var bunnyTexture = new PIXI.Texture.fromImage(bunnyPNG)
        let tempBunny = new PIXI.Sprite(bunnyTexture)

        // Setup the position and scale of the bunny
        tempBunny.position.x = (window.innerWidth - tempBunny.width)/2
        tempBunny.position.y = (window.innerHeight - tempBunny.height)/2

        tempBunny.scale.x = 2;
        tempBunny.scale.y = 2;


        // Add the bunny to the scene we are building.
        this.stage.addChild(tempBunny);

        tempBunny.interactive = true
        tempBunny.buttonMode = true
        tempBunny.anchor.set(0.5)
        tempBunny.scale.set(3)

        tempBunny.on('mousedown', this.onDragStart)
            .on('touchstart', this.onDragStart)
            // events for drag end
            .on('mouseup', this.onDragEnd)
            .on('mouseupoutside', this.onDragEnd)
            .on('touchend', this.onDragEnd)
            .on('touchendoutside', this.onDragEnd)
            // events for drag move
            .on('mousemove', this.onDragMove)
            .on('touchmove', this.onDragMove);

        this.bunniesAr.push(tempBunny)
        this.updateBunnyCounter()
    }

    createText($isBrowser){
        let str = $isBrowser ? "This is browser mode. \nAre you on a computer?" : "This is tablet mode. Are you on a tablet?"
        var text = new PIXI.Text(str)
        text.position.x = window.innerWidth/2 - text.width/2;
        text.position.y = 50;
        this.stage.addChild(text)
    }

    updateBunnyCounter(){
        if(!this.bunnyCountText){
            this.bunnyCountText = new PIXI.Text('No bunnies on stage')
            this.stage.addChild(this.bunnyCountText)
        }
        let numBunnies = this.bunniesAr ? this.bunniesAr.length : 0

        this.bunnyCountText.text = numBunnies + ' bunnies on stage'
        this.bunnyCountText.x = window.innerWidth - this.bunnyCountText.width - 20
        this.bunnyCountText.y = 50
    }

    createButtons(){

        this.btnsContainer = new PIXI.Container()
        this.btnsContainer.x = 50
        this.btnsContainer.y = 175
        this.stage.addChild(this.btnsContainer)

        this.btnInstanceCount = 0

        let clickHowlOGG = this.createSingleButton("click \nHowlOGG")
        clickHowlOGG.click = () => {
            let howl = new Howl({urls: [successOGG]})
            console.log('clickHowlOGG click - Howl = ', howl)
            howl.play()
        }

        let clickHowlMP3 = this.createSingleButton("click \nHowlMP3")
        clickHowlMP3.click = () => {
            let howl = new Howl({urls: [successMP3]})
            console.log('clickHowlMP3 click - Howl = ', howl)
            howl.play()
        }

        let clickAudioOGG = this.createSingleButton("click \nAudioOGG")
        clickAudioOGG.click = () => {
            let audio = new Audio(successOGG);
            console.log('clickAudioOGG click - audio =', audio)
            audio.play();
        }

        let clickAudioMP3 = this.createSingleButton("click \nAudioMP3")
        clickAudioMP3.click = () => {
            let audio = new Audio(successMP3);
            console.log('clickAudioMP3 click - audio = ', audio)
            audio.play();
        }


        ////////////////////////////////////////////////////////////////////////////////////
        let tapHowlOGG = this.createSingleButton("tap \nHowlOGG")
        tapHowlOGG.tap = () => {
            let howl = new Howl({urls: [successOGG]})
            console.log('tapHowlOGG click - howl = ', howl)
            howl.play()
        }

        let tapHowlMP3 = this.createSingleButton("tap \nHowlMP3")
        tapHowlMP3.tap = () => {
            let howl = new Howl({urls: [successMP3]})
            console.log('tapHowlMP3 click - howl = ', howl)
            howl.play()
        }

        let tapAudioOGG = this.createSingleButton("tap \nAudioOGG")
        tapAudioOGG.tap = () => {
            let audio = new Audio(successOGG);
            console.log('tapAudioOGG click - audio = ', audio)
            audio.play();
        }

        let tapAudioMP3 = this.createSingleButton("tap \nAudioMP3")
        tapAudioMP3.tap = () => {
            let audio = new Audio(successMP3);
            console.log('tapAudioMP3 click - audio = ', audio)
            audio.play();
        }

        ////////////////////////////////////////////////////////////////////////////////////
        let tapClickHowlOGG = this.createSingleButton("tap/Click \nHowlOGG")
        tapClickHowlOGG.tap = tapClickHowlOGG.click = () => {
            let howl = new Howl({urls: [successOGG]})
            console.log('tapClickHowlOGG click - howl = ', howl)
            howl.play()
        }

        let tapClickHowlMP3 = this.createSingleButton("tap/Click \nHowlMP3")
        tapClickHowlMP3.tap = tapClickHowlMP3.click = () => {
            let howl = new Howl({urls: [successMP3]})
            console.log('tapClickHowlMP3 click - howl = ', howl)
            howl.play()
        }

        let tapClickAudioOGG = this.createSingleButton("tap/Click \nAudioOGG")
        tapClickAudioOGG.tap = tapClickAudioOGG.click =() => {
            let audio = new Audio(successOGG);
            console.log('tapClickAudioOGG click - audio = ', audio)
            audio.play();
        }

        let tapClickAudioMP3 = this.createSingleButton("tap/Click \nAudioMP3")
        tapClickAudioMP3.tap = tapClickAudioMP3.click = () => {
            let audio = new Audio(successMP3);
            console.log('tapClickAudioMP3 click - audio = ', audio)
            audio.play();
        }

        ////////////////////////////////////////////////////////////////////////////////////
        let touchStartHowlOGG = this.createSingleButton("touchStart \nHowlOGG")
        touchStartHowlOGG.touchStart = () => {
            let howl = new Howl({urls: [successOGG]})
            console.log('touchStartHowlOGG click - howl = ', howl)
            howl.play()
        }

        let touchStartHowlMP3 = this.createSingleButton("touchStart \nHowlMP3")
        touchStartHowlMP3.touchStart = () => {
            let howl = new Howl({urls: [successMP3]})
            console.log('touchStartHowlMP3 click - howl = ', howl)
            howl.play()
        }

        let touchStartAudioOGG = this.createSingleButton("touchStart \nAudioOGG")
        touchStartAudioOGG.touchStart = () => {
            let audio = new Audio(successOGG);
            console.log('touchStartAudioOGG click - audio = ', audio)
            audio.play();
        }

        let touchStartAudioMP3 = this.createSingleButton("touchStart \nAudioMP3")
        touchStartAudioMP3.touchStart = () => {
            let audio = new Audio(successMP3);
            console.log('touchStartAudioMP3 click - audio = ', audio)
            audio.play();
        }

        ////////////////////////////////////////////////////////////////////////////////////
        let touchEndHowlOGG = this.createSingleButton("touchEnd \nHowlOGG")
        touchEndHowlOGG.touchEnd = () => {
            let howl = new Howl({urls: [successOGG]})
            console.log('touchEndHowlOGG click - howl = ', howl)
            howl.play()
        }

        let touchEndHowlMP3 = this.createSingleButton("touchEnd \nHowlMP3")
        touchEndHowlMP3.touchEnd = () => {
            let howl = new Howl({urls: [successMP3]})
            console.log('touchEndHowlMP3 click - howl = ', howl)
            howl.play()
        }

        let touchEndAudioOGG = this.createSingleButton("touchEnd \nAudioOGG")
        touchEndAudioOGG.touchEnd = () => {
            let audio = new Audio(successOGG);
            console.log('touchEndAudioOGG click - audio = ', audio)
            audio.play();
        }

        let touchEndAudioMP3 = this.createSingleButton("touchEnd \nAudioMP3")
        touchEndAudioMP3.touchEnd = () => {
            let audio = new Audio(successMP3);
            console.log('touchEndAudioMP3 click - audio = ', audio)
            audio.play();
        }

        ////////////////////////////////////////////////////////////////////////////////////
        let musicLoopOGGHowl = new Howl({urls: [musicLoopOGG], loop:true})

        let startLoopOGG = this.createSingleButton("startLoop \nOGG")
        startLoopOGG.click = startLoopOGG.tap = () => {
            console.log('startLoopOGG click - musicLoopOGGHowl = ', musicLoopOGGHowl)
            musicLoopOGGHowl.play()
        }

        let pauseLoopOGG = this.createSingleButton("pauseLoop \nOGG")
        pauseLoopOGG.click = pauseLoopOGG.tap = () => {
            let howl = new Howl({urls: [successMP3]})
            console.log('pauseLoopOGG click - musicLoopOGGHowl = ', musicLoopOGGHowl)
            musicLoopOGGHowl.pause()
        }


        let musicLoopMP3Howl = new Howl({urls: [musicLoopMP3], loop:true})
        let startLoopMP3 = this.createSingleButton("startLoop \nMP3")
        startLoopMP3.click = startLoopMP3.tap = () => {
            console.log('startLoopMP3 click - musicLoopMP3Howl = ', musicLoopMP3Howl)
            musicLoopMP3Howl.play();
        }

        let pauseLoopMP3 = this.createSingleButton("pauseLoop \nMP3")
        pauseLoopMP3.click = pauseLoopMP3.tap = () => {
            console.log('pauseLoopMP3 click - musicLoopMP3Howl = ', musicLoopMP3Howl)
            musicLoopMP3Howl.pause();
        }
    }


    createSingleButton(str){
        const lineThickness = 2
        const fillColour = 0x3AA6D0
        const lineColour = 0x000000
        const rectH = 100
        const rectW = 2 * rectH
        const rectXBuffer = 10
        const rectYBuffer = 10
        const numCols = 4

        let xPos = (this.btnInstanceCount % numCols) * (rectW + rectXBuffer)
        let yPos = Math.floor(this.btnInstanceCount/numCols) * (rectH + rectYBuffer)

        let btnContainer = new PIXI.Container()
        btnContainer.x = xPos
        btnContainer.y = yPos
        btnContainer.interactive = true
        this.btnsContainer.addChild(btnContainer)

        var btnBG = new PIXI.Graphics()
        btnBG.lineStyle(lineThickness, lineColour, 1)
        btnBG.beginFill(fillColour, 1)
        btnBG.drawRect(0, 0, rectW, rectH)
        btnContainer.addChild(btnBG)

        var labelText = new PIXI.Text(str)
        labelText.position.x = (btnBG.width - labelText.width)/2
        labelText.position.y = (btnBG.height - labelText.height)/2
        btnContainer.addChild(labelText)

        btnContainer
            // set the mousedown and touchstart callback...
            .on('mousedown', this.onButtonDown)
            .on('touchstart', this.onButtonDown)

            // set the mouseup and touchend callback...
            .on('mouseup', this.onButtonUp)
            .on('touchend', this.onButtonUp)
            .on('mouseupoutside', this.onButtonUp)
            .on('touchendoutside', this.onButtonUp)

            // set the mouseover callback...
            .on('mouseover', this.onButtonOver)

            // set the mouseout callback...
            .on('mouseout', this.onButtonOut)


        this.btnInstanceCount++
        return btnContainer
    }





    onButtonOver(){
        this.alpha = 0.8
    }

    onButtonDown(){
        this.alpha = 0.3
    }

    onButtonUp(){
        this.alpha = 1
    }

    onButtonOut(){
        this.alpha = 1
    }


    animate() {
        // start the timer for the next animation loop
        requestAnimationFrame(() => this.animate());

        if(this.bunniesAr) {
            this.bunniesAr.forEach(bunny => bunny.rotation += 0.1)
        }

      //  if(this.bunny) {
        //    // each frame we spin the bunny around a bit
          //  this.bunny.rotation += 0.1;
       // }

        // this is the main render call that makes pixi draw your container and its children.
        this.renderer.render(this.stage);
    }

    onDragStart(event){
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }

    onDragEnd(){
        this.alpha = 1;

        this.dragging = false;

        // set the interaction data to null
        this.data = null;
    }

    onDragMove(){
        if (this.dragging){
            var newPosition = this.data.getLocalPosition(this.parent);
            this.position.x = newPosition.x;
            this.position.y = newPosition.y;
        }
    }
}

export default PixiHowler