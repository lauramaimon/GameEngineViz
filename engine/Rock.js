"use strict";

class Rock extends Sprite {

    constructor(id, posX, posY){
        super(id, "rock.png");
        this.x = posX;
        this.y = posY;
    }

    // invoked every frame
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