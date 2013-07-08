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
    return this;
  };
  return {
    SpriteSheet: SpriteSheet
  }
});