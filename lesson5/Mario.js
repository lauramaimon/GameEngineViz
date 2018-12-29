"use strict";

class Mario extends Sprite {

    constructor(id, posX, posY){
        super(id, "Mario.png");
        this.x = posX;
        this.y = posY;
    }

    // invoked every frame
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
        if(pressedKeys.contains(37))
            this.moveX(-3);
        if(pressedKeys.contains(38))
            this.moveY(-3);
        if(pressedKeys.contains(39))
            this.moveX(3);
        if(pressedKeys.contains(40))
            this.moveY(3);
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