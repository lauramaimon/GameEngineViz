"use strict";


class GreenButton extends Sprite {


    constructor(id, posX, posY){
        super(id, "greenbutton.png");
        this.x = posX;
        this.y = posY;
        let _pressed = false;
        this.setPressed = new MonitoredFunction((pressed) => { _pressed = pressed; }, Lesson7Game.monitor).get();
        this.getPressed = () => { return _pressed; };
        this.eventTarget = new EventTarget();
        this.addEventListener("onPressDown", this.onPressDown, false);
        this.addEventListener("onPressUp", this.onPressUp, false);
    }

    // invoked every frame
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
    }


    onPressDown(e) {
        e.detail.setPressed(true);
        e.detail.loadImage("greenbutton_pressed.png");
    }

    onPressUp(e) {
        e.detail.setPressed(false);
        e.detail.loadImage("greenbutton.png");
    }


    
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

