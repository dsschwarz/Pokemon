define(['underscore','gamejs', 'modules/globals', 'modules/maps', 'modules/animation', 'modules/mapobject', 'modules/people'], 
	function(_, $gamejs, $globals, $maps, $anim, $mapobj, $people) {

	var Director = function() {
		this.onAir = false;
		this.activeScene = null;
		this.sceneStack = [];

		this.update = function(msDuration) {
			if (!this.onAir) return;

			if (this.activeScene.update) {
				this.activeScene.update(msDuration);
			}
		}

		this.draw = function(display) {
			if (!this.onAir) return;
			if (this.activeScene.draw) {
				this.activeScene.draw(display);
			}
		};

		this.handle = function(event) {
			if (!this.onAir) return;
			if (this.activeScene.handle) {
				this.activeScene.handle(event);
			} else {
				console.warn("Director handle, no map handle")
			}
		};

		this.start = function(scene) {
			this.onAir = true;
			this.replaceScene(scene);
			return;
		};

		this.replaceScene = function(scene) {
			this.activeScene = scene;
			this.sceneStack.pop();
			this.sceneStack.push(scene);
		};
		this.push = function(scene) {
			this.sceneStack.push(scene);
			this.activeScene = scene;
		};
		this.pop = function() {
			this.sceneStack.pop();
			if (this.sceneStack.length >= 1) {
				this.activeScene = this.sceneStack[this.sceneStack.length - 1];
			} else {
				this.activeScene = null;
				console.warn("Warn: No scenes left in stack")
				this.onAir = false;
			}
		}
		this.popAll = function () {
			this.sceneStack = [];
			this.activeScene = null;
			this.onAir = false;
		}

		this.getScene = function() {
			return this.activeScene;
		};
		return this;
	};
	var StartScene = function(director) {
		this.director = director;
		this.draw = function(surface) {
			surface.fill('#eee')
			var font = new $gamejs.font.Font('20px monospace');
			surface.blit(font.render("Press any key to begin"), [40, 40]);
		};
		this.handle = function(event) {
			if(event.type === $gamejs.event.KEY_DOWN) {
		        var map = new MapScene(this.director);
		        map.player = map.addPerson([2,3]);
		        map.addObject([3,2], 2)
		        map.addObject([5,4], 2)
		        map.addObject([2,2], 2)
		        map.addObject([3,0], 1)
		        map.addObject([4,4], 1)
		        map.addObject([1,1], 1)
		        map.addNPC([3,3], 4)
		        map.addNPC([0,5], 2)
		        this.director.replaceScene(map);
			}
		}
	}


	var MapScene = function(director) {
		this.tiles = $maps[1]; // Two dimensional array of tiles
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
		// this.player = {} //player should be instantiated here, not in main.js
		this.director = director;
		this.spriteSheets = {
			pokemon: new $anim.SpriteSheet($globals.images.sprites, [20, 24], [[340,96], [420,600]]),
			objects: new $anim.SpriteSheet($globals.images.sprites, [20, 24], [[340,0], [420,96]])
		};
		this.tileImages = [$gamejs.transform.scale($gamejs.image.load($globals.images.grass), this.TILE_SIZE),
							$gamejs.transform.scale($gamejs.image.load($globals.images.dirt), this.TILE_SIZE)];
		this.update = function(msDuration) {
			this.objectGroup.update(msDuration);
			this.playerPos = this.player.pos;
		};
		this.draw = function(surface){
			surface.fill('#fff')
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
					var draw_pos = [(j - range[0][1]) * this.TILE_SIZE[1], 
						(i - range[0][0]) * this.TILE_SIZE[0]];
					surface.blit(this.tileImages[tile], new $gamejs.Rect(draw_pos));
					if (object != 0) {
						surface.blit(object.image, new $gamejs.Rect(draw_pos));
					};
				};
			};
		};
		this.handle = function(event) {
			if (event.type === $gamejs.event.MOUSE_DOWN) {
				director.pop();
			}
			if (this.player) {
				this.player.handle(event);
			};
		}
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
			var edge = false;
			if ((pos[1] > this.objects[0].length - 1) || (pos[1] < 0) || (pos[0] < 0) || (pos[0] > this.objects.length - 1)) {
				open = false;
				edge = true;
				console.log("At edge")
			} else {
				if(this.objects[pos[0]][pos[1]] != 0) {
					open = false;
				}
			};
			return {
				open: open,
				edge: edge
			};
		};
		this.changeMap = function(dir) {
			if (dir === "right") {
				var map = new MapScene(this.director);
				map.player = map.addPerson([this.playerPos[0], 0])
				this.director.push(map);
			} else if (dir === "left") {
				var map = new MapScene(this.director);
				map.player = map.addPerson([this.playerPos[0], map.objects[0].length - 1])
				this.director.push(map);
			} else if (dir === "up") {
				var map = new MapScene(this.director);
				map.player = map.addPerson([map.objects.length - 1, this.playerPos[1]])
				this.director.push(map);
			} else if (dir === "down") {
				var map = new MapScene(this.director);
				map.player = map.addPerson([0, this.playerPos[1]])
				this.director.push(map);
			}
		};

		return this;
	};

	
	return {
		StartScene: StartScene,
		MapScene: MapScene,
		Director: Director
	};
});