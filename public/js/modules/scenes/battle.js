define(['underscore','gamejs', 'modules/globals', 'modules/animation', 'modules/battles/pokemon', 'modules/mapobject'],
  function(_, $gamejs, $globals, $anim, $pokemon, $mapobj) {

  var BattleScene = function(director, tiles) {

    this.tiles = tiles; // Two dimensional array of tiles
    this.objects = []; //2D array of objects
    for (var i = this.tiles.length - 1; i >= 0; i--) {
      var temp = [];
      for (var j = this.tiles[i].length - 1; j >= 0; j--) {
        temp[j] = new $gamejs.sprite.Group();
      };
      this.objects.push(temp);
    };

    this.objectGroup = new $gamejs.sprite.Group();
    this.TILE_SIZE = [40,40];
    this.playerPos = [0, 0];
    // this.player = {} //player should be instantiated here, not in main.js
    this.director = director;
    
    this.spriteSheets = {
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

  BattleScene.prototype.update = function(msDuration) {
    this.objectGroup.update(msDuration);
    this.playerPos = this.player.pos;
  };

  BattleScene.prototype.draw = function(surface){
    surface.fill('#fff')
    var screenSize = $globals.game.screenSize;
    var width = Math.floor(screenSize[0]/this.TILE_SIZE[0]);
    var height = Math.floor(screenSize[1]/this.TILE_SIZE[1]);

    for (var i = 0; i < this.tiles.length; i++) {
      for (var j = 0; j < this.tiles[i].length; j++) {
        var tile = this.tiles[i][j];
        var draw_pos = [
            j * this.TILE_SIZE[1], 
            i * this.TILE_SIZE[0]
          ];
        surface.blit(this.tileImages[tile], new $gamejs.Rect(draw_pos));
        // var img = this.spriteSheets.pokemon.get(j);
        // if (img)
        //   surface.blit(img, new $gamejs.Rect(draw_pos[0], draw_pos[1]))
        this.objects[i][j].draw(surface, draw_pos);
      };
    };
  };

  BattleScene.prototype.handle = function(event) {
    //If pokemon is killed this.director.pop();
    if (this.player) {
    console.log("Event in battle")
      this.player.handle(event);
    };
  };

  BattleScene.prototype.addObject = function(id, pos, imageNum) {
    var obj = new $mapobj.MapObject(this, id, pos, imageNum);
    this.objects[pos[0]][pos[1]].add(obj);
    this.objectGroup.add(obj);
    return obj;
  };

  BattleScene.prototype.addPokemon = function(id, pos, imageNum) {
    var obj = new $pokemon.Pokemon(this, id, pos, imageNum);
    this.objects[pos[0]][pos[1]].add(obj);
    this.objectGroup.add(obj);
    return obj;
  };

  BattleScene.prototype.remove = function(mapObject) {
    this.objects[mapObject.pos[0]][mapObject.pos[1]].remove(mapObject);
    this.objectGroup.remove(mapObject);
  };
  return {
    BattleScene: BattleScene
  }
});