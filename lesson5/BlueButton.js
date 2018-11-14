"use strict";

/**
 * A Button
 * */
class BlueButton extends Sprite {


    constructor(id, posX, posY){
        super(id, "bluebutton.png");
        BlueButton.state = {"up":0, "pressed":1, "locked":2}
        this.x = posX;
        this.y = posY;
        this.state = BlueButton.state.up;
        this.eventTarget = new EventTarget();
        this.addEventListener("onPressDown", this.onPressDown, false);
        this.addEventListener("onPressUp", this.onPressUp, false);
        this.addEventListener("onLockDown", this.onLockDown, false);
    }

    /**
     * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
     */
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
    }


    onPressDown(e) {
        if (e.detail.state != BlueButton.state.locked) {
            e.detail.state = BlueButton.state.pressed;
            e.detail.loadImage("bluebutton_pressed.png");
        }
    }

    onPressUp(e) {
        if (e.detail.state != BlueButton.state.locked) {
            e.detail.state = BlueButton.state.up;
            e.detail.loadImage("bluebutton.png");
        }
    }

    onLockDown(e) {
        e.detail.state = BlueButton.state.locked;
        e.detail.loadImage("bluebutton_locked.png");
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
