define(['underscore','gamejs', 'modules/globals', 'modules/mapinfo', 'modules/animation', 'modules/mapobject', 'modules/people', 'modules/scenes/battle'], 
  function(_, $gamejs, $globals, $mapinfo, $anim, $mapobj, $people, $battleScene) {

  var MapScene = function(director, tiles) {
    this.tiles = tiles || [[0]];
    this.objects = []; //2D array of objects

    for (var i = this.tiles.length - 1; i >= 0; i--) {
      var temp = [];
      for (var j = this.tiles[i].length - 1; j >= 0; j--) {
        temp[j] = new $gamejs.sprite.Group();
      };
      this.objects.push(temp);
    };

    this.objectGroup = new $gamejs.sprite.Group();
    this.TILE_SIZE = [25,25];
    this.playerPos = [0, 0];
    // this.player = {} //player should be instantiated here, not in main.js
    this.director = director;

    this.spriteSheets = {
      // pokemon: new $anim.SpriteSheet($globals.images.sprites, [20, 24], [[340,96], [420,600]]),
      pokemon: new $anim.SpriteSheet($globals.images.genOne,  [32, 32], [[0,8], [128,9728]]),
      objects: new $anim.SpriteSheet($globals.images.sprites, [20, 24], [[340,0], [420,96]])
    };

    this.tileImages = [
      $gamejs.transform.scale($gamejs.image.load($globals.images.grass), this.TILE_SIZE),
      $gamejs.transform.scale($gamejs.image.load($globals.images.dirt), this.TILE_SIZE),
      $gamejs.transform.scale($gamejs.image.load($globals.images.highGrass), this.TILE_SIZE)
    ];
    
    return this;
  };

  MapScene.prototype.update = function(msDuration) {
    this.objectGroup.update(msDuration);
    this.playerPos = this.player.pos;
  };

  MapScene.prototype.draw = function(surface){
    surface.fill('#fff')
    var screenSize = $globals.game.screenSize;
    var width = Math.floor(screenSize[0]/this.TILE_SIZE[0]);
    var height = Math.floor(screenSize[1]/this.TILE_SIZE[1]);
    var range = [
      [
        Math.max(this.playerPos[0] - Math.floor(height/2), 0),
        Math.max(this.playerPos[1] - Math.floor(width/2), 0)
      ], 
      [
        Math.min(this.playerPos[0] + Math.ceil(height/2), this.tiles.length), 
        Math.min(this.playerPos[1] + Math.ceil(width/2), this.tiles[0].length)
      ]
    ];
      // Range - rows and columns to be drawn
    var offset = [
      Math.floor(this.playerPos[1] - width/2), 
      Math.floor(this.playerPos[0] - height/2)
    ];

    for (var i = range[1][0] - 1; i >= range[0][0]; i--) {
      for (var j = range[1][1] - 1; j >= range[0][1]; j--) {
        var tile = this.tiles[i][j];
        var draw_pos = [
            (j - offset[0]) * this.TILE_SIZE[1], 
            (i - offset[1]) * this.TILE_SIZE[0]
          ];
        surface.blit(this.tileImages[tile], new $gamejs.Rect(draw_pos));
        // var img = this.spriteSheets.pokemon.get(j);
        // if (img)
        //   surface.blit(img, new $gamejs.Rect(draw_pos[0], draw_pos[1]))
        this.objects[i][j].draw(surface, draw_pos);
      };
    };
  };

  MapScene.prototype.handle = function(event) {
    if (this.player) {
      this.player.handle(event);
    };
  }
  MapScene.prototype.addObject = function(id, pos, imageNum) {
    var obj = new $mapobj.MapObject(this, id, pos, imageNum);
    this.objects[pos[0]][pos[1]].add(obj);
    this.objectGroup.add(obj);
    return obj;
  };
  MapScene.prototype.addPerson = function(id, pos, num) {
    var obj = new $people.Person(this, id, pos, num);
    this.objects[pos[0]][pos[1]].add(obj);
    this.objectGroup.add(obj);
    return obj;
  };

  MapScene.prototype.addNPC = function(pos, num, moveCycle) {
    var obj = new $people.NPC(this, pos, num, moveCycle);
    this.objects[pos[0]][pos[1]].add(obj);
    this.objectGroup.add(obj);
    return obj;
  };
  MapScene.prototype.remove = function(mapObject) {
    this.objects[mapObject.pos[0]][mapObject.pos[1]].remove(mapObject);
    this.objectGroup.remove(mapObject);
  };
  
  MapScene.prototype.changeMap = function(dir) {
    // Changes scene to "Loading new map"
    // contacts server requesting new map
    // pushes new map, or goes back to old if there was an error/no need to change map
    // 
    // this.director.push(new TransitionScene);
    console.log("Awaiting map change");
  };

  return {
    MapScene: MapScene
  }
});