"use strict";

class Toad extends Sprite {

    constructor(id, posX, posY){
        super(id, "toad.png");
        this.x = posX;
        this.y = posY;
    }


    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
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