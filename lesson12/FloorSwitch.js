"use strict";


class FloorSwitch extends Sprite {


    constructor(id, posX, posY){
        super(id, "circle.png");
        FloorSwitch.state = {
            circle:0,
            check:1,
            triangle:2};
        FloorSwitch.image = {
            0:"circle.png",
            1:"check.png",
            2:"triangle.png"
        };
        this.x = posX;
        this.y = posY;
        this.state = FloorSwitch.state["circle"];
        this.eventTarget = new EventTarget();
        this.initSounds();
    }


    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
    }


    onToggle() {
        // move to the next state in [circle, check, triangle]
        this.playSound();
        this.state = (this.state + 1) % Object.keys(FloorSwitch.state).length;
        this.loadImage(FloorSwitch.image[this.state]);
    }

    
    draw(g){
        super.draw(g);
    }


    initSounds() {
        this.soundNum = 0;
        this.sounds = [];
        for (let i = 0; i < 10; i++) {
            this.sounds.push(document.createElement("audio"));
        }
        this.sounds.forEach((sound) => {
            sound.src = 'resources/switch.wav';
            sound.setAttribute("preload", "auto");
            sound.setAttribute("muted", "muted");
            sound.setAttribute("controls", "none");
            sound.style.display = "none";
            sound.playbackRate = 1.5;
            sound.volume = 0.05;
            document.body.appendChild(sound);
        });
    }


    playSound() {
        this.sounds[this.soundNum].play();
        this.soundNum++;
        this.soundNum %= this.sounds.length;
    }
}

