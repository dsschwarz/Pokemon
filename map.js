var fs = require('fs');
Map = function() {
	this.tiles = []; // Two dimensional array of tiles
	this.objects = []; //2D array of objects
	this.TILE_SIZE = [20,20];
	this.player_pos;
	this.tile_images = [gamejs.transform.scale(gamejs.load('images/grass.png'), TILE_SIZE),
						gamejs.transform.scale(gamejs.load('images/dirt.png'), TILE_SIZE)];
	
	return this;
};

Map.prototype.load_tiles(file_path) {
	var file = fs.readFile(file_path, 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		console.log(data);
	});


};

Map.prototype.draw(surface, screen_size){
	var width = Math.floor(screen_size[0]/this.TILE_SIZE);
	var height = Math.floor(screen_size[1]/this.TILE_SIZE);
	var range = [[player_pos[0] - Math.floor(width/2), player_pos[1] - Math.floor(height/2)], 
				 [player_pos[0] + Math.ceil(width/2), player_pos[1] + Math.ceil(height/2)]];

	// Range - rows and columns to be drawn
	for (var i = range[1][0]; i >= range[0][0]; i--) {
		for (var j = range[1][1]; j >= range[0][1]; j--) {
			var tile = tiles[i][j];
			var object = object[i][j];
			suface.blit(this.tile_images[tile], new gamejs.Rect([i * TILE_SIZE[0], j * TILE_SIZE[1]], TILE_SIZE));
		};
	};
};