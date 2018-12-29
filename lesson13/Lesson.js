"use strict";

// main class
class Lesson13Game extends Game {

    // initialization
    constructor(canvas) {
        super("Puzzle thirteen", 800, 600, canvas);
        this.door = new Door("door", 600, -1190, 5);
        this.mario = new Mario("mario", 400, 200);
        Lesson13Game.floor = new Floor("floor", 0, 500);
        this.leftfloor = new Floor("leftfloor", -700, -1005);
        this.rightfloor = new Floor("rightfloor", 500, -1005);
        this.leftwall = new Wall("leftwall", -700, -1000);
        this.rightwall = new Wall("rightwall", 500, -1000);
        this.spikes1 = new Spikes("spikes1", 290, 200);
        this.spikes2 = new Spikes("spikes2", 290, -300);
        this.spikes3 = new Spikes("spikes3", 500, -30);
        this.spikes4 = new Spikes("spikes4", 290, -500);
        this.spikes5 = new Spikes("spikes5", 500, -850);
        this.spikes3.scaleX = -1;
        this.spikes5.scaleX = -1;

        this.spikes = [this.spikes1, this.spikes2, this.spikes3, this.spikes4, this.spikes5];
        this.allObjects = [
            this.mario, 
            this.spikes1, 
            this.spikes2,
            this.spikes3,
            this.spikes4,
            this.spikes5,
            this.leftwall, 
            this.rightwall, 
            Lesson13Game.floor, 
            this.leftfloor, 
            this.rightfloor, 
            this.door
        ]; // you might need this array for scrolling!

        this.door.addAnimation("open", 0, 4, false);
        this.winAnimationFrame = 0;
        this.mario.scaleX = .55;
        this.mario.scaleY = .55;
        this.leftfloor.scaleY = 0.01;
        this.rightfloor.scaleY = 0.01;
        this.leftwall.scaleY = 5;
        this.rightwall.scaleY = 5;
        this.door.scaleX = 2.4;
        this.door.scaleY = 2.4;
        this.dead = 100;
        this.onground = false;
        this.won = false;
        this.deadText =this.getImage('youdied.png');
        

        this.addChild(this.door);
        this.addChild(this.spikes1);
        this.addChild(this.spikes2);
        this.addChild(this.spikes3);
        this.addChild(this.spikes4);
        this.addChild(this.spikes5);
        this.addChild(this.mario);
        this.addChild(this.leftwall);
        this.addChild(this.rightwall);
        this.addChild(this.leftfloor);
        this.addChild(this.rightfloor);
        this.addChild(Lesson13Game.floor);
    }

    // invoked every frame
    update(pressedKeys, gamepads) {
        super.update(pressedKeys);

        // spikes are deadly!
        this.spikes.forEach((spikes) => {
            if (this.mario.collidesWith(spikes)) {
                this.dead = 0;
            }
        });
        if (this.dead == 0) {
            this.mario.x = 400;
            this.mario.y = 200;
            this.mario.stopped = true;
        }
        if (this.dead == 45) {
            this.mario.stopped = false;
        }
        this.dead += 1;


        // keep track of current wall collisions
        if (this.mario.collidesWith(this.leftwall)) {
            this.mario.leftJump = true;
        } else {
            this.mario.leftJump = false;
        }
        if (this.mario.collidesWith(this.rightwall)) {
            this.mario.rightJump = true;
        } else {
            this.mario.rightJump = false;
        }
        
        let result = checkWallJumping(this);

        // Win condition - fulfill these requirements to complete the challenge!
        // (Get to the top!)
        if (this.won) {
            if (result > 6) {
                if (this.winAnimationFrame >= 50) {
                    var complete = new Event("complete");
                    window.parent.document.dispatchEvent(complete);
                    this.mario.stopped = true;
                }

                this.door.playAnimation("open");
                this.winAnimationFrame += 1;
            } else {
                window.parent.document.dispatchEvent(new CustomEvent("error", {detail: {msg: "You didn't touch the wall enough times - make you are wall jumping!"}}));
                this.pause();
            }
        }


        // handle the tops of the walls
        if (this.mario.x < this.leftfloor.x + 997) {
            if (this.mario.y > this.leftfloor.y - 53) {
                this.mario.y = this.leftfloor.y - 53;
                this.mario.jumping = false;
            }
            this.won = true;
        }
        if (this.mario.x > this.rightfloor.x) {
            if (this.mario.y > this.rightfloor.y - 53) {
                this.mario.y = this.rightfloor.y - 53;
                this.mario.jumping = false;
            }
            this.won = true;
        }

        // keep track of a global y position for scrolling
        this.mario.globaly = this.mario.y;
        
        // Vertical distance between the center
        // of the screen and mario's (would-be)
        // y position. AKA, the amount to move the 
        // whole scene down by.
        let diff = 300 - this.mario.y;

        // your code to scroll vertically! 



    }

    
    draw(g) {
        g.clearRect(0, 0, this.width, this.height);    
        super.draw(g);
        if (this.dead < 45) {
            g.drawImage(this.deadText,190,220);
        }
    }


    getImage(filename) {
        if(filename != null){
            var t = this;
            var displayImage = new Image();
            displayImage.onload = function(){
                t.loaded = true;
            };
            displayImage.src = 'resources/' + filename;
        }
        return displayImage;
    }
}



function tick() {
    game.nextFrame();
}

var drawingCanvas = document.getElementById('game');
if (drawingCanvas.getContext) {
    var game = new Lesson13Game(drawingCanvas);
    game.start();
}

