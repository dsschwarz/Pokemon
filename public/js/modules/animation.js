define(['gamejs', 'modules/globals'], function($gamejs, $globals) {
  var SpriteSheet = function(imagePath, imageDim, bounds) {

    this.get = function(id) {
      return surfaceCache[id];
    };

    var width = imageDim[0];
    var height = imageDim[1];

    var image = $gamejs.image.load(imagePath);
    var begin = bounds[0] || [0, 0];
    var end = bounds[1] || [image.rect.width, image.rect.height];
    var surfaceCache = [];
    var imgSize = new $gamejs.Rect([0,0],[width,height]);

    // extract the single images from big spritesheet image
    for (var j = begin[1]; j < end[1]; j += height) {
      for (var i = begin[0]; i < end[0]; i += width) {
        var surface = new $gamejs.Surface([width, height]);
        var rect = new $gamejs.Rect(i, j, width, height);
        surface.blit(image, imgSize, rect);
        surfaceCache.push(surface);
      }
    }
    return this;
  };


  var Animation = function(spriteSheet, animationSpec, fps) {
     this.fps = fps || $g.game.fps;
     this.frameDuration = 1000 / this.fps;
     this.spec = animationSpec;

     this.currentFrame = null;
     this.currentFrameDuration = 0;
     this.currentAnimation = null;

     this.spriteSheet = spriteSheet;

     this.loopFinished = false;

     this.image = null;
     return this;
  }

  Animation.prototype.start = function(animation) {
     this.currentAnimation = animation;
     this.currentFrame = this.spec[animation][0];
     this.currentFrameDuration = 0;
     this.update(0);
     return;
  };

  Animation.prototype.update = function(msDuration) {
     if (!this.currentAnimation) {
        throw new Error('No animation started. call start("fooCycle") before updating');
     }

     this.currentFrameDuration += msDuration;
     if (this.currentFrameDuration >= this.frameDuration) {
        this.currentFrame++;
        this.currentFrameDuration = 0;

        // loop back to first frame if animation finished or single frame
        var aniSpec = this.spec[this.currentAnimation];
        if (aniSpec.length == 1 || this.currentFrame > aniSpec[1]) {
           this.loopFinished = true;
           // unless third argument is false, which means: do not loop
           if (aniSpec.length === 3 && aniSpec[2] === false) {
              this.currentFrame--;
           } else {
              this.currentFrame = aniSpec[0];
           }
        }
     }

     this.image = this.spriteSheet.get(this.currentFrame);
     return;
  };

  return {
    SpriteSheet :   SpriteSheet,
    Animation   :   Animation
  }

});