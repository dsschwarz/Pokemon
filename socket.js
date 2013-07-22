var $g = require('./server/js/globals')
exports.io = function(socket) {
	console.log("A user connected");
	socket.on('join', function(name) {
		var player = new Player(name);
		$g.players.push(player);
		console.log("User added: " + name);
		socket.emit('join_success', $g.players);
		socket.broadcast.emit("new_player", player);
	});

  socket.on('disconnect', function() {
  	console.log("The user disconnected")
  });
};

counter = 0;
var Player = function(name){
	this.name = name || "Imanoob";
	this.number = counter++;
};