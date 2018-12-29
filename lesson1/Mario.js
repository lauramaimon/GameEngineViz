"use strict";

class Mario extends Sprite {

    constructor(id, posX, posY){
        super(id, "Mario.png");
        this.setX(posX);
        this.setY(posY);
    }


    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
    }

    
    draw(g){
        super.draw(g);
    }

    moveX(distance) {
        this.setX(this.getX() + distance);
    }
    
    moveY(distance) {
        this.setY(this.getY() + distance);
        }
}

