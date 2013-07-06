define(['gamejs', 'modules/globals', 'modules/maps', 'modules/animation', 'modules/mapobject', 'modules/people'], 
	function($gamejs, $globals, $maps, $anim, $mapobj, $people) {

	var Map = function() {
		this.tiles = $maps[0]; // Two dimensional array of tiles
		this.objects = []; //2D array of objects
		for (var i = this.tiles.length - 1; i >= 0; i--) {
			var temp = [];
			for (var j = this.tiles[i].length - 1; j >= 0; j--) {
				temp[j] = 0;
			};
			this.objects.push(temp);
		};
		this.objectGroup = new $gamejs.sprite.Group();
		this.TILE_SIZE = [30,30];
		this.playerPos = [0, 0];
		this.spriteSheets = {
			pokemon: new $anim.SpriteSheet($globals.images.sprites, [20, 24], [[340,96], [420,600]]),
			objects: new $anim.SpriteSheet($globals.images.sprites, [20, 24], [[340,0], [420,96]])
		};

		console.log(this.spriteSheets);
		this.tileImages = [$gamejs.transform.scale($gamejs.image.load($globals.images.grass), this.TILE_SIZE),
							$gamejs.transform.scale($gamejs.image.load($globals.images.dirt), this.TILE_SIZE)];
		this.update = function(msDuration) {
			this.objectGroup.update(msDuration);
		};
		this.draw = function(surface){
			var screenSize = $globals.game.screenSize;
			var width = Math.floor(screenSize[0]/this.TILE_SIZE[0]);
			var height = Math.floor(screenSize[1]/this.TILE_SIZE[1]);
			var range = [[Math.max(this.playerPos[0] - Math.floor(height/2), 0),
							Math.max(this.playerPos[1] - Math.floor(width/2), 0)], 
						 [Math.min(this.playerPos[0] + Math.ceil(height/2), this.tiles.length), 
						 	Math.min(this.playerPos[1] + Math.ceil(width/2), this.tiles[0].length)]];
			// Range - rows and columns to be drawn
			for (var i = range[1][0] - 1; i >= range[0][0]; i--) {
				for (var j = range[1][1] - 1; j >= range[0][1]; j--) {
					var tile = this.tiles[i][j];
					var object = this.objects[i][j];
					surface.blit(this.tileImages[tile], new $gamejs.Rect([j * this.TILE_SIZE[1], i * this.TILE_SIZE[0]]));
					if (object != 0) {
						surface.blit(object.image, new $gamejs.Rect([j * this.TILE_SIZE[1], i * this.TILE_SIZE[0]]));
					};
				};
			};
		};

		this.addObject = function(pos, imageNum) {
			var obj = new $mapobj.MapObject(this, pos, imageNum);
			this.objects[pos[0]][pos[1]] = obj;
			console.log(obj);
			this.objectGroup.add(obj);
			return obj;
		};
		this.addPerson = function(pos, num) {
			var obj = new $people.Person(this, pos, num);
			this.objects[pos[0]][pos[1]] = obj;
			console.log(obj);
			this.objectGroup.add(obj);
			return obj;
		};
		this.addNPC = function(pos, num) {
			var obj = new $people.NPC(this, pos, num);
			this.objects[pos[0]][pos[1]] = obj;
			console.log(obj);
			this.objectGroup.add(obj);
			return obj;
		};

		this.checkSpace = function(pos) {
			var open = true;
			if (pos[1] > this.objects[0].length + 1) {
				open = false;
			} else {
				try {
					if(this.objects[pos[0]][pos[1]] != 0) {
						open = false;
					}
				} catch(err) {
					open = false;
				}
			};
			return {open: open};
		};

		return this;
	};
	
	return {Map: Map};
});