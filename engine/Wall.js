"use strict";

class Wall extends Sprite {

    constructor(id, posX, posY){
        super(id, "floor.png");
        this.x = posX;
        this.y = posY;
    }


    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
    }

    
    draw(g){
        super.draw(g);
    }
}