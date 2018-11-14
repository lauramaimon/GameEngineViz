"use strict";

/**
 * Main class
 */
class Lesson5Game extends Game {

    // initialization
    constructor(canvas) {
        super("Puzzle five", 800, 600, canvas);
        this.mario = new Mario("mario", 0, 100);
        this.toad = new Toad("toad", 50, 400);
        this.greenbutton = new GreenButton("mainbutton", 0, 225);
        this.bluebuttons = [
            new BlueButton("upperbutton", 350, 0), 
            new BlueButton("middlebutton", 450, 225), 
            new BlueButton("lowerbutton", 350, 450)
        ];
        this.bluebuttons.forEach((button) => this.addChild(button));

        this.door = new Door("door", 615, 130, 5);
        this.door.scaleX = 3.2;
        this.door.scaleY = 3.2;
        this.door.addAnimation("open", 0, 4, false);
        this.win_animation_frame = 0;

        this.addChild(this.door);
        this.addChild(this.greenbutton);
        this.addChild(this.toad);
        this.addChild(this.mario);


    }

    /*
     * This is the update loop. 
     * Here, game state will be updated according to user input and game mechanics.
     * The code within this function will run 60 times per second.
     */
    update(pressedKeys, gamepads) {
        super.update(pressedKeys);
        this.bluebuttons.forEach((button) => {
            let colliding = this.mario.collidesWith(button) || this.toad.collidesWith(button)
            if (colliding && !(button.state == BlueButton.state.locked) && this.greenbutton.pressed) {
                button.dispatchEvent(new CustomEvent("onLockDown", {detail: button}));
            }
            else if (colliding && !(button.state == BlueButton.state.locked) && !this.greenbutton.pressed) {
                button.dispatchEvent(new CustomEvent("onPressDown", {detail: button}));
            }
            else if (!colliding && button.state == BlueButton.state.pressed) {
                button.dispatchEvent(new CustomEvent("onPressUp", {detail: button}));
            }
        });
        let colliding = this.mario.collidesWith(this.greenbutton)
        if (colliding && !this.greenbutton.pressed) {
            this.greenbutton.dispatchEvent(new CustomEvent("onPressDown", {detail: this.greenbutton}));
        }
        else if (!colliding && this.greenbutton.pressed) {
            this.greenbutton.dispatchEvent(new CustomEvent("onPressUp", {detail: this.greenbutton}));
        }



        // Win condition - fulfill these requirements to complete the challenge!
        if (this.bluebuttons[0].state == BlueButton.state.locked && 
            this.bluebuttons[1].state == BlueButton.state.locked && 
            this.bluebuttons[2].state == BlueButton.state.locked) {
            // TODO: obfuscate this such that students can't run this
            if (this.win_animation_frame >= 50) {
                console.log(this.win_animation_frame);
                var complete = new Event("complete");
                window.parent.document.dispatchEvent(complete);
            }

            this.door.playAnimation("open");
            this.win_animation_frame += 1;
        }
    }

    /*
     * This is the draw loop.
     * Here, visible elements will be updated on screen.
     * Similarly to update(), draw() will run 60 times per second immediately following update.
     */
    draw(g) {
        g.clearRect(0, 0, this.width, this.height);
        super.draw(g);
    }
}


/**
 * THIS IS THE BEGINNING OF THE PROGRAM
 * YOU NEED TO COPY THIS VERBATIM ANYTIME YOU CREATE A GAME
 */
function tick() {
    game.nextFrame();
}

var drawingCanvas = document.getElementById('game');
if (drawingCanvas.getContext) {
    var game = new Lesson5Game(drawingCanvas);
    game.start();
}

