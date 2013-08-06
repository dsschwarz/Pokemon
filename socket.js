var $g = require('./server/js/globals')
exports.io = function(socket) {
	console.log("A user connected");
	socket.on('join', function(name) {
		var player = new Player(name);
		$g.players.push(player);
		var mapPlayer = $g.maps[0][0].addPerson([18, 10], 16);
		mapPlayer.socket = socket;
		player.number = mapPlayer.id;
		socket.set('player', player);
		socket.set('mapPlayer', mapPlayer);
		console.log("User added: " + name);
		
		var objs = [];
		mapPlayer.map.objectGroup.forEach(function(obj) {
			objs.push({pos: obj.pos, imgNum: obj.imgNum, id: obj.id, type: obj.type, moving: obj.moving})
		})
		socket.emit('join_success', $g.players, {map: {tiles: mapPlayer.map.tiles, objects: objs}, number: player.number});
		socket.broadcast.emit("new_player", player, {pos: mapPlayer.pos, imgNum: mapPlayer.imgNum, id: mapPlayer.id, type: mapPlayer.type});

		socket.on("playerEvent", function(event) {
			var action = "";
			if (mapPlayer.inBattle)
				action = mapPlayer.battlePlayer.handle(event)
			else
				action = mapPlayer.handle(event);
			// if ((action === "move") || (action === "stop")) {
			// 	socket.emit("move", player.number, {pos: mapPlayer.pos, moving: mapPlayer.moving});
			// 	socket.broadcast.emit("move", player.number, {pos: mapPlayer.pos, moving: mapPlayer.moving});
			// };
		});

		//New disconnect function
		socket.on('disconnect', function() {
		  	console.log("User removed: " + player.name)
		  	for (var i = $g.players.length - 1; i >= 0; i--) {
		  		if($g.players[i].name === player.name) {
		  			$g.players.splice(i, 1);
		  			break;
		  		}
		  	};
		  	mapPlayer.map.remove(mapPlayer);

		  	socket.broadcast.emit('playerdc', player);
		});
	});

	socket.on('disconnect', function() {
		console.log("The user disconnected")

		delete(player);
	});
};

counter = 0;
var Player = function(name){
	this.name = name || "Anonymous" + counter;
	this.number = counter++;
};