"use strict";

// main class
class Lesson11Game extends Game {

    // initialization
    constructor(canvas) {
        super("Puzzle eleven", 800, 600, canvas);
        this.door = new Door("door", 635, 300, 5);
        this.floor = new Floor("floor", 0, 500);
        this.mario = new Mario("mario", 0, 400);
        this.door.addAnimation("open", 0, 4, false);
        this.winAnimationFrame = 0;
        this.mario.scaleX = .65;
        this.mario.scaleY = .65;
        this.door.scaleX = 2.4;
        this.door.scaleY = 2.4;
        Lesson11Game.fail = this.fail;
        Lesson11Game.mario = this.mario;

        this.blocks = [[], [], []];

        let blockNums = [1, 7, 9, 10, 15, 2, 4, 6, 8, 11, 12, 14, 16, 17, 3, 5, 13, 18, 19];
        this.numBlocks = blockNums.length;
        let x = 100;
        let y = 440;
        let count = 0;
        let index = 0;
        let stack = this.blocks[0];
        blockNums.forEach((num) => {
            count += 1;
            if (count == 6 || count == 15) {
                index++;
                x += 200;
                y = 440;
                stack = this.blocks[index];
            }
            let block = new Block("block", x, y, num);
            stack.push(block);
            this.addChild(block);
            y -= 60;

        });

        this.frameNum = 0;

        this.addChild(this.door);
        this.addChild(this.floor);
        this.addChild(this.mario);


    }

    // invoked every frame
    update(pressedKeys, gamepads) {
        super.update(pressedKeys);

        // hint: to check for collisions, use this.mario.collidesWithAABB(object)
        // it will return 0 if no collision occured and nonzero if a collision occured


        for (let i = 0; i < 3; i++) {
            this.blocks[i].forEach((block) => {
                
                if (this.blocks[i].length > 0 && this.mario.collidesWithAABB(block) != 0) {
                    this.kickBlock(i);
                }


            });
        }


        // Win condition - fulfill these requirements to complete the challenge!
        // Kick all the blocks in the correct order!
        if (!Block.outOfOrder && Block.numKicked == this.numBlocks) {
            if (this.winAnimationFrame >= 50) {
                var complete = new Event("complete");
                window.parent.document.dispatchEvent(complete);
            }

            this.door.playAnimation("open");
            this.winAnimationFrame += 1;
        }
    }


    kickBlock(stackNum) {
        let stack = this.blocks[stackNum];
        if (stack.length < 1) {
            return;
        }
        let block = stack.shift();
        block.kick(this.mario.facingRight);
        stack.forEach((block) => {
            block.drop();
        });
    }


    fail() {
        if (Block.outOfOrder) return;
        Block.outOfOrder = true;
        window.parent.document.dispatchEvent(new CustomEvent("error", {detail: {msg: "GAME OVER - You kicked the blocks out of order"}}));
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
    var game = new Lesson11Game(drawingCanvas);
    game.start();
}

