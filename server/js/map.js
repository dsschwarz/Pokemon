var $maps = require("./maps");
var Map = function(mapPos) {
  this.mapPos = mapPos || [0, 0];
  var mapInfo = $maps.maps[mapPos[0]][mapPos[1]]; // Two dimensional array of tiles
  this.tiles = mapInfo.tiles;

  this.objects = []; //2D array of objects
  for (var i = this.tiles.length - 1; i >= 0; i--) {
    var temp = [];
    for (var j = this.tiles[i].length - 1; j >= 0; j--) {
      temp[j] = 0;
    };
    this.objects.push(temp);
  };
  // this.objectGroup = new $gamejs.sprite.Group();
  this.TILE_SIZE = [30,30];
  for (var i = mapInfo.objects.length - 1; i >= 0; i--) {
    var obj = mapInfo.objects[i];
    this.addObject(obj.pos, obj.image);
  };
  
  return this;
};

Map.prototype.update = function(msDuration) {
  this.objectGroup.update(msDuration);
  this.playerPos = this.player.pos;
};
Map.prototype.addObject = function(pos, imageNum) {
  // var obj = new $mapobj.MapObject(this, pos, imageNum);
  var obj = {};
  this.objects[pos[0]][pos[1]] = obj;
  console.log(obj);
  // this.objectGroup.add(obj);
  return obj;
};
Map.prototype.addPerson = function(pos, num) {
  // var obj = new $people.Person(this, pos, num);
  var obj = {};
  this.objects[pos[0]][pos[1]] = obj;
  console.log(obj);
  console.log(obj.image)
  this.objectGroup.add(obj);
  return obj;
};
Map.prototype.addNPC = function(pos, num, moveCycle) {
  var obj = new $people.NPC(this, pos, num, moveCycle);
  this.objects[pos[0]][pos[1]] = obj;
  console.log(obj);
  this.objectGroup.add(obj);
  return obj;
};

Map.prototype.checkSpace = function(pos) {
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
exports.Map = Map;