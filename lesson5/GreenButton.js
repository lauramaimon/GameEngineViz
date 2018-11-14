"use strict";

/**
 * A Button
 * */
class GreenButton extends Sprite {


    constructor(id, posX, posY){
        super(id, "greenbutton.png");
        this.x = posX;
        this.y = posY;
        this.pressed = false;
        this.eventTarget = new EventTarget();
        this.addEventListener("onPressDown", this.onPressDown, false);
        this.addEventListener("onPressUp", this.onPressUp, false);
    }

    /**
     * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
     */
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
    }


    onPressDown(e) {
        e.detail.pressed = true;
        e.detail.loadImage("greenbutton_pressed.png");
    }

    onPressUp(e) {
        e.detail.pressed = false;
        e.detail.loadImage("greenbutton.png");
    }


    /**
     * Draws this image to the screen
     */
    draw(g){
        super.draw(g);
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

