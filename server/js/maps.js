var fs = require('fs');
var MAP_WIDTH = 1;
var MAP_HEIGHT = 1;
var readFile = function(filePath, callback) {

	fs.readFile(filePath, 'utf8', function read(err, data) {
	    if (err) {
	        throw err;
	    }
	    callback(data);
	});
};
var readMap = function(filePath, callback) {
	var tiles= [];
	readFile(filePath, function(data) {
		var index = data.indexOf("OBJECTS");
		tile_data = data.slice(0, index- 1).split("\n");
		object_data = data.slice(index, data.length).split("\n");
		object_data = object_data.slice(1, object_data.length);
		for (var i = object_data.length - 1; i >= 0; i--) {
			object_data[i] = JSON.parse(object_data[i]);
		};
		console.log(object_data);
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
	});
};
var maps = [];

for (var i = MAP_WIDTH - 1; i >= 0; i--) {
	var row = [];
	for (var j = MAP_HEIGHT - 1; j >= 0; j--) {
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
		});
		row.push(map);
	}
	maps.push(row);
};
exports.maps = maps;