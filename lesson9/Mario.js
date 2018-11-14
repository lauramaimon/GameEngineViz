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
        this.floor = 307;
    }

    /**
     * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
     */
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
        if(pressedKeys.contains(37))
            this.moveX(-3);
            // this.xspeed = -3;
        if(pressedKeys.contains(38) && !this.jumping) {
            this.yspeed = -12;
            this.jumping = true;
        }
        if(pressedKeys.contains(39))
            this.moveX(3);
            // this.xspeed = 3;
        // if(pressedKeys.contains(40))
        //     this.moveY(3);
        this.applyVelocity();
        this.applyGravity();
        this.frameNum += 1;
    }

    applyVelocity() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    applyGravity() {
        if (this.y < this.floor) {
            this.yspeed += 0.5;
        }
        else {
            this.jumping = false;
            this.y = this.floor;
        }
    }

    /**
     * Draws this image to the screen
     */
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