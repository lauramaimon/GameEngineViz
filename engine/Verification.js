
this.flipping = true;
this.walking = true;
this.standing = true;
this.jumpingup = true;
this.jumpingdown = true;
this.notwalkjumping = true;

function checkIfAnimated(lesson) {
    if (lesson.frameNum % lesson.repeat == 1) {
        // move right
        this.flipping = this.flipping && lesson.knight.scaleX > 0;
        this.walking = this.walking && lesson.knight.curAnimation.name == 'walk' && lesson.knight.playing == true;
    } else if (lesson.frameNum % lesson.repeat == 121) {
        // stop
        this.flipping = this.flipping && lesson.knight.scaleX > 0;
        this.standing = this.standing && (lesson.knight.curAnimation.name == 'stand' || lesson.knight.curAnimation.name == 'DEFAULT');
    } else if (lesson.frameNum % lesson.repeat == 181) {
        // move left
        this.flipping = this.flipping && lesson.knight.scaleX < 0;
        this.walking = this.walking && lesson.knight.curAnimation.name == 'walk' && lesson.knight.playing == true;
    } else if (lesson.frameNum % lesson.repeat == 301) {
        // stop
        this.flipping = this.flipping && lesson.knight.scaleX < 0;
        this.standing = this.standing && (lesson.knight.curAnimation.name == 'stand' || lesson.knight.curAnimation.name == 'DEFAULT');
    } else if (lesson.frameNum % lesson.repeat == 381) {
        // jump
        this.flipping = this.flipping && lesson.knight.scaleX < 0;
        this.jumpingup = this.jumpingup && lesson.knight.curAnimation.name == 'jump_up' && lesson.knight.playing == true;
    } else if (lesson.frameNum % lesson.repeat == 406) {
        // jump
        this.flipping = this.flipping && lesson.knight.scaleX < 0;
        this.jumpingdown = this.jumpingdown && lesson.knight.curAnimation.name == 'jump_down' && lesson.knight.playing == true;
    } else if (lesson.frameNum % lesson.repeat == 441) {
        // jump and move right
        this.flipping = this.flipping && lesson.knight.scaleX > 0;
        this.notwalkjumping = this.notwalkjumping && 
            (lesson.knight.curAnimation.name == 'jump_down' || lesson.knight.curAnimation.name == 'jump_up') && 
            lesson.knight.playing == true;
    } else if (lesson.frameNum % lesson.repeat == 561) {
        // jump and move left
        this.flipping = this.flipping && lesson.knight.scaleX < 0;
        this.notwalkjumping = this.notwalkjumping && 
            (lesson.knight.curAnimation.name == 'jump_down' || lesson.knight.curAnimation.name == 'jump_up') && 
            lesson.knight.playing == true;
    }
    if (lesson.frameNum < lesson.repeat) {
        // haven't finished checking a full cycle
		return -1;
	}
    if (!this.flipping) {
    	return -2;
    }
    if (!this.walking) {
        return -3;
    }
    if (!this.standing) {
        return -4;
    }
    if (!this.jumpingup) {
        return -5;
    }
    if (!this.jumpingdown) {
        return -6;
    }
    if (!this.notwalkjumping) {
        return -7;
    }
    return 0;
}

this.wallTouches = 0;
this.touchingLastFrame = false;

function checkWallJumping(lesson) {
    if (lesson.mario.collidesWith(lesson.leftwall) || lesson.mario.collidesWith(lesson.rightwall)) {
        if (!this.touchingLastFrame) {
            this.wallTouches += 1;
            this.touchingLastFrame = true;

        }
    } else {
        this.touchingLastFrame = false;
    }
    return this.wallTouches;
}
