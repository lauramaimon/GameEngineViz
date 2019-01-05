"use strict";

class Scenery extends Sprite {

    constructor(id, posX, posY, canvas){
        super(id, null);
        this.x = posX;
        this.y = posY;
        this.tweenJuggler = new TweenJuggler();
        this.water = new WaterBody(canvas, window.innerWidth, window.innerHeight * .32, 75, this);
        this.leftfloor = new Floor("leftfloor", 0, 370);
        this.rightfloor = new Floor("rightfloor", 600, 370);
        this.walkway = new Floor("walkway", 600, 370);
        this.walkway.scaleY = 0.05;
        this.leftfloor.scaleX = 0.2;
        this.rightfloor.scaleX = 0.2;
        this.fish = new Fish("fish", 0, 437);
        this.addChild(this.leftfloor);
        this.addChild(this.rightfloor);
        this.addChild(this.walkway);
        this.addChild(this.fish);
        this.addChild(this.water);
        this.started = false;
        this.finished = false;
        this.emitters = [];
    }


    update(pressedKeys, gamePads){
        super.update(pressedKeys, gamePads);
        this.water.update(pressedKeys);
        this.tweenJuggler.update();
        this.finished = this.started && this.tweenJuggler.tweenList.size() == 0;

        var tempEmitters = [];
        for (var i = 0; i < this.emitters.length; i++) {
            this.emitters[i].addNewParticles();
            if(!this.emitters[i].isDead){
                tempEmitters.push(this.emitters[i]);
            }
        } 
        this.emitters = tempEmitters;
    }


    animate(){
        this.started = true;
        var basicTween = new Tween(this.walkway);
        var basicTweenParams = new TweenParams(TweenableParams.X, 600, 200, 3000, TweenParams.smootherStep);
        basicTween.animate(basicTweenParams);
        this.tweenJuggler.add(basicTween);
    }

    
    draw(g){
        super.draw(g);
        for (var i = 0; i < this.emitters.length; i++) {
            this.emitters[i].drawParticles(g);
        } 
    }
}