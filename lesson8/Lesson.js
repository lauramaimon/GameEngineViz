"use strict";

// main class
class Lesson8Game extends Game {

    // initialization
    constructor(canvas) {
        super("Puzzle eight", 800, 600, canvas);
        this.ghost = new SadGhost("ghost", 450, 210);
        this.mario = new Mario("mario", 0, 280);
        this.door = new Door("door", 600, 133, 5);
        this.floor = new Floor("floor", 0, 400);
        this.door.addAnimation("open", 0, 4, false);
        this.winAnimationFrame = 0;

        this.ghost.scaleX = 1.8;
        this.ghost.scaleY = 1.8;
        this.door.scaleX = 3.2;
        this.door.scaleY = 3.2;

        this.addChild(this.door);
        this.addChild(this.floor);
        this.addChild(this.ghost);
        this.addChild(this.mario);

        let timeHappy = 0;
        this.incTimeHappy = () => { timeHappy += 1; };
        this.getTimeHappy = () => { return timeHappy; };



    }

    // invoked every frame
    update(pressedKeys, gamepads) {
        super.update(pressedKeys);

        if (this.ghost.getMood() == 120) {
            this.incTimeHappy();
        } 

        if (this.mario.collidesWith(this.ghost)) {
            this.ghost.hug();
        }

        // Win condition - fulfill these requirements to complete the challenge!
        // The ghost must have been happy for at least 60 frames
        if (this.getTimeHappy() > 60) {
            if (this.winAnimationFrame >= 50) {
                var complete = new Event("complete");
                window.parent.document.dispatchEvent(complete);
            }

            this.door.playAnimation("open");
            this.winAnimationFrame += 1;
            this.ghost.y -= 5;
            this.ghost.x += Math.sin(0.1 * this.winAnimationFrame);
            this.ghost.goToFrame(2);
            this.ghost.msg = "The ghost looks kinda happy!";
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
    var game = new Lesson8Game(drawingCanvas);
    game.start();
}

