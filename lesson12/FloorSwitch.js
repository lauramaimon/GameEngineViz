"use strict";


class FloorSwitch extends Sprite {


    constructor(id, posX, posY){
        super(id, "circle.png");
        FloorSwitch.state = {circle:0, check:1, triangle:2};
        FloorSwitch.image = {0:"circle.png", 1:"check.png", 2:"triangle.png"};
        this.x = posX;
        this.y = posY;
        this.state = FloorSwitch.state["circle"];
        this.eventTarget = new EventTarget();
    }


    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
    }


    onToggle() {
        // move to the next state in [circle, check, triangle]
        this.state = (this.state + 1) % Object.keys(FloorSwitch.state).length;
        this.loadImage(FloorSwitch.image[this.state]);
    }

    
    draw(g){
        super.draw(g);
    }
}

