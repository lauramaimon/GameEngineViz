"use strict";

// A target that mysteriously flashes blue every 30 frames...
class Target extends Sprite {

    constructor(id, posX, posY){
        super(id, "target.png");
        this.x = posX;
        this.y = posY;
        this.hitcount = 0;
        this.blue = false;
        this.eventTarget = new EventTarget();
    }

    // invoked every frame
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
        if (Lesson4Game.frame_num % Lesson4Game.target_rate == 0) {
            this.loadImage("blue_target.png");
            this.blue = true;
        } else if (Lesson4Game.frame_num % Lesson4Game.target_rate == 10) {
            this.loadImage("target.png");
            this.blue = false;
        }
    }

    draw(g){
        super.draw(g);
        g.font = "48px courier";
        g.textAlign = "center"; 
        g.fillText(20 - this.hitcount, this.x + 60, this.y - 74);
    }
}

