var $maps = require("./maps")
var $map = require("./map")

var mapTimeout = setTimeout(function() {
	var map = new $map.Map([0, 0]);
	console.log(map);
}, 1000)