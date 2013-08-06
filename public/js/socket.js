

define(['modules/main', "gamejs", "modules/globals", "modules/scenes/map", "modules/scenes/battle"], 
  function(main, $gamejs, $globals, $map, $battle) {
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
    var map = new $map.MapScene($globals.director, data.map.tiles);
    $globals.director.start(map);
    data.map.objects.forEach(createObject);
    map.player = getObject(data.number);

    socket.on('new_player', function(player, mapPlayer) {
      $('#users-list').append("<li>"+player.name+"</li>");
      createObject(mapPlayer);
    });
    socket.on('move', function(number, player) {
      var clientPlayer = getObject(number);
      if (clientPlayer) {
        clientPlayer.map.objects[clientPlayer.pos[0]][clientPlayer.pos[1]].remove(clientPlayer);
        update_attributes(clientPlayer, player);
        if (clientPlayer.moving)
          clientPlayer.image = clientPlayer.images[clientPlayer.moving];
        clientPlayer.map.objects[clientPlayer.pos[0]][clientPlayer.pos[1]].add(clientPlayer);
      };
    });
    socket.on('create', function(obj) {
      createObject(obj);
      console.log("Created obj" + obj.id)
    });
    socket.on('delete', deleteObject);
    socket.on('mapChange', function(data) {
      console.log("Changing Map");
      var map = new $map.MapScene($globals.director, data.map.tiles);
      $globals.director.popAll(map);
      data.map.objects.forEach(createObject);
      map.player = getObject(data.number);
    });
    socket.on('startBattle', function(data) {
      console.log("Loading Battle");
      var battle = new $battle.BattleScene($globals.director, data.tiles);
      $globals.director.push(battle);
      data.objects.forEach(createObject);
      battle.player = getObject(data.number);
      console.log(battle.objectGroup.sprites());
      console.log(battle.player);
      console.log(data.number)
    });
  });
  var createObject = function(obj) {
    var tempObject = false;
    if(obj.type === "mapobject")
      tempObject = $globals.director.getScene().addObject(obj.id, obj.pos, obj.imgNum);
    else if(obj.type === "person") {
      tempObject = $globals.director.getScene().addPerson(obj.id, obj.pos, obj.imgNum);
    } else if(obj.type === "pokemon") {
      tempObject = $globals.director.getScene().addPokemon(obj.id, obj.pos, obj.imgNum);
    };
    update_attributes(tempObject, obj);
    if (tempObject.moving)
      tempObject.image = tempObject.images[tempObject.moving];
    return tempObject;
  }
  var getObject = function(number) {
    var tempObject = false;
    $globals.director.getScene().objectGroup.forEach(function(object) {
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