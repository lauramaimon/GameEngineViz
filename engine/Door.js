"use strict";

class Door extends AnimatedSprite {

    constructor(id, posX, posY, num_images){
        super(id, "door", num_images);
        this.x = posX;
        this.y = posY;
        this.initSounds();
        this.playing = false;
    }


    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
        if (this.playing) this.playAnimation("open");
    }

    
    draw(g){
        super.draw(g);
    }

    open () {
        this.playing = true;
        this.click.play();
    }

    initSounds() {
        this.click = document.createElement("audio");
        this.click.src = 'resources/door-unlock.wav';
        this.click.setAttribute("preload", "auto");
        this.click.setAttribute("muted", "muted");
        this.click.setAttribute("controls", "none");
        this.click.style.display = "none";
        document.body.appendChild(this.click);
    }
}

