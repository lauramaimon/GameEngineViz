"use strict";

/**
 * A ghost
 * */
class SadGhost extends AnimatedSprite {


    constructor(id, posX, posY){
        super(id, "ghost", 4);
        this.x = posX;
        this.y = posY;
        this.frameNum = 0;
        let mood = 0;
        this.hug = () => { mood += 20; };
        this.getMood = () => { return mood; };
        let timeHappy = 0;
        this.incTimeHappy = () => { timeHappy += 1; };
        this.resetTimeHappy = () => { timeHappy = 0; };
        this.getTimeHappy = () => { return timeHappy; };
        this.addAnimation("emotions", 0, 3, false);
        this.win_animation_frame = 0;
        this.msg = "";
        this.msgPos = Math.random();
    }

    /**
     * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
     */
    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
        this.frameNum += 1;
        this.float();
        this.updateEmotions();
    }


    updateEmotions() {
        if (this.getMood() < 60) {
            this.goToFrame(0);
            this.msg = "Sad";
            this.resetTimeHappy();
        } else if (this.getMood() < 120) {
            this.goToFrame(1);
            this.msg = "Better";
            this.resetTimeHappy();
        } else if (this.getMood() == 120) {
            this.goToFrame(2);
            this.msg = "Happy";
            this.incTimeHappy();
            if (this.getTimeHappy() > 60) {
                this.goBeHappy();
                if (!Lesson9Game.happyGhosts.includes(this)) {
                    Lesson9Game.happyGhosts.push(this);
                }
                if (Lesson9Game.ghosts.includes(this)) {
                    Lesson9Game.ghosts.splice(Lesson9Game.ghosts.indexOf(this), 1);
                }
            }
        } else {
            this.goToFrame(3);
            this.msg = "Creeped out";
            this.resetTimeHappy();
        }
    }


    goBeHappy() {
        this.y -= 5;
        this.x += Math.sin(0.1 * this.frameNum);
        this.goToFrame(2);
        this.msg = "Happy";
    }


    float() {
        this.y += 0.2 * Math.sin(0.04 * this.frameNum);
    }


    /**
     * Draws this image to the screen
     */
    draw(g){
        super.draw(g);
        g.font = "24px courier";
        g.textAlign = "center"; 
        g.fillText(this.msg, this.x + 40, this.y - 40 + this.msgPos * 20);
    }
}

