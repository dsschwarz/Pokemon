define(['gamejs', 'modules/globals', 'modules/maps'], function($gamejs, $globals, $maps) {

	Map = function() {
		this.tiles = $maps[0]; // Two dimensional array of tiles
		this.objects = []; //2D array of objects
		for (var i = this.tiles.length - 1; i >= 0; i--) {
			var temp = [];
			for (var j = this.tiles[i].length - 1; j >= 0; j--) {

				temp[j] = 0;
			};
			this.objects.push(temp);
		};
		this.TILE_SIZE = [30,30];
		this.playerPos = [0, 0];
		this.tileImages = [$gamejs.transform.scale($gamejs.image.load($globals.images.grass), this.TILE_SIZE),
							$gamejs.transform.scale($gamejs.image.load($globals.images.dirt), this.TILE_SIZE)];
		
		this.draw = function(surface){
			var screenSize = $globals.game.screenSize;
			var width = Math.floor(screenSize[0]/this.TILE_SIZE[0]);
			var height = Math.floor(screenSize[1]/this.TILE_SIZE[1]);
			var range = [[Math.max(this.playerPos[0] - Math.floor(width/2), 0),
							Math.max(this.playerPos[1] - Math.floor(height/2), 0)], 
						 [Math.min(this.playerPos[0] + Math.ceil(width/2), this.tiles.length), 
						 	Math.min(this.playerPos[1] + Math.ceil(height/2), this.tiles.length)]];

			// Range - rows and columns to be drawn
			for (var i = range[1][0] - 1; i >= range[0][0]; i--) {
				for (var j = range[1][1] - 1; j >= range[0][1]; j--) {
					var tile = this.tiles[j][i];
					var object = this.objects[j][i];
					surface.blit(this.tileImages[tile], new $gamejs.Rect([i * this.TILE_SIZE[0], j * this.TILE_SIZE[1]], this.TILE_SIZE));
				};
			};
		};
		return this;
	};

	
	return {Map: Map};
});