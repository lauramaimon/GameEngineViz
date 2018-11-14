"use strict";

/**
 * A target that mysteriously flashes blue every 30 frames...
 * */
class Target extends Sprite {

    constructor(id, posX, posY){
        super(id, "target.png");
        this.x = posX;
        this.y = posY;
        this.hitcount = 0;
        this.eventTarget = new EventTarget();
    }

    /**
     * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
     */
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
        if (Lesson4Game.frame_num % Lesson4Game.target_rate == 0) {
            this.loadImage("blue_target.png");
        } else if (Lesson4Game.frame_num % Lesson4Game.target_rate == 10) {
            this.loadImage("target.png");
        }
    }

    /**
     * Draws this image to the screen
     */
    draw(g){
        super.draw(g);
        g.font = "48px courier";
        g.textAlign = "center"; 
        g.fillText(20 - this.hitcount, this.x + 60, this.y - 74);
    }
}

