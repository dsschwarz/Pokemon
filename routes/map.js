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
			map.objects.forEach(function(obj) {
				objs.push({pos: obj.pos, imgNum: obj.imgNum})
			})
			row.push({tiles: map.tiles, objects: objs});
			console.log(map);
		})
		data.maps.push(row);
	})
	res.send(data);
};
exports.mapedit = function(req, res) {
	res.render("mapeditor");
};
exports.save = function(req, res) {
	console.log(req);
};