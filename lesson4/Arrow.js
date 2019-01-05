"use strict";

class Arrow extends Sprite {

    constructor(id, posX, posY){
        super(id, "arrow.png");
        this.x = posX;
        this.y = posY;
        this.eventTarget = new EventTarget();
        this.addEventListener("collision", this.onTargetCollision, false);
        Lesson4Game.num_arrows += 1;
        this.initSounds();
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
                e.detail.thud1.play();
                Lesson4Game.targ.hitcount += 1;
            } else {
                e.detail.thud2.play();
            }
            e.detail.removeEventListener("collision", e.detail.onTargetCollision, false);
    }

    initSounds() {
        this.thud1 = document.createElement("audio");
        this.thud1.src = 'resources/thud-1.wav';
        this.thud1.setAttribute("preload", "auto");
        this.thud1.setAttribute("muted", "muted");
        this.thud1.setAttribute("controls", "none");
        this.thud1.style.display = "none";
        this.thud1.playbackRate = 0.8 + (Math.random() * 3.5);
        this.thud1.volume = 0.25;
        document.body.appendChild(this.thud1);
        this.thud2 = document.createElement("audio");
        this.thud2.src = 'resources/thud-2.wav';
        this.thud2.setAttribute("preload", "auto");
        this.thud2.setAttribute("muted", "muted");
        this.thud2.setAttribute("controls", "none");
        this.thud2.style.display = "none";
        this.thud2.playbackRate = 0.8 + (Math.random() * 1);
        this.thud2.volume = 0.1;
        document.body.appendChild(this.thud2);
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

