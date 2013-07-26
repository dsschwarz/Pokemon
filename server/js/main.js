var $maps = require("./maps")
  , $map = require("./map")
  , $gamejs = require("../lib/gamejs")
  , $g = require("./globals");

for (var i = $maps.MAP_HEIGHT - 1; i >= 0; i--) {
	var row = [];
	for (var j = $maps.MAP_WIDTH - 1; j >= 0; j--) {
		row.push(new $map.Map([i, j]));
	}
	$g.maps.push(row);
};

var tick = function() {
	var msDuration = (Date.now() - TIMER_LASTCALL);
	TIMER_LASTCALL = Date.now();
	updateMaps(msDuration);
}
setInterval(tick, 30);
var TIMER_LASTCALL = Date.now();

var updateMaps = function(msDuration) {
	for (var i = $maps.MAP_HEIGHT - 1; i >= 0; i--) {
		for (var j = $maps.MAP_WIDTH - 1; j >= 0; j--) {
			$g.maps[i][j].update(msDuration);
		};
	};
};