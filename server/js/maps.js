exports.MAP_WIDTH = 3;
exports.MAP_HEIGHT = 3;
exports.BATTLE_MAP_LENGTH = 1;
var $map = require("./map")
  , $gamejs = require("../lib/gamejs")
  , fs = require("fs")
  , $mapobj = require("./mapobject");

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
	for (var i = 0; i < tile_data.length; i++) {
		tile_data[i] = tile_data[i].split(" ");
		for (var j = 0; j < tile_data[i].length; j++) {
			tile_data[i][j] = parseInt(tile_data[i][j]);
		};
	};
	tiles = tile_data;
	if (callback) {
		callback(tile_data, object_data);
	};
};

var maps = [];
var battleMaps = [];
for (var i = 0; i < exports.MAP_HEIGHT; i++) {
	var row = [];
	for (var j = 0; j < exports.MAP_WIDTH; j++) {
		var map = {};
		var filePath = i + (j + ".txt");
		if ((i < 10) && (j < 10)) {
			filePath = "0" + i + "0" + j + ".txt";
		} else if (i < 10) {
			filePath = "0" + i + j + ".txt";
		} else if (j < 10) {
			filePath = i + "0" + j + ".txt";
		}
		try {
			readMap("./server/maps/" + filePath, function(tiles, objects) {
				map.tiles = tiles;
				map.objects = objects;
			});
		} catch(err) {
			console.log("Error Reading Map");
			console.log(err)
		};
		row.push(map);
	}
	maps.push(row);
};
for (var j = 0; j < exports.BATTLE_MAP_LENGTH; j++) {
	var map = {};
	var filePath = j + ".txt";
	if (j < 10) {
		filePath = "0" + j + ".txt";
	};
	try {
		readMap("./server/battleMaps/" + filePath, function(tiles, objects) {
			map.tiles = tiles;
			map.objects = objects;
		});
	} catch(err) {
		console.log("Error Reading Map");
		console.log(err)
	};
	battleMaps.push(map);
}

exports.maps = maps;
exports.battleMaps = battleMaps;