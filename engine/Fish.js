"use strict";

class Fish extends Sprite {

    constructor(id, posX, posY){
        super(id, "fish.png");
        this.x = posX;
        this.y = posY;
        let velY = 0;
        this.getVelY = () => { return velY};
        this.setVelY = (y) => {velY = y};
        this.frameNum = 0;
        this.right = true;
    }


    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
        this.frameNum++;
        if (this.x > 1000) this.right = false;
        if (this.x < -200) this.right = true;
        if (this.right) {
            this.x += 2;
            this.scaleX = 1;
        } else {
            this.x -= 2;
            this.scaleX = -1;
        }
        this.setVelY(Math.cos(0.03 * this.frameNum));
        this.y += this.getVelY();
    }

    
    draw(g){
        super.draw(g);
    }
}