define(['underscore', 'gamejs', 'globals'], function(_, gamejs, globals) {

    
    var Pokemon = function(){

      Pokemon.superConstructor.apply(this, arguments);

    };
    gamejs.utils.objects.extend(Pokemon, gamejs.sprite.Sprite);

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