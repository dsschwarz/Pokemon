var $globals = require("../globals")
  , $gamejs = require("../../lib/gamejs")
  , $mapobj = require("../mapobject");
var Pokemon = function(battle, pos, imageNum){
	Pokemon.superConstructor.apply(this, arguments);
	this.imgNum = imageNum || 16;
	this.moving = false;
	this.battle = battle;
	delete(this.map);
	this.type = "pokemon";
	this.move_delay = 0;
	this.stats = {
		hp: 0,
		maxhp: 0,
		energy: 500,   // Absolute max is 1000, naturally recharges only to 500
		speed: 0,
		attack: 0,
		defense: 0,
		specialAttack: 0,
		specialDefense: 0	
	}
	this.attackMode = false;
	this.attack = {
		update: function(){},
		onCollide: function(){},
		damage: 0,
		timeElapsed: 0,
		originalPos: [0, 0],
		moves: []
	}
	// Disables:
	// All have timer - when 0, removed
	// Blinds cause vision reduction - stack with each other. Deprecate over time.
	this.disables = {
		roots: [],
		stuns: [],
		slows: [],
		blinds: []
	}
	// Contain type (either flat or percent), amount, and timer
	// Flat buffs and debuffs are applied first, then percent buffs and debuffs
	this.buffs = {
		attack: [],
		defense: [],
		speed: [],
		specialAttack: [],
		specialDefense: []
	}
	this.debuffs = {
		attack: [],
		defense: [],
		speed: [],
		specialAttack: [],
		specialDefense: []
	}
	return this;
}

$gamejs.utils.objects.extend(Pokemon, $mapobj.MapObject);

Pokemon.prototype.handle = function(event) {
	var $e = $gamejs.event;
	var action = "";
	if(event.type === $e.KEY_DOWN) {
		if (event.key == $e.K_w) {
			this.moving = 'up';
			action = "move";
		} else if (event.key == $e.K_s) {
			this.moving = 'down';
			action = "move";
		} else if (event.key == $e.K_d) {
			this.moving = 'right';
			action = "move";
		} else if (event.key == $e.K_a) {
			this.moving = 'left';
			action = "move";
		}
	}
	if(event.type === $e.KEY_UP) {
		if (event.key == $e.K_w) {
			if(this.moving === 'up') {
				this.moving = false;
				action = "stop";
			}
		} else if (event.key == $e.K_s) {
			if(this.moving === 'down') {
				this.moving = false;
				action = "stop";
			}
		} else if (event.key == $e.K_d) {
			if(this.moving === 'right') {
				this.moving = false;
				action = "stop";
			}
		} else if (event.key == $e.K_a) {
			if(this.moving === 'left') {
				this.moving = false;
				action = "stop";
			}
		}
	}
	return action;
};
Pokemon.prototype.update = function(msDuration) {
	if ((this.moving) && (this.move_delay <= 0)) {
		this.move();
		this.move_delay = 200;
		this.socket.emit("move", this.id, {pos: this.pos, moving: this.moving});
		this.socket.broadcast.emit("move",  this.id, {pos: this.pos, moving: this.moving});
		console.log("Pokemon Pos: " + this.pos[0] + ", " + this.pos[1]);
	};
	if (this.move_delay > 0) {
		this.move_delay -= msDuration;
	};

};
Pokemon.prototype.move = function() {
	var check = {};
	if (this.moving === "left") {
		changePos(this, 0, -1);
	} else if(this.moving === "right") {
		changePos(this, 0, 1);
	} else if(this.moving === "down") {
		changePos(this, 1, 0);
	} else if(this.moving === "up") {
		changePos(this, -1, 0);
	};
	if (check.edge) {
		this.moving = false;
	}
};
var changePos = function(that, deltaRow, deltaCol) {
	check = that.battle.checkSpace([that.pos[0] + deltaRow, that.pos[1] + deltaCol]);
	if(check.open) {
		that.battle.objects[that.pos[0]][that.pos[1]].remove(that);
		that.pos[0] += deltaRow;
		that.pos[1] += deltaCol;
		that.battle.objects[that.pos[0]][that.pos[1]].add(that);
	};
}
exports.Pokemon = Pokemon;