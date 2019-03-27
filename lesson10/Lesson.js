"use strict";

// main class
class Lesson10Game extends Game {

    // initialization
    constructor(canvas) {
        super("Puzzle ten", 800, 600, canvas);
        this.knight = new Knight("knight", 100, 200);
        this.door = new Door("door", 600, 133, 5);
        this.floor = new Floor("floor", 0, 400);
        this.door.addAnimation("open", 0, 4, false);
        this.winAnimationFrame = 0;
        this.door.scaleX = 3.2;
        this.door.scaleY = 3.2;
        this.addChild(this.door);
        this.addChild(this.floor);
        this.addChild(this.knight);
        this.frameNum = 0;
        this.repeat = 740;
    }

    // invoked every frame
    update(pressedKeys, gamepads) {
        super.update(pressedKeys);

        let x = 0
        if (this.frameNum % this.repeat == 0) {
            // move right
            this.addKey(39);
        } else if (this.frameNum % this.repeat == 120) {
            // stop
            this.removeKey(39);
        } else if (this.frameNum % this.repeat == 180) {
            // move left
            this.addKey(37);
        } else if (this.frameNum % this.repeat == 300) {
            // stop
            this.removeKey(37);
        } else if (this.frameNum % this.repeat == 380) {
            // jump
            this.addKey(38);
        } else if (this.frameNum % this.repeat == 440) {
            // jump and move right
            this.addKey(39);
        } else if (this.frameNum % this.repeat == 560) {
            // jump and move left
            this.removeKey(39);
            this.addKey(37);
        } else if (this.frameNum % this.repeat == 680) {
            // stop
            this.removeKey(37);
            this.removeKey(38);
        }

        let result = checkIfAnimated(this);

        // Win condition - fulfill these requirements to complete the challenge!
        if (result == 0) {
            if (this.winAnimationFrame >= 50) {
                var complete = new Event("complete");
                window.parent.document.dispatchEvent(complete);
            }

            this.door.playAnimation("open");
            this.winAnimationFrame += 1;
        } else if (result == -2) {
            console.log("Your knight's sprite should flip based on which direction he is moving or was last moving")
        } else if (result == -3) {
            console.log("Your knight's walk animation should play")
        } else if (result == -4) {
            console.log("Your knight should stand if he is not in motion")
        } else if (result == -5) {
            console.log("Your knight should play the upward jumping animation while he has upward velocity")
        } else if (result == -6) {
            console.log("Your knight should play the downward jumping animation while he has downward velocity")
        } else if (result == -7) {
            console.log("Your knight should play the jumping animations even if he is moving left or right")
        }

        this.frameNum += 1;
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
    var game = new Lesson10Game(drawingCanvas);
    game.start();
}

