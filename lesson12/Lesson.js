"use strict";

// main class
class Lesson12Game extends Game {

    // initialization
    constructor(canvas) {
        super("Puzzle twelve", 800, 600, canvas);
        this.door = new Door("door", 635, 300, 5);
        this.chicken = new Chicken("chicken", 35, 400);
        let cornerx = 25;
        let cornery = 25;
        // make the rocks
        Lesson12Game.rocks = [
            new Rock("rock2",  cornerx + 85,     cornery),
            new Rock("rock3",  cornerx + 85 * 2, cornery),
            new Rock("rock4",  cornerx + 85 * 3, cornery),
            new Rock("rock5",  cornerx + 85 * 5, cornery),
            new Rock("rock6",  cornerx + 85 * 5, cornery + 85 * 2),
            new Rock("rock7",  cornerx + 85 * 6, cornery),
            new Rock("rock9",  cornerx + 85 * 7, cornery + 85),
            new Rock("rock10", cornerx + 85 * 7, cornery + 85 * 2),
            new Rock("rock11", cornerx,          cornery + 85),
            new Rock("rock12", cornerx,          cornery + 85 * 2),
            new Rock("rock13", cornerx,          cornery + 85 * 3),
            new Rock("rock14", cornerx + 85 * 2, cornery + 85 * 2),
            new Rock("rock15", cornerx + 85 * 3, cornery + 85 * 2),
            new Rock("rock16", cornerx + 85 * 2, cornery + 85 * 4),
            new Rock("rock17", cornerx + 85 * 3, cornery + 85 * 4),
            new Rock("rock18", cornerx + 85 * 1, cornery + 85 * 6),
            new Rock("rock19", cornerx + 85 * 2, cornery + 85 * 6),
            new Rock("rock20", cornerx + 85 * 3, cornery + 85 * 6),
            new Rock("rock21", cornerx + 85 * 4, cornery + 85 * 6),
        ];
        // make the floor switches
        this.floorswitches = [
            new FloorSwitch("fs1",  cornerx + 85,     cornery + 85),
            new FloorSwitch("fs2",  cornerx + 85 * 2, cornery + 85),
            new FloorSwitch("fs3",  cornerx + 85 * 4, cornery + 85),
            new FloorSwitch("fs4",  cornerx + 85 * 5, cornery + 85),
            new FloorSwitch("fs5",  cornerx + 85 * 6, cornery + 85),
            new FloorSwitch("fs6",  cornerx + 85 * 4, cornery + 85 * 2),
            new FloorSwitch("fs7",  cornerx + 85 * 4, cornery + 85 * 3),
            new FloorSwitch("fs8",  cornerx + 85 * 5, cornery + 85 * 3),
            new FloorSwitch("fs9",  cornerx + 85 * 6, cornery + 85 * 3),
            new FloorSwitch("fs10", cornerx + 85,     cornery + 85 * 2),
            new FloorSwitch("fs11", cornerx + 85 * 2, cornery + 85 * 3),
            new FloorSwitch("fs12", cornerx + 85,     cornery + 85 * 5),
            new FloorSwitch("fs13", cornerx + 85 * 2, cornery + 85 * 5),
            new FloorSwitch("fs14", cornerx + 85 * 3, cornery + 85 * 5),
            new FloorSwitch("fs15", cornerx + 85 * 4, cornery + 85 * 5),
        ];
        this.door.addAnimation("open", 0, 4, false);
        this.winAnimationFrame = 0;
        this.chicken.scaleX = 0.9;
        this.chicken.scaleY = 0.9;
        this.door.scaleX = 2.4;
        this.door.scaleY = 2.4;
        this.addChild(this.door);

        Lesson12Game.rocks.forEach((rock) => {this.addChild(rock)});



        this.floorswitches.forEach((fs) => {
            this.addChild(fs);
            // you might need a list to keep track of which switches you are currently colliding with

        });


        this.addChild(this.chicken);
    }

    // invoked every frame
    update(pressedKeys, gamepads) {
        super.update(pressedKeys);

        for (let i = 0; i < this.floorswitches.length; i++) {
            if (this.chicken.collidesWith(this.floorswitches[i])) {
                // you probably don't want to toggle the floor switch every frame you are colliding with it


                this.floorswitches[i].onToggle();


            }


        }


        // all floor switches must show a check mark
        let win = true;
        this.floorswitches.forEach((fs) => {
            if (fs.state != FloorSwitch.state.check) {
                win = false;
            }
        });

        // Win condition - fulfill these requirements to complete the challenge!
        if (win) {
            if (this.winAnimationFrame >= 50) {
                var complete = new Event("complete");
                window.parent.document.dispatchEvent(complete);
            }
            if (this.winAnimationFrame == 0) this.door.open();
            this.winAnimationFrame += 1;
        }
    }

    
    draw(g) {
        g.clearRect(0, 0, this.width, this.height);
        super.draw(g);
    }
}



function tick() {
    game.nextFrame();
}

var drawingCanvas = document.getElementById('game');
if (drawingCanvas.getContext) {
    var game = new Lesson12Game(drawingCanvas);
    game.start();
}

