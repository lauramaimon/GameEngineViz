"use strict";

class SadGhost extends AnimatedSprite {

    constructor(id, posX, posY){
        super(id, "ghost", 4);
        this.x = posX;
        this.y = posY;
        this.frameNum = 0;
        let mood = 0;

        // hugging increases the ghost's "mood" by 20
        this.hug = () => { mood += 20; };
        this.getMood = () => { return mood; };

        this.addAnimation("emotions", 0, 3, false);
        this.win_animation_frame = 0;
        this.msg = "";
    }

    // invoked every frame
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
        this.frameNum += 1;
        this.float();
        this.updateEmotions();
    }


    updateEmotions() {
        if (this.getMood() < 60) {
            this.goToFrame(0);
            this.msg = "The ghost looks sad...";
        } 
        else if (this.getMood() < 120) {
            this.goToFrame(1);
            this.msg = "The ghost cheered up a little...";
        } 
        // it looks like the ghost would be happy if it had 120 "mood" points
        else if (this.getMood() == 120) {
            this.goToFrame(2);
            this.msg = "The ghost looks kinda happy!";
        } 
        else {
            this.goToFrame(3);
            this.msg = "The ghost looks a little creeped out...";
        }
    }


    float() {
        this.y += 0.2 * Math.sin(0.04 * this.frameNum);
    }


    // Draws this object
    draw(g){
        super.draw(g);
        g.font = "24px courier";
        g.textAlign = "center"; 
        g.fillText(this.msg, 380, 100);
    }
}

