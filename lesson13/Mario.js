"use strict";

class Mario extends Sprite {

    constructor(id, posX, posY){
        super(id, "Mario.png");
        this.x = posX;
        this.y = posY;
        this.pivotX = 34;
        this.facingRight = true;

        this.xspeed = 0;
        this.yspeed = 0;

        // whether mario jump is currently allowed to jump
        this.canJump = false;
        this.onLeftWall = false;
        this.onRightWall = false;
        this.onWall = false;

        this.walkSpeed = 6;
        this.jumpSpeed = -11;
        this.ignoreGravity = false;
        this.stopped = false;
    }

    // invoked every frame
    update(pressedKeys, gamePads){
        if (this.stopped)
            pressedKeys.clear();
        
        super.update(pressedKeys, gamePads);

        this.onWall = this.onLeftWall || this.onRightWall;

        if (pressedKeys.contains(37) && !this.onWall) {
            this.xspeed = -this.walkSpeed;
            this.facingRight = false;
            if (this.scaleX > 0)
                this.scaleX = - this.scaleX;
        } 
        else if (pressedKeys.contains(39) && !this.onWall) {
            this.xspeed = this.walkSpeed;
            this.facingRight = true;
            if (this.scaleX < 0)
                this.scaleX = - this.scaleX;
        } 
        else {
            this.xspeed = 0;
        }
        if (pressedKeys.contains(38) && this.canJump) {
            this.yspeed = this.jumpSpeed;
            this.canJump = false;
        }
        if (this.onWall) {


            this.yspeed = 0.1;
            this.xspeed = 0;
        }
        if (this.onLeftWall && pressedKeys.contains(39)) {
            this.xspeed = this.walkSpeed;
        }
        if (this.onRightWall && pressedKeys.contains(37)) {
            this.xspeed = -this.walkSpeed;
        }

        this.applyGravity();
        this.applyVelocity();

        this.frameNum += 1;
    }

    applyVelocity() {
        let oldy = this.y;
        this.x += this.xspeed;
        this.y += this.yspeed;
        // makes sure you don't fall through the floor
        let dist = this.yspeed + 0.5;
        while (this.collidesWithAABB(Lesson13Game.floor)) {
            this.y = oldy + dist;
            dist = dist * 0.5;
            this.yspeed = 0;
            this.canJump = true;
        }
    }

    applyGravity() {
        this.yspeed += 0.5;
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