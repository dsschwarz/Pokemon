
  var Person = function(map, pos, imageNum){
    var num = imageNum || 16;
    Person.superConstructor.apply(this, arguments);
    this.moving = false;
    this.map = map;
    this.move_delay = 0;
    this.images = {
      up: map.spriteSheets.pokemon.get(1 + num*4),
      down: map.spriteSheets.pokemon.get(0 + num*4),
      left: map.spriteSheets.pokemon.get(2 + num*4),
      right: map.spriteSheets.pokemon.get(3 + num*4)
    }
    this.image = this.images.down;
    return this;
  }

  $gamejs.utils.objects.extend(Person, $mapobj.MapObject);

  
