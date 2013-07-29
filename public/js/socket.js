

define(['modules/main', "gamejs", "modules/globals", "modules/scenes/map"], function(main, $gamejs, $globals, $map) {
  $("#gjs-canvas").hide();
  var socket = io.connect('http://localhost:1337');
  // var socket = io.connect('http://192.34.63.118:3000');
  $globals.socket = socket;
  $gamejs.ready(main);

  socket.on('connect', function(data){
    console.log('Connected');
    $("#join-button").click(function(ev){
        if($("#join-text").val().length > 3) {
            socket.emit("join", $("#join-text").val());
            console.log("Attempting Join")
        };
    });
    socket.on('playerdc', function(player) {
      console.info(deleteObject(player.number));
      $("users-list").remove(":contains(" + "player.name" + ")")
      console.info("Player " + player.name + " disconnected");

    })
  });
  socket.on('join_success', function(players, data) {
    $("#gjs-canvas").show();
    $('#users-list').empty();
    players.forEach(function(player){
      $('#users-list').append("<li>"+player.name+"</li>");
    });
    $globals.connected = true;
    var map = new $map.MapScene($globals.game.director);
    $globals.game.director.start(map);
    $globals.game.map = map;
    map.tiles = data.map.tiles;
    data.map.objects.forEach(createObject);
    map.player = getObject(data.number);

    socket.on('new_player', function(player, mapPlayer) {
      $('#users-list').append("<li>"+player.name+"</li>");
      createObject(mapPlayer);
    });
    socket.on('move', function(number, player) {
      var clientPlayer = getObject(number);
      if (clientPlayer) {
        clientPlayer.map.objects[clientPlayer.pos[0]][clientPlayer.pos[1]] = 0;
        update_attributes(clientPlayer, player);
        if (clientPlayer.moving)
          clientPlayer.image = clientPlayer.images[clientPlayer.moving];
        clientPlayer.map.objects[clientPlayer.pos[0]][clientPlayer.pos[1]] = clientPlayer;
      };
    });
    socket.on('create', function(obj) {
      createObject(obj);
      console.log("Created obj" + obj.id)
    });
    socket.on('delete', deleteObject);
    socket.on('mapChange', function(data) {
      console.log("Changing Map");
      var map = new $map.MapScene($globals.game.director);
      $globals.game.director.replaceScene(map);
      $globals.game.map = map;
      map.tiles = data.map.tiles;
      data.map.objects.forEach(createObject);
      map.player = getObject(data.number);
    });
  });
  var createObject = function(obj) {
    var tempObject = false;
    if(obj.type === "mapobject")
      tempObject = $globals.game.map.addObject(obj.id, obj.pos, obj.imageNum);
    else if(obj.type === "person") {
      tempObject = $globals.game.map.addPerson(obj.id, obj.pos, obj.imageNum);
    };
    update_attributes(tempObject, obj);
    if (tempObject.moving)
      tempObject.image = tempObject.images[tempObject.moving];
    return tempObject;
  }
  var getObject = function(number) {
    var tempObject = false;
    $globals.game.map.objectGroup.forEach(function(object) {
      if (object.id === number) {
        tempObject = object;
      };
    })
    return tempObject;
  }
  // Adds all the attributes from obj2 to obj
  // NOTE: This is a FULL clone, obj and obj2 will share NO objects
  var update_attributes = function(obj, obj2){
      if(obj2 == null || typeof(obj2) != 'object')
          return obj2;
      for(var key in obj2) {
        if (obj)
          obj[key] = update_attributes(obj[key], obj2[key]);
      };
      return obj;
  };
  var deleteObject = function(number) {
    var tempObject = getObject(number);
    if (tempObject) {
      if ((tempObject.map) && (tempObject.map.remove))
        tempObject.map.remove(tempObject);
      else if (tempObject.kill)
        tempObject.kill();
      else {
        console.warn("Could not delete object: " + number);
        console.info(tempObject);
      }
    }
  };
  return {
    socket: socket
  };
});