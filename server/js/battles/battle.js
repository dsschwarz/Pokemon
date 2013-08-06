var $maps = require("../maps")
  , $gamejs = require("../../lib/gamejs")
  , $mapobj = require("../mapobject")
  , $pokemon = require("./pokemon");
var Battle = function(number) {
  var number = number || 0;
  var mapInfo = $maps.battleMaps[number]; // Two dimensional array of tiles
  this.tiles = mapInfo.tiles;
  this.objects = []; //2D array of objects
  for (var i = this.tiles.length - 1; i >= 0; i--) {
    var temp = [];
    for (var j = this.tiles[i].length - 1; j >= 0; j--) {
      temp[j] = new $gamejs.sprite.Group();
    };
    this.objects.push(temp);
  };
  this.objectGroup = new $gamejs.sprite.Group();
  this.TILE_SIZE = [30,30];
  for (var i = mapInfo.objects.length - 1; i >= 0; i--) {
    var obj = mapInfo.objects[i];
    this.addObject(obj.pos, obj.imgNum);
  };
  
  return this;
};

Battle.prototype.update = function(msDuration) {
  this.objectGroup.update(msDuration);
};
Battle.prototype.addObject = function(pos, imageNum) {
  var obj = new $mapobj.MapObject(this, pos, imageNum);
  this.objects[pos[0]][pos[1]].add(obj);
  this.objectGroup.add(obj);
  return obj;
};
Battle.prototype.addPokemon = function(pos, num) {
  var obj = new $pokemon.Pokemon(this, pos, num);
  this.objects[pos[0]][pos[1]].add(obj);
  this.objectGroup.add(obj);
  return obj;
};
Battle.prototype.remove = function(mapObject) {
  this.objects[mapObject.pos[0]][mapObject.pos[1]].remove(mapObject);
  this.objectGroup.remove(mapObject);
};

Battle.prototype.checkSpace = function(pos) {
  var open = true;
  var edge = false;
  var objects = {};
  if ((pos[1] > this.objects[0].length - 1) || (pos[1] < 0) || (pos[0] < 0) || (pos[0] > this.objects.length - 1)) {
    open = false;
    edge = true;
  } else {
    if(this.objects[pos[0]][pos[1]].sprites().length) { // If any object <--Change to if any "opaque" object
      open = false;
      objects = this.objects[pos[0]][pos[1]];
    }
  };
  return {
    open: open,
    edge: edge,
    objects: objects
  };
};
exports.Battle = Battle;