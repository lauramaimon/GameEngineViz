"use strict";

class Bow extends Sprite {

    constructor(id, posX, posY){
        super(id, "bow.png");
        this.x = posX;
        this.y = posY;
        this.arrows = [];


    }

    // invoked every frame
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
        this.arrows.forEach(arrow => {arrow.update()});

        // whoever is shooting this bow is really enthusiastic, and attempts to shoot every frame
        this.shoot();


    }

    
    draw(g){
        super.draw(g);
        this.arrows.forEach(arrow => {arrow.draw(g)});
    }

    shoot() {
        if (this.arrows.length < 20) {
            console.log("arrow created!");
            let arrow = new Arrow("arrow", this.x + 145, this.y + 62);
            this.arrows.push(arrow);
        }
    }
}

