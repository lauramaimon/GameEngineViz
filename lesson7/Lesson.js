"use strict";

// main class
class Lesson7Game extends Game {

    // initialization
    constructor(canvas) {
        super("Puzzle seven", 800, 600, canvas);
        Lesson7Game.monitor = new Monitor();
        this.mario = new Mario("mario", 0, 100);
        this.toad = new Toad("toad", 50, 400);
        this.greenbutton = new GreenButton("mainbutton", 0, 225);
        this.bluebuttons = [
            new BlueButton("upperbutton", 350, 0), 
            new BlueButton("middlebutton", 450, 225), 
            new BlueButton("lowerbutton", 350, 450)
        ];

        this.door = new Door("door", 615, 130, 5);
        this.door.scaleX = 3.2;
        this.door.scaleY = 3.2;
        this.door.addAnimation("open", 0, 4, false);
        this.win_animation_frame = 0;

        // all objects are initially a child of the game
        this.bluebuttons.forEach((button) => this.addChild(button));
        this.addChild(this.door);
        this.addChild(this.greenbutton);
        this.addChild(this.toad);
        this.addChild(this.mario);


    }

    // invoked every frame
    update(pressedKeys, gamepads) {
        super.update(pressedKeys);
        this.bluebuttons.forEach((button) => {
            let colliding = this.mario.collidesWith(button) || this.toad.collidesWith(button)
            if (colliding && button.getState() != BlueButton.state.locked && this.greenbutton.getPressed()) {
                button.dispatchEvent(new CustomEvent("onLockDown", {detail: button}));
            }
            else if (colliding && button.getState() != BlueButton.state.locked && !this.greenbutton.getPressed()) {
                button.dispatchEvent(new CustomEvent("onPressDown", {detail: button}));
            }
            else if (!colliding && button.getState() == BlueButton.state.pressed) {
                button.dispatchEvent(new CustomEvent("onPressUp", {detail: button}));
            }
        });
        let colliding = this.mario.collidesWith(this.greenbutton)
        if (colliding && !this.greenbutton.getPressed()) {
            this.greenbutton.dispatchEvent(new CustomEvent("onPressDown", {detail: this.greenbutton}));
        }
        else if (!colliding && this.greenbutton.getPressed()) {
            this.greenbutton.dispatchEvent(new CustomEvent("onPressUp", {detail: this.greenbutton}));
        }
        let start = Lesson7Game.monitor.numCalls()

        // add code to pick up and drop toad!
        // hint: check out the usage of addChild in the constructor of this class
        //       there is also a matching removeChild
        // hint: to check if a key is currently being pressed down, you can use
        //       pressedKeys.contains(n) where n is a integer key code



        if (Lesson7Game.monitor.numCalls() > start) {
            window.parent.document.dispatchEvent(new CustomEvent("error", {detail: {msg: "You accessed a forbidden function!"}}));
            this.pause();
        }
        // Win condition - fulfill these requirements to complete the challenge!
        if (this.bluebuttons[0].getState() == BlueButton.state.locked && 
            this.bluebuttons[1].getState() == BlueButton.state.locked && 
            this.bluebuttons[2].getState() == BlueButton.state.locked) {
            if (this.win_animation_frame >= 50) {
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
    var game = new Lesson7Game(drawingCanvas);
    game.start();
}

