/**
 * Visible game objects in the overworld will sublclass MapObject
 * Contains a pointer to its position on the map
 * And the image it should display 
 */

define(['underscore', 'gamejs', 'modules/globals'], function(_, $gamejs, $globals) {
    var MapObject = function(map, pos, imageNum){
      var imgNum = imageNum || 2;
  		MapObject.superConstructor.apply(this, arguments);
  		this.map = map;
  		this.pos = pos;
      this.image = map.spriteSheets.objects.get(imgNum);
  	}
    $gamejs.utils.objects.extend(MapObject, $gamejs.sprite.Sprite);

    

    return {
        MapObject: MapObject
    };
});