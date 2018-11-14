"use strict";

/**
 * Main class. Instantiate or extend Game to create a new game of your own
 */
class Lesson4Game extends Game {

    // initialization
    constructor(canvas) {
        super("Puzzle four", 800, 600, canvas);

        this.bow = new Bow("bow", 0, 175);
        this.door = new Door("door", 615, 130, 5);
        this.addChild(this.door);
        this.addChild(this.bow);
        this.door.scaleX = 3.2;
        this.door.scaleY = 3.2;
        this.door.addAnimation("open", 0, 4, false);
        this.win_animation_frame = 0;
        
        Lesson4Game.targ = new Target("target", 650, 200);

        /* this keeps track of the current frame number in the game */
        Lesson4Game.frame_num = 0;
        /* this is the rate at which the target flashes */
        Lesson4Game.target_rate = 30;
        /* keeps track of the number of arrows in the game */
        Lesson4Game.num_arrows = 0;

        this.xPos = 0;
        this.yPos = 0;

    }

    /*
     * This is the update loop. 
     * Here, game state will be updated according to user input and game mechanics.
     * The code within this function will run 60 times per second.
     */
    update(pressedKeys, gamepads) {
        super.update(pressedKeys);
        // this.bow.update(pressedKeys);
        // this.door.update(pressedKeys);
        Lesson4Game.targ.update(pressedKeys);
        Lesson4Game.frame_num += 1;


        // Win condition - fulfill these requirements to complete the challenge!
        // this should be hidden... 
        if (Lesson4Game.targ.hitcount == 20 && Lesson4Game.num_arrows <= 20) {
            // TODO: obfuscate this such that students can't run this
            if (this.win_animation_frame >= 50) {
                console.log(this.win_animation_frame);
                var complete = new Event("complete");
                window.parent.document.dispatchEvent(complete);
            }

            this.door.playAnimation("open");
            Lesson4Game.targ.alpha = 0.0;
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
        g.translate(this.xPos, this.yPos);
        // this.bow.draw(g);
        // this.door.draw(g);
        Lesson4Game.targ.draw(g);
        g.translate(-1*this.xPos, -1*this.yPos);
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
    var game = new Lesson4Game(drawingCanvas);
    game.start();
}

