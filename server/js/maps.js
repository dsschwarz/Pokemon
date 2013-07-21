var fs = require('fs');
exports.MAP_WIDTH = 2;
exports.MAP_HEIGHT = 2;
var readMap = function(filePath, callback) {
	var tiles= [];
	var data = fs.readFileSync(filePath, 'utf8');
	var index = data.indexOf("OBJECTS");
	var tile_data = data.slice(0, index- 1).split("\n");
	var object_data = data.slice(index, data.length).split("\n");
	object_data = object_data.slice(1, object_data.length);
	for (var i = object_data.length - 1; i >= 0; i--) {
		try {
			object_data[i] = JSON.parse(object_data[i]);
		} catch(err) {
			console.log( "ERR parsing map objects")
		}
	};
	for (var i = tile_data.length - 1; i >= 0; i--) {
		tile_data[i] = tile_data[i].split(" ");
		for (var j = tile_data[i].length - 1; j >= 0; j--) {
			tile_data[i][j] = parseInt(tile_data[i][j]);
		};
	};
	tiles = tile_data;
	if (callback) {
		callback(tile_data, object_data);
	};
};
var maps = [];

for (var i = exports.MAP_HEIGHT - 1; i >= 0; i--) {
	var row = [];
	for (var j = exports.MAP_WIDTH - 1; j >= 0; j--) {
		var map = {};
		var filePath = i + (j + ".txt");
		if ((i < 10) && (j < 10)) {
			filePath = "0" + i + "0" + j + ".txt";
		} else if (i < 10) {
			filePath = "0" + i + j + ".txt";
		} else if (j < 10) {
			filePath = i + "0" + j + ".txt";
		}

		readMap("./server/maps/" + filePath, function(tiles, objects) {
			map.tiles = tiles;
			map.objects = objects;
			console.log(map);
		});
		row.push(map);
	}
	maps.push(row);
};
exports.maps = maps;