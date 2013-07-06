/**
 * Root class for player and npc in the overworld.
 * Contains a reference to its position in the 2D array of map objects.
 * and a reference to the map
 */

define(['underscore', 'gamejs', 'globals'], function(_, $gamejs, $globals) {

    
    var Pokemon = function(map){


      Pokemon.superConstructor.apply(this, arguments);

      

    };
    $gamejs.utils.objects.extend(Pokemon, $gamejs.sprite.Sprite);

    Pokemon.prototype.update = function(msDuration) {
      // body...
    };

    Pokemon.prototype.draw = function(display) {
      // body...
    };

    Pokemon.prototype.handle = function(event) {
      // body...
    };

    

    return {
        Pokemon: Pokemon
    };
});