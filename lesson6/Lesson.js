"use strict";

// main class
class Lesson6Game extends Game {

    // initialization
    constructor(canvas) {
        super("Puzzle six", 800, 600, canvas);
        this.mario = new Mario("mario", 0, 100);
        this.toad = new Toad("toad", 50, 400);
        this.greenbutton = new GreenButton("mainbutton", 0, 225);
        this.bluebutton = new BlueButton("bluebutton", 450, 225)

        this.door = new Door("door", 615, 130, 5);
        this.door.scaleX = 3.2;
        this.door.scaleY = 3.2;
        this.door.addAnimation("open", 0, 4, false);
        this.win_animation_frame = 0;

        this.addChild(this.door);
        this.addChild(this.greenbutton);
        this.addChild(this.bluebutton);
        this.addChild(this.toad);
        this.addChild(this.mario);


    }

    // invoked every frame
    update(pressedKeys, gamepads) {
        super.update(pressedKeys);

        let colliding = this.mario.collidesWith(this.bluebutton) || this.toad.collidesWith(this.bluebutton)
        if (colliding && !this.bluebutton.state != BlueButton.state.locked && this.greenbutton.pressed) {
            // to lock a blue button, press the blue button and the green button simultaneously
            this.bluebutton.dispatchEvent(new CustomEvent("onLockDown", {detail: this.bluebutton}));
        }
        else if (colliding && this.bluebutton.state != BlueButton.state.locked && !this.greenbutton.pressed) {
            this.bluebutton.dispatchEvent(new CustomEvent("onPressDown", {detail: this.bluebutton}));
        }
        else if (!colliding && this.bluebutton.state == BlueButton.state.pressed) {
            this.bluebutton.dispatchEvent(new CustomEvent("onPressUp", {detail: this.bluebutton}));
        }

        colliding = this.mario.collidesWith(this.greenbutton)
        if (colliding && !this.greenbutton.pressed) {
            this.greenbutton.dispatchEvent(new CustomEvent("onPressDown", {detail: this.greenbutton}));
        }
        else if (!colliding && this.greenbutton.pressed) {
            this.greenbutton.dispatchEvent(new CustomEvent("onPressUp", {detail: this.greenbutton}));
        }

        // add code to pick up and drop toad!
        // hint: check out the usage of addChild in the constructor of this class
        //       there is also a matching removeChild



        // Win condition - fulfill these requirements to complete the challenge!
        if (this.bluebutton.state == BlueButton.state.locked) {
            if (this.win_animation_frame >= 50) {
                console.log(this.win_animation_frame);
                var complete = new Event("complete");
                window.parent.document.dispatchEvent(complete);
            }

            this.door.playAnimation("open");
            this.win_animation_frame += 1;
        }
    }

    
    draw(g) {
        g.clearRect(0, 0, this.width, this.height);
        super.draw(g);
    }
}



function tick() {
    game.nextFrame();
}

var drawingCanvas = document.getElementById('game');
if (drawingCanvas.getContext) {
    var game = new Lesson6Game(drawingCanvas);
    game.start();
}

