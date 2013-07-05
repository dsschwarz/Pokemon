define(['underscore', 'gamejs', 'globals'], function(_, gamejs, globals) {

    
    var Pokemon = function(){

      Pokemon.superConstructor.apply(this, arguments);

    };
    gamejs.utils.objects.extend(Pokemon, gamejs.sprite.Sprite);

    return {
        Pokemon: Pokemon
    };
});