define(['underscore','gamejs', 'modules/globals', 'modules/animation', 'modules/battles/maps', 'modules/people', 'modules/mapobject'],
  function(_, $gamejs, $globals, $anim, $battleMaps, $people, $mapobj) {

  var BattleScene = function(director) {

    this.tiles = $battleMaps.maps[0]; // Two dimensional array of tiles
    this.objects = []; //2D array of objects
    for (var i = this.tiles.length - 1; i >= 0; i--) {
      var temp = [];
      for (var j = this.tiles[i].length - 1; j >= 0; j--) {
        temp[j] = 0;
      };
      this.objects.push(temp);
    };

    this.objectGroup = new $gamejs.sprite.Group();
    this.TILE_SIZE = [100,100];
    this.playerPos = [0, 0];
    // this.player = {} //player should be instantiated here, not in main.js
    this.director = director;
    
    this.spriteSheets = {
      pokemon: new $anim.SpriteSheet($globals.images.sprites, [20, 24], [[340,96], [420,600]]),
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
    // surface.fill('#eee')
    // var font = new $gamejs.font.Font('20px monospace');
    // surface.blit(font.render("Battle"), [40, 40]);
    surface.fill('#fff');
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
    var offset = [];
    if (range[0][1] > 0) {
      offset[0] = range[0][1];
    } else {
      offset[0] = this.playerPos[1] - width/2;
    }
    if (range[0][0] > 0) {
      offset[1] = range[0][0];
    } else {
      offset[1] = this.playerPos[0] - height/2;
    }

    for (var i = range[1][0] - 1; i >= range[0][0]; i--) {
      for (var j = range[1][1] - 1; j >= range[0][1]; j--) {
        var tile = this.tiles[i][j];
        var object = this.objects[i][j];
        var draw_pos = [(j - offset[0]) * this.TILE_SIZE[1], 
        (i - offset[1]) * this.TILE_SIZE[0]];
        surface.blit(this.tileImages[tile], new $gamejs.Rect(draw_pos));
        if (object != 0) {
          surface.blit(object.image, new $gamejs.Rect(draw_pos[0] + (this.TILE_SIZE[0] - object.image.getSize()[0])/2, draw_pos[1]));
        };
      };
    };
  };

  BattleScene.prototype.handle = function(event) {
    //If pokemon is killed this.director.pop();
    if (this.player) {
      this.player.handle(event);
    };
  };

  BattleScene.prototype.addObject = function(pos, imageNum) {
    var obj = new $mapobj.MapObject(this, pos, imageNum);
    this.objects[pos[0]][pos[1]] = obj;
    this.objectGroup.add(obj);
    return obj;
  };

  BattleScene.prototype.addPerson = function(pos, num) {
    var obj = new $people.Person(this, pos, num);
    this.objects[pos[0]][pos[1]] = obj;
    this.objectGroup.add(obj);
    return obj;
  };

  BattleScene.prototype.checkSpace = function(pos) {
    var open = true;
    var edge = false;
    if ((pos[1] > this.objects[0].length - 1) || (pos[1] < 0) || (pos[0] < 0) || (pos[0] > this.objects.length - 1)) {
      open = false;
      edge = true;
      console.log("At edge")
    } else {
      if (this.objects[pos[0]][pos[1]] != 0) {
        open = false;
      }
    };
    return {
      open: open,
      edge: edge
    };
  };

  return {
    BattleScene: BattleScene
  }
});