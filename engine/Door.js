"use strict";

class Door extends AnimatedSprite {

    constructor(id, posX, posY, num_images){
        super(id, "door", num_images);
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

