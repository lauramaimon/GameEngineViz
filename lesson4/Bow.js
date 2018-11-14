"use strict";

class Bow extends Sprite {

    constructor(id, posX, posY){
        super(id, "bow.png");
        this.x = posX;
        this.y = posY;
        this.arrows = [];


    }

    /**
     * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
     */
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
        this.arrows.forEach(arrow => {arrow.update()});

        // whoever is shooting this bow is really enthusiastic, and attempts to shoot every frame
        this.shoot();


    }

    /**
     * Draws this image to the screen
     */
    draw(g){
        super.draw(g);
        this.arrows.forEach(arrow => {arrow.draw(g)});
    }

    shoot() {
        if (this.arrows.length < 20) {
            console.log("arrow created!");
            let arrow = new Arrow("arrow", this.x + 145, this.y + 75);
            this.arrows.push(arrow);
        }
    }
}

