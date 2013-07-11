require.config({
    paths: {
        // templates: '../templates',
        jquery      : 'lib/jquery',
        underscore  : 'lib/underscore',
        gamejs      : 'lib/gamejs/gamejs',
        main        : 'modules/main',
        globals     : 'modules/globals',
    }
});
define(['gamejs', 'modules/animation', 'modules/mapobject', 'modules/globals'], 
  function($gamejs, $anim, $mapobj, $globals) {
  for (var image in $globals.images){
      $gamejs.preload([$globals.images[image]]);
      console.log($globals.images[image]);
  }

  $gamejs.ready(function(){
    var display = $gamejs.display.setMode($globals.game.screenSize);
    $.ajax({
      type: "GET",
      url: "/load"
    }).done(function( data ) {
      console.log(data);

      var map = new Map(data.maps[0][0].tiles, data.maps[0][0].objects);
      map.draw(display);
    });
  });




  var Map = function(tiles, objects) {
    this.tiles = tiles;
    this.objects = []; //2D array of objects
    for (var i = this.tiles.length - 1; i >= 0; i--) {
      var temp = [];
      for (var j = this.tiles[i].length - 1; j >= 0; j--) {
        temp[j] = 0;
      };
      this.objects.push(temp);
    };
    this.TILE_SIZE = [30,30];
    this.spriteSheets = {
      pokemon: new $anim.SpriteSheet($globals.images.sprites, [20, 24], [[340,96], [420,600]]),
      objects: new $anim.SpriteSheet($globals.images.sprites, [20, 24], [[340,0], [420,96]])
    };
    this.tileImages = [$gamejs.transform.scale($gamejs.image.load($globals.images.grass), this.TILE_SIZE),
    $gamejs.transform.scale($gamejs.image.load($globals.images.dirt), this.TILE_SIZE)];
    
    return this;
  };

  Map.prototype.draw = function(surface){
    surface.fill('#fff')
    var screenSize = $globals.game.screenSize;
    var width = Math.floor(screenSize[0]/this.TILE_SIZE[0]);
    var height = Math.floor(screenSize[1]/this.TILE_SIZE[1]);
    
    var offset = [0, 0]; // Can be changed by editor (pan)
    for (var i = this.tiles.length - 1; i >= 0; i--) {
      for (var j = this.tiles[0].length - 1; j >= 0; j--) {
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
  Map.prototype.handle = function(event) {
    if (event.type === $gamejs.event.MOUSE_DOWN) {
      console.log("Change tile")
    }
  };
  return {
    Map: Map
  }
});