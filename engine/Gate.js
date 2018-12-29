"use strict";

class Gate extends Sprite {

    constructor(id, posX, posY){
        super(id, "gate.png");
        this.x = posX;
        this.y = posY;
        this.yspeed = 5;
        this.up = true;
        this.lowerTime = 0;
    }


    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);

        if (!this.up && this.lowerTime < 240) {
            this.y += this.yspeed;
        }
        if (!this.up) {
            this.lowerTime += 1;
        }
    }

    lower() {
        this.up = false;
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