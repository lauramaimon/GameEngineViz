"use strict";

// main class
class Lesson4Game extends Game {

    // initialization
    constructor(canvas) {
        super("Puzzle four", 800, 600, canvas);

        this.bow = new Bow("bow", 0, 165);
        this.door = new Door("door", 615, 98, 5);
        this.scenery = new Scenery("scenery", 0, 0, canvas);
        this.addChild(this.scenery);
        this.addChild(this.door);
        this.addChild(this.bow);
        this.door.scaleX = 3.2;
        this.door.scaleY = 3.2;
        this.door.addAnimation("open", 0, 4, false);
        this.win_animation_frame = 0;
        
        Lesson4Game.targ = new Target("target", 650, 170);

        // this keeps track of the current frame number in the game
        Lesson4Game.frame_num = 0;
        // this is the rate at which the target flashes
        Lesson4Game.target_rate = 30;
        // keeps track of the number of arrows in the game
        Lesson4Game.num_arrows = 0;

        this.xPos = 0;
        this.yPos = 0;

    }

    // invoked every frame
    update(pressedKeys, gamepads) {
        super.update(pressedKeys);
        Lesson4Game.targ.update(pressedKeys);
        Lesson4Game.frame_num += 1;


        // Win condition - fulfill these requirements to complete the challenge!
        if (Lesson4Game.targ.hitcount == 20 && Lesson4Game.num_arrows <= 20) {
            if (this.scenery.finished) {
                var complete = new Event("complete");
                window.parent.document.dispatchEvent(complete);
            }
            if (this.win_animation_frame == 0) {
                this.scenery.animate();
                this.door.open();
            }
            Lesson4Game.targ.alpha = 0.0;
            this.win_animation_frame += 1;
        }
    }

    
    draw(g) {
        g.clearRect(0, 0, this.width, this.height);
        super.draw(g);
        g.translate(this.xPos, this.yPos);
        Lesson4Game.targ.draw(g);
        g.translate(-1*this.xPos, -1*this.yPos);
    }
}

function tick() {
    game.nextFrame();
}

var drawingCanvas = document.getElementById('game');
if (drawingCanvas.getContext) {
    var game = new Lesson4Game(drawingCanvas);
    game.start();
}

