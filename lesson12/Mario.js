"use strict";

class Mario extends Sprite {

    constructor(id, posX, posY){
        super(id, "Mario.png");
        this.x = posX;
        this.y = posY;
        this.xspeed = 0;
        this.yspeed = 0;
        this.frameNum = 0;
        this.jumping = false;
        this.facingRight = true;
        this.pivotX = 18;
        this.pivotY = 26;
    }

    // invoked every frame
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);

        let origx = this.x;
        let origy = this.y;

        if (pressedKeys.contains(37)) {
            this.xspeed = -3;
            this.yspeed = 0;
            this.facingRight = false;
        }
        else if (pressedKeys.contains(38)) {
            this.xspeed = 0;
            this.yspeed = -3;
        }
        else if (pressedKeys.contains(39)) {
            this.xspeed = 3;
            this.yspeed = 0;
            this.facingRight = true;
        }
        else if (pressedKeys.contains(40)) {
            this.xspeed = 0;
            this.yspeed = 3;
        } 
        else {
            this.xspeed = 0;
            this.yspeed = 0;
        }

        this.applyVelocity();

        let moveBack = false;
        Lesson12Game.rocks.forEach((rock) => {
            // can't walk through rocks
            if (this.collidesWithAABB(rock)) {
                moveBack = true;
            }
            // can't walk offscreen
            else if (this.x < 8 || this.x > 767 || this.y < 10 || this.y > 550) {
                moveBack = true;
            }
        });
        if (moveBack) {
            this.x = origx;
            this.y = origy;
        }

        this.frameNum += 1;
    }

    applyVelocity() {
        this.x += this.xspeed;
        this.y += this.yspeed;


    }

    pause() {
        this.update = () => {};
    }

    
    draw(g){
        super.draw(g);
    }

    moveX(distance) {
        this.x = this.x + distance;
    }
    
    moveY(distance) {
        this.y = this.y + distance;
    }
}