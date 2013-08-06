define(['underscore', 'gamejs', 'modules/globals', 'modules/mapobject'], function(_, $gamejs, $globals, $mapobj) {

  var Pokemon = function(map, pos, imageNum){
    var num = imageNum * 2 + (imageNum % 2) * 2 || 0;
    Pokemon.superConstructor.apply(this, arguments);
    this.moving = false;
    this.map = map;
    this.move_delay = 0;
    this.images = {
      up: map.spriteSheets.pokemon.get(num),
      down: map.spriteSheets.pokemon.get(num + 8),
      left: map.spriteSheets.pokemon.get(num + 1),
      right: map.spriteSheets.pokemon.get(num + 9)
    };
    this.image = this.images.down;
    return this;
  }

  $gamejs.utils.objects.extend(Pokemon, $mapobj.MapObject);
  Pokemon.prototype.handle = function(event) {
    $globals.socket.emit("playerEvent", event);
  };
  return {
    Pokemon: Pokemon
  }
});
