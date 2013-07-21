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
	var reqMaps = req.param("maps");
	console.log(reqMaps);
	for (var i = reqMaps.length - 1; i >= 0; i--) {
		for (var j = reqMaps[i].length - 1; j >= 0; j--) {
			var map = reqMaps[i][j];
			var filePath = i + (j + ".txt");
			if ((i < 10) && (j < 10)) {
				filePath = "0" + i + "0" + j + ".txt";
			} else if (i < 10) {
				filePath = "0" + i + j + ".txt";
			} else if (j < 10) {
				filePath = i + "0" + j + ".txt";
			}

			var ws = fs.createWriteStream("./server/maps/" + filePath);

			for (var ii = 0; ii < map.tiles.length; ii++) {
				for (var jj = 0; jj < map.tiles[ii].length; jj++) {
					ws.write(map.tiles[ii][jj]);
					if (jj != map.tiles[jj].length)
						ws.write(" ");
				};
				if (ii != map.tiles.length)
					ws.write("\n");
			};
			console.log(map);
		};
	};
	res.send(true);
};