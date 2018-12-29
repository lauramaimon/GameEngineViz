"use strict";

class Arrow extends Sprite {

    constructor(id, posX, posY){
        super(id, "arrow.png");
        this.x = posX;
        this.y = posY;
        this.eventTarget = new EventTarget();
        this.addEventListener("collision", this.onTargetCollision, false);
        Lesson4Game.num_arrows += 1;
    }

    // invoked every frame
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
        this.x += 10;
        if (this.collidesWith(Lesson4Game.targ)) {
            this.dispatchEvent(new CustomEvent("collision", {detail: this}));
        }
    }

    
    draw(g){
        super.draw(g);
    }

    onTargetCollision(e) {
            e.detail.alpha = 0.0;
            // you can only hit the target if it is flashing blue...
            if (Lesson4Game.targ.blue) {   
                Lesson4Game.targ.hitcount += 1;
            }
            e.detail.removeEventListener("collision", e.detail.onTargetCollision, false);
    }

    addEventListener(type, listener, useCapture=false) {
        this.eventTarget.addEventListener(type, listener, useCapture);
    }

    removeEventListener(type, listener, useCapture=false) {
        this.eventTarget.removeEventListener(type, listener, useCapture);
    }

    dispatchEvent(type) {
        this.eventTarget.dispatchEvent(type);
    }
}

