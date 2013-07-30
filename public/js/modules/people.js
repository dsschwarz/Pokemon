define(['underscore', 'gamejs', 'modules/globals', 'modules/mapobject'], function(_, $gamejs, $globals, $mapobj) {
	var Person = function(map, id, pos, imageNum){
		var num = imageNum * 2 + (imageNum % 2) * 2 || 0;
  	Person.superConstructor.apply(this, arguments);
		this.moving = false;
		this.map = map;
    console.log(num)
		this.images = {
            up: map.spriteSheets.pokemon.get(num),
            down: map.spriteSheets.pokemon.get(num + 8),
            left: map.spriteSheets.pokemon.get(num + 1),
            right: map.spriteSheets.pokemon.get(num + 9)
					}
		this.image = this.images.down;
		return this;
	}

    $gamejs.utils.objects.extend(Person, $mapobj.MapObject);
    
	Person.prototype.handle = function(event) {
    	var $e = $gamejs.event;
      $globals.socket.emit("playerEvent", event);
    };
  Person.prototype.update = function(msDuration) {
  }; 



  return {
  	Person: Person
  }
});
