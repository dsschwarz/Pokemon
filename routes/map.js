var $g = require("../server/js/globals");
var fs = require('fs')
exports.load = function(req, res) {
	var data =  {
		title: "Map Data",
		maps: []
	};
	$g.maps.forEach(function(mapRow) {
		var row =[];
		mapRow.forEach(function(map) {
			var objs = [];
			map.objectGroup.forEach(function(obj) {
				objs.push({pos: obj.pos, imgNum: obj.imgNum})
				console.log(obj.imgNum)
				console.log(obj.pos)
			})
			row.push({tiles: map.tiles, objects: objs});
			console.log(objs);
		})
		data.maps.push(row);
	})
	res.send(data);
};
exports.mapedit = function(req, res) {
	res.render("mapeditor");
};
exports.save = function(req, res) {
	var reqMaps = req.param("maps")
	for (var i = reqMaps.length - 1; i >= 0; i--) {
		console.log(i);
		var map = reqMaps[i];
		var filePath = map.pos[0] + (map.pos[1] + ".txt");
		if ((map.pos[0] < 10) && (map.pos[1] < 10)) {
			filePath = "0" + map.pos[0] + "0" + map.pos[1] + ".txt";
		} else if (map.pos[0] < 10) {
			filePath = "0" + map.pos[0] + map.pos[1] + ".txt";
		} else if (map.pos[1] < 10) {
			filePath = map.pos[0] + "0" + map.pos[1] + ".txt";
		}

		var ws = fs.createWriteStream("./server/maps/" + filePath);

		for (var ii = 0; ii < map.tiles.length; ii++) {
			for (var jj = 0; jj < map.tiles[ii].length; jj++) {
				ws.write(map.tiles[ii][jj]);
				if (jj != map.tiles[ii].length - 1)
					ws.write(" ");
			};
			ws.write("\n");
		};
		ws.write("OBJECTS")
		if (map.objects)
		for (var i = map.objects.length - 1; i >= 0; i--) {
			ws.write("\n");
			ws.write(JSON.stringify(map.objects[i]));
		};
	};
	res.send(true);
};