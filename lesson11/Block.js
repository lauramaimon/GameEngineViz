"use strict";

class Block extends Sprite {

    constructor(id, posX, posY, num){
        super(id, "block" + num + ".png");
        this.x = posX;
        this.y = posY;
        this.xspeed = 0;
        this.yspeed = 0;
        this.dropToY = posY;
        this.kicked = false;
        this.kickedToRight;
        this.num = num;
        Block.lastKicked = 0;
        Block.numKicked = 0;
    }

    /**
     * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
     */
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);

        if (this.y < this.dropToY) {
            this.yspeed += 0.8;
        } else {
            this.yspeed = 0;
        }

        if (this.kicked) {
            if (this.kickedToRight)
                this.xspeed = 12;
            else
                this.xspeed = -12;
            this.kicked = false;
        }

        this.applyVelocity();

    }


    drop() {
        this.dropToY += 60;
    }

    kick(facingRight) {
        if (Block.lastKicked != this.num - 1) {
            Lesson11Game.fail();
        }
        this.kicked = true;
        this.kickedToRight = facingRight;
        Block.lastKicked = this.num;
        Block.numKicked += 1;
    }

    applyVelocity() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    /**
     * Draws this image to the screen
     */
    draw(g){
        super.draw(g);
    }
}