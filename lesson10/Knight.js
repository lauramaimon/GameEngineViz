"use strict";

class Knight extends AnimatedSprite {

    constructor(id, posX, posY){
        super(id, "knight", 10);
        this.addAnimation("walk", 1, 4, true);
        this.addAnimation("stand", 0, 0, false);
        this.addAnimation("jump_up", 6, 7, false);
        this.addAnimation("jump_down", 8, 9, false);
        this.x = posX;
        this.y = posY;
        this.xspeed = 0;
        this.yspeed = 0;
        this.frameNum = 0;
        this.jumping = false;
        this.floor = 236;
    }

    /**
     * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
     */
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);

        if(pressedKeys.contains(37)) {
            this.moveX(-3);
            // this.scaleX = -1;
            // if (!this.jumping) {
            //     this.playAnimation("walk");
            // }
        }
        if(pressedKeys.contains(38) && !this.jumping) {
            this.yspeed = -12;
            this.jumping = true;
        }
        if(pressedKeys.contains(39)) {
            this.moveX(3);
            // this.scaleX = 1;
            // if (!this.jumping) {
            //     this.playAnimation("walk");
            // }
        }
        // if(!pressedKeys.contains(39) && !pressedKeys.contains(37) && !this.jumping) {
        //     this.playAnimation("stand");
        // }
        this.applyVelocity();
        this.applyGravity();

        // if (this.jumping && this.yspeed <= 0) {
        //     this.playAnimation("jump_up");
        // } else if (this.jumping && this.yspeed > 0) {
        //     this.playAnimation("jump_down");
        // }

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