"use strict";

// main class
class Lesson9Game extends Game {

    // initialization
    constructor(canvas) {
        super("Puzzle nine", 800, 600, canvas);
        this.mario = new Mario("mario", 0, 280);
        this.door = new Door("door", 600, 133, 5);
        this.floor = new Floor("floor", 0, 400);
        this.door.addAnimation("open", 0, 4, false);
        this.winAnimationFrame = 0;
        this.door.scaleX = 3.2;
        this.door.scaleY = 3.2;
        this.addChild(this.door);
        this.addChild(this.floor);
        this.addChild(this.mario);
        this.time = 50 * 60;
        Lesson9Game.happyGhosts = [];
        Lesson9Game.ghosts = []
        let ghost = new SadGhost("ghost" + this.time, 450, 210)
        Lesson9Game.ghosts.push(ghost);
        this.addChild(ghost);
        ghost.scaleX = 1.8;
        ghost.scaleY = 1.8;
        

    }

    // invoked every frame
    update(pressedKeys, gamepads) {
        super.update(pressedKeys);

        this.time--;

        if (Lesson9Game.ghosts.length < 3) {
            if (Math.random() < 0.005) {
                let ghost = new SadGhost("ghost" + this.time, 100 + (Math.random() * 450), 210)
                Lesson9Game.ghosts.push(ghost);
                this.addChild(ghost);
                ghost.scaleX = 1.8;
                ghost.scaleY = 1.8;


            }
        }

        // mario hugs a ghost every frame that he is colliding with it
        // this seems like an awkward quantity of hugging
        Lesson9Game.ghosts.forEach((ghost) => {
            if (this.mario.collidesWith(ghost)) {
                ghost.hug();
            }
        });


        if (this.time <= 0 && Lesson9Game.happyGhosts.length <= 5) {
            window.parent.document.dispatchEvent(new CustomEvent("error", {detail: {msg: "You ran out of time!"}}));
            this.pause();
        }

        // Win condition - fulfill these requirements to complete the challenge!
        // At least 6 ghosts must have been happy for at least 60 frames
        if (Lesson9Game.happyGhosts.length > 5) {
            if (this.winAnimationFrame >= 50) {
                var complete = new Event("complete");
                window.parent.document.dispatchEvent(complete);
            }

            this.door.playAnimation("open");
            this.winAnimationFrame += 1;
        }
    }

    
    draw(g) {
        g.clearRect(0, 0, this.width, this.height);
        super.draw(g);
        g.font = "24px courier";
        g.textAlign = "center"; 
        g.fillStyle = "#ffcc00";
        g.fillText(Math.floor(this.time / 60), 50, 50);
    }
}



function tick() {
    game.nextFrame();
}

var drawingCanvas = document.getElementById('game');
if (drawingCanvas.getContext) {
    var game = new Lesson9Game(drawingCanvas);
    game.start();
}

