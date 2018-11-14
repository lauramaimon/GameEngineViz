"use strict";

class Door extends AnimatedSprite {

    constructor(id, posX, posY, num_images){
        super(id, "door", num_images);
        this.x = posX;
        this.y = posY;
    }

    /**
     * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
     */
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
    }

    /**
     * Draws this image to the screen
     */
    draw(g){
        super.draw(g);
    }
}

