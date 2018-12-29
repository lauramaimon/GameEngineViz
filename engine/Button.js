"use strict";

class Button extends Sprite {

    constructor(id, posX, posY){
        super(id, "button.png");
        this.x = posX;
        this.y = posY;
        this.pressed = false;
        this.pressedLastFrame = false;
    }


    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
        if (this.pressedLastFrame && !this.pressed) {
            this.loadImage("button.png");
            this.y = 530;
        }
        else if (!this.pressedLastFrame && this.pressed) {
            this.loadImage("button_pressed.png");
            this.y = 555;
        }
        this.pressedLastFrame = this.pressed;
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