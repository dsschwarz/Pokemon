var $maps = require("./maps")
  , $map = require("./map")
  , $g = require("./globals");

for (var i = $maps.MAP_HEIGHT - 1; i >= 0; i--) {
	var row = [];
	for (var j = $maps.MAP_WIDTH - 1; j >= 0; j--) {
		row.push(new $map.Map([i, j]));
	}
	$g.maps.push(row);
};
console.log($g.maps)