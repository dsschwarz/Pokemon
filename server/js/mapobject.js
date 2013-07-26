var $gamejs = require("../lib/gamejs")
var MapObject = function(map,  pos, imageNum){
	MapObject.superConstructor.apply(this, arguments);
	this.id  = counter++;
	this.imgNum = imageNum || 2;
	this.type = "mapobject";
	this.map = map;
	this.pos = pos;
}
var counter = 0;
$gamejs.utils.objects.extend(MapObject, $gamejs.sprite.Sprite);

exports.MapObject = MapObject;