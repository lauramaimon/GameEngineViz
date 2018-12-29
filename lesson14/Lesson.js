"use strict";

// main class
class Lesson14Game extends Game {

    // initialization
    constructor(canvas) {
        super("Puzzle fourteen", 800, 600, canvas);
        this.door = new Door("door", 653, 242, 5);
        this.mario = new Mario("mario", 60, 250);
        this.leftfloor = new Floor("leftfloor", -535, 400);
        this.rightfloor = new Floor("rightfloor", 615, 400);
        this.lowerfloor = new Floor("lowerfloor", 0, 570);
        this.ceiling = new Floor("ceiling", 0, -320);
        this.gate = new Gate("gate", 618, 180);
        this.button = new Button("button", 495, 530);
        this.dragon = new Dragon("dragon", 100, 257);

        // you can use these to implement invincibility frames
        this.invincibilityFrames = 60;
        this.timeSinceLastHit = this.invincibilityFrames;

        this.door.addAnimation("open", 0, 4, false);
        this.winAnimationFrame = 0;
        this.mario.scaleX = .55;
        this.mario.scaleY = .55;
        this.door.scaleX = 2;
        this.door.scaleY = 2;
        this.won = false;



        

        this.addChild(this.gate);
        this.addChild(this.door);
        this.addChild(this.ceiling);
        this.addChild(this.dragon);
        this.addChild(this.leftfloor);
        this.addChild(this.rightfloor);
        this.addChild(this.lowerfloor);
        this.addChild(this.button);
        this.addChild(this.mario);
    }

    // invoked every frame
    update(pressedKeys, gamepads) {
        super.update(pressedKeys);

        this.handleGate();
        this.handleButton();
        this.handleDragon();

        // Win condition - fulfill these requirements to complete the challenge!
        // Lift the gate and get to the door! You have to lose some health to do this
        if (!this.gate.up && this.mario.collidesWith(this.door) && this.mario.getHealth() < 20) {
            if (this.winAnimationFrame >= 50) {
                var complete = new Event("complete");
                window.parent.document.dispatchEvent(complete);
                this.pressedKeys.clear();
            }

            this.door.playAnimation("open");
            this.winAnimationFrame += 1;
        }
    }

    handleDragon() {


        if (this.mario.collidesWith(this.dragon)) {
            if (!this.dragon.pushed)
                this.dragon.push();
            this.mario.slow = true;


            this.mario.takeDamage();


        }
        else {
            this.mario.slow = false;
        }
    }

    handleGate() {
        if (this.gate.up && this.mario.collidesWithAABB(this.gate)) {
            this.mario.x = this.gate.x - 10;
        }
    }

    handleButton() {
        let collision = this.mario.collidesWithAABB(this.button) || this.dragon.collidesWithAABB(this.button);
        if (collision) {
            this.button.pressed = true;
            if (this.gate.up) {
                this.gate.lower();
            }
        } else {
            this.button.pressed = false;
        }
    }

    
    draw(g) {
        g.clearRect(0, 0, this.width, this.height);
        super.draw(g);
        g.font = "24px courier";
        g.textAlign = "center"; 
        g.fillStyle = "#f45858";
    }
}



function tick() {
    game.nextFrame();
}

var drawingCanvas = document.getElementById('game');
if (drawingCanvas.getContext) {
    var game = new Lesson14Game(drawingCanvas);
    game.start();
}

