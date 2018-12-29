"use strict";

class Mario extends Sprite {

    constructor(id, posX, posY){
        super(id, "Mario.png");
        this.x = posX;
        this.y = posY;
        this.xspeed = 0;
        this.yspeed = 0;
        this.jumping = false;
        this.floor = 347;
        this.facingRight = true;
        this.pivotX = 20;
        this.pivotX = 40;
        this.maxXSpeed = 6;
        this.jumpSpeed = -11;
        this.stopped = false;
        let health = 20;
        this.getHealth = () => {return health};
        this.takeDamage = () => {
            if (health >= 1) {
                health -= 1;
            }
            else {
                this.stopped = true;
                health = 0;
            }
        }
        this.slow = false;
        this.heart = this.getImage('heart.png');
    }

    // invoked every frame
    update(pressedKeys, gamePads){
        if (this.stopped)
            pressedKeys.clear();
        
        super.update(pressedKeys, gamePads);

        let speed = this.maxXSpeed;
        if (this.slow) {
            speed = 0.3 * this.maxXSpeed;
        }

        if(pressedKeys.contains(37)) {
            this.xspeed = -speed;
            this.facingRight = false;
            if (this.scaleX > 0)
                this.scaleX = - this.scaleX;
        } 
        else if (pressedKeys.contains(39)) {
            this.xspeed = speed;
            this.facingRight = true;
            if (this.scaleX < 0)
                this.scaleX = - this.scaleX;
        } else {
            this.xspeed = 0;
        }
        if((pressedKeys.contains(38) && !this.jumping)) {
            this.yspeed = this.jumpSpeed;
            this.jumping = true;
        }

        this.applyGravity();
        this.applyVelocity();

        this.frameNum += 1;
    }

    applyVelocity() {
        this.x += this.xspeed;
        this.y += this.yspeed;
        this.stopAtFloor();
    }

    applyGravity() {
        let floor;
        if (this.x < 470 || this.x > 615) {
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

    stopAtFloor() {
        if (this.y > 370 && this.x < 474) {
            this.x = 475;
        } else if (this.y > 370 && this.x > 610) {
            this.x = 609;
        }
        if (this.x < 465 || this.x > 615) {
            if (this.y > this.floor) {
                this.y = this.floor;
            }
        } else {
            if (this.y > 520) {
                this.y = 520;
            }
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

    
    draw(g){
        super.draw(g);
        g.font = "48px courier";
        g.textAlign = "left"; 
        g.fillText(this.getHealth(), 80, 60);
        g.drawImage(this.heart, 25, 20);
        if (this.getHealth() <= 0) {
            g.fillText("You died", 290, 295);
        }
    }

    moveX(distance) {
        this.x = this.x + distance;
    }
    
    moveY(distance) {
        this.y = this.y + distance;
    }
}