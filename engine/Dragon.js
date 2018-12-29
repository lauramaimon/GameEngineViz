
"use strict";

class Dragon extends Sprite {

    constructor(id, posX, posY){
        super(id, "dragon.png");
        this.x = posX;
        this.y = posY;
        this.xspeed = 0;
        this.yspeed = 0;
        this.floor = 257;
        this.pushed = false;
        this.pushedTimer = 0;
    }


    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);

        if (this.y < 300)
        	this.handlePush();
        this.applyFriction();
        this.applyVelocity();
        this.applyGravity();
    }

    handlePush() {
    	if (this.pushed) {
    		this.pushedTimer += 1;
    		if (this.pushedTimer < 10) {
    			this.xspeed += 1;
    		} 
    		else if (this.pushedTimer < 13) {
    			this.xspeed -= 1;
    		}
    		else {
    			this.pushed = false;
    			this.xspeed = 0;
    			this.pushedTimer = 0;
    		}
    	}
    }

    applyVelocity() {
        this.x += this.xspeed;
        this.y += this.yspeed;
        this.stopAtFloor();
    }

    applyGravity() {
        let floor;
        if (this.x < 455 || this.x > 615) {
            floor = this.floor;
        } else {
            floor = 520;
        }
        if (this.y < floor) {
            this.yspeed += 0.5;
        }
        else {
            this.jumping = false;
            this.y = floor;
        }
    }

    applyFriction() {
    	if (this.xspeed > 0.5) {
    		this.xspeed -= 0.5;
    	}
    	else {
    		if (this.xspeed > 0) {
    			this.xspeed = 0;
    		}
    	}
    }

    stopAtFloor() {
    	if (this.y > 370 && this.x < 474) {
            this.x = 475;
        } else if (this.y > 370 && this.x > 610) {
            this.x = 609;
        }
        if (this.x < 460 || this.x > 615) {
            if (this.y > this.floor) {
                this.y = this.floor;
            }
        } else {
            if (this.y > 411) {
                this.y = 411;
            }
        }
    }

    push() {
    	this.pushed = true;
    	this.pushTimer = 0;
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