"use strict";

class Spikes extends Sprite {

    constructor(id, posX, posY){
        super(id, "spikes.png");
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