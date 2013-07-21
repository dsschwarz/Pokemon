var $gamejs = require("../lib/gamejs")
var MapObject = function(map, pos, imageNum){
	this.imgNum = imageNum || 2;
	MapObject.superConstructor.apply(this, arguments);
	this.map = map;
	this.pos = pos;
}
$gamejs.utils.objects.extend(MapObject, $gamejs.sprite.Sprite);

exports.MapObject = MapObject;