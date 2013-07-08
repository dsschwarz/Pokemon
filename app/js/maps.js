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
		object_data = data.slice(index, data.length);
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