"use strict";

class Knight extends AnimatedSprite {

    constructor(id, posX, posY){
        super(id, "knight", 10);
        // Add animations. To play an animation, call
        // this.playAnimation("walk")
        // every frame that you want to play the animation.
        this.addAnimation("walk", 1, 4, /* repeat = */ true); 
        this.addAnimation("stand", 0, 0, /* repeat = */ false);
        this.addAnimation("jump_up", 6, 7, /* repeat = */ false);
        this.addAnimation("jump_down", 8, 9, /* repeat = */ false);
        this.x = posX;
        this.y = posY;
        this.scaleX = 1; // hint: if this is negative, the sprite is flipped!
        this.scaleY = 1;
        this.pivotX = 20;
        this.xspeed = 0;
        this.yspeed = 0; // hint: if this is negative, the knight is moving upwards!
        this.frameNum = 0;
        this.jumping = false;
        this.floor = 236;
    }

    // invoked every frame
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);

        if(pressedKeys.contains(37)) {
            this.moveX(-3);


        }
        if(pressedKeys.contains(38) && !this.jumping) {
            this.yspeed = -12;
            this.jumping = true;
        }
        if(pressedKeys.contains(39)) {
            this.moveX(3);


        }


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