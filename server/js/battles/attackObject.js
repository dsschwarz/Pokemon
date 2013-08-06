var $globals = require("../globals")
  , $gamejs = require("../../lib/gamejs")
  , $mapobj = require("../mapobject");
var AttackObject = function(battle, pos, imageNum){
	AttackObject.superConstructor.apply(this, arguments);
	this.imgNum = imageNum || 16;
	this.moving = false;
	this.battle = battle;
	delete(this.map);
	this.type = "attackObject";
	this.move_delay = 0;
	this.attackMode = false;
	this.attack = {
		update: function(){},
		onCollide: function(){},
		damage: 0,
		timeElapsed: 0,
		originalPos: [0, 0]
	}
	return this;
}
$gamejs.utils.objects.extend(AttackObject, $mapobj.MapObject);
exports.AttackObject = AttackObject;