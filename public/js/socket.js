// var socket = io.connect('http://192.34.63.118:3000');

define(["gamejs", "modules/globals"], function($gamejs, $globals) {
  $("#gjs-canvas").hide();
  var socket = io.connect('http://localhost:1337');
  socket.on('connect', function(data){
    console.log('Connected');
    $("#join-button").click(function(ev){
        if($("#join-text").val().length > 3) {
            socket.emit("join", $("#join-text").val());
            console.log("Attempting Join")
        };
    });
  });
  socket.on('new_player', function(player) {
    $('#users-list').append("<li>"+player.name+"</li>");
  });
  socket.on('join_success', function(players) {
    $("#gjs-canvas").show();
    $('#users-list').empty();
    players.forEach(function(player){
      $('#users-list').append("<li>"+player.name+"</li>");
    });
    $globals.connected = true;
  });

  // Adds all the attributes from obj2 to obj
  // NOTE: This is a FULL clone, obj and obj2 will share NO objects
  var update_attributes = function(obj, obj2){
      if(obj2 == null || typeof(obj2) != 'object')
          return obj2;

      for(var key in obj2) {
        obj[key] = update_attributes(obj[key], obj2[key]);
      };
      return obj;
  };
  return {
    socket: socket
  };
});