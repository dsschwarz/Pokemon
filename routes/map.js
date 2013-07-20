var $g = require("../server/js/globals");
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
	console.log(req.param("maps"))
	req.param("maps").forEach(function(mapRow) {
		console.log(mapRow);
		console.log(mapRow[0].tiles)
	})
	res.send(true);
};