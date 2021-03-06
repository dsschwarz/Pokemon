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
  
    // Preload Images
  for (var image in $globals.images){
      $gamejs.preload([$globals.images[image]]);
  }
  var panReady = false;
  var panning = false;
  var prevMousePos = [0, 0];
  var offset = [0, 0]; // Can be changed by editor (pan)
  var map = {};
  var maps = [];
  $gamejs.ready(function(){
    var canvas  =$("#gjs-canvas");
    var display = $gamejs.display.setMode([600, 600]);
    var tileType = 1;
    var tileSelect = $(".tiles-select");
    for (var i = tileSelect.length - 1; i >= 0; i--) {
      tileSelect[i].onclick = function(event){
        tileType = event.target.value;
        console.log(tileType);
      }
    };
    $.ajax({
      type: "GET",
      url: "/load"
    }).done(function( data ) {
      console.log(data);
      
      for (var i = 0; i < data.maps.length; i++) {
        $("#map-row").append("<option value='" + i + "''>" + i + "</option>");
        var row = [];
        for (var j = 0; j < data.maps[i].length; j++) {
          row.push(new Map(data.maps[i][j].tiles, data.maps[i][j].objects, [i, j]));
          data.maps[i][j].objects.forEach(function(obj) {
            row[row.length - 1].addObject(obj.pos, obj.imageNum);
          });
        };
        maps.push(row);
      };
      for (var i = data.maps[0].length - 1; i >= 0; i--) {
        $("#map-column").prepend("<option value='" + i + "''>" + i + "</option>")
      };
      map = maps[0][0];
      map.draw(display);
      var getMap = function(event) {
        map = maps[$("#map-row").val()][$("#map-column").val()];
        map.draw(display);
      };
      $("#map-row").change(getMap);
      $("#map-column").change(getMap);
      $("#addRowButton").click(addRow);
      $("#addColumnButton").click(addCol);
      $("#randButton").click(function(ev) {
        randomize([0, map.tiles.length - 1], [0, map.tiles[0].length - 1])
      });
      $("#saveButton").click(function(event) {
        dataMaps = [];
        // var objs = [];
        // map.objectGroup.forEach(function(obj) {
        //   objs.push({pos: obj.pos, imgNum: obj.imgNum})
        // })
        // dataMaps.push({tiles: map.tiles, objects: objs, pos: map.pos})
        maps.forEach(function(mapRow) {
          var row =[];
          mapRow.forEach(function(mapObject) {
            var objs = [];
            mapObject.objectGroup.forEach(function(obj) {
              objs.push({pos: obj.pos, imgNum: obj.imgNum})
            })
            dataMaps.push({tiles: mapObject.tiles, objects: objs, pos: mapObject.pos});
          })
        });
        $.ajax({
          type: "POST",
          url: "/save",
          data: {maps: dataMaps}
        }).done(function(){alert("Save Complete")});
      });
      canvas.mouseup(onMouseUp);
      canvas.mousedown(onMouseDown);
      canvas.mousemove(onMouseMove);
    });
    var onMouseDown = function(event) {
      if (panReady) {
        prevMousePos = [event.pageX, event.pageY];
        panning = true;
      } else {
        var canvasOffset = canvas.offset();
        tilePos = getTile([event.pageX - canvasOffset.left, event.pageY - canvasOffset.top]);
        map.tiles[tilePos[0]][tilePos[1]] = tileType;
        map.draw(display);
      }
    }
    var onMouseUp = function(event) {
      if(panning) {
        offset[0] += Math.floor((event.pageX - prevMousePos[0])/map.TILE_SIZE[0]);
        offset[1] += Math.floor((event.pageY - prevMousePos[1])/map.TILE_SIZE[1]);
        panning = false;
      }
      map.draw(display);
    }
    var onMouseMove = function(event) {
      if(panning) {
        offset[0] += Math.round((event.pageX - prevMousePos[0])/map.TILE_SIZE[0]);
        offset[1] += Math.round((event.pageY - prevMousePos[1])/map.TILE_SIZE[1]);
        prevMousePos = [event.pageX, event.pageY];
        map.draw(display);
      }
    }
    var getTile = function(pos) {
      // Converts pos (x, y) to tile position (row, column)
      var tilePos = [Math.floor(pos[1] / map.TILE_SIZE[1]) + offset[1], Math.floor(pos[0] / map.TILE_SIZE[0]) + offset[0]]
      console.log(tilePos);
      return(tilePos);
    }
    var addRow = function() {
      var row = [];
      var row2 = [];
      for (var i = map.tiles[0].length - 1; i >= 0; i--) {
        row.push(0);
        row2.push(0);
      };
      map.tiles.push(row);
      map.objects.push(row2);
      map.draw(display);
    };
    var randomize = function(startPos, endPos) {
      for (var i = startPos[0]; i <= startPos[1]; i++) {
        for (var j = endPos[0]; j <= endPos[1]; j++) {
          map.tiles[i][j] = Math.floor(Math.random() * 2);
        };
      };
      map.draw(display);
    };
    var addCol = function() {
      for (var i = map.tiles.length - 1; i >= 0; i--) {
        map.tiles[i].push(0);
        map.objects[i].push(0);
      };
      map.draw(display);
    }
    var onKeyDown = function(ev) {
      if (ev.keyCode === 32)
        panReady = true;
    }
    var onKeyUp = function(ev) {
      if (ev.keyCode === 32)
        panReady = false;
    }
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
  });


  



  var Map = function(tiles, objects, pos) {
    this.tiles = tiles;
    this.pos = pos;
    this.objects = []; //2D array of objects
    this.objectGroup = new $gamejs.sprite.Group();
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
    surface.fill('#ddd')
    var screenSize = [600, 600];
    var width = Math.floor(screenSize[0]/this.TILE_SIZE[0]);
    var height = Math.floor(screenSize[1]/this.TILE_SIZE[1]);
    
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
  Map.prototype.addObject = function(pos, imageNum) {
    var obj = new $mapobj.MapObject(this, pos, imageNum);
    this.objects[pos[0]][pos[1]] = obj;
    this.objectGroup.add(obj);
    return obj;
  };
  Map.prototype.handle = function(event) {
    if (event.type === $gamejs.event.MOUSE_DOWN) {
      console.log("Change tile")
    }
  };
  return;
});