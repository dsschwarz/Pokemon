define(['underscore', 'gamejs', 'modules/globals', 'modules/mapobject'], function(_, $gamejs, $globals, $mapobj) {
	var Person = function(map, pos, imageNum){
		var num = imageNum || 16;
  	Person.superConstructor.apply(this, arguments);
		this.moving = false;


		this.move_delay = 0;
		this.images = {up: map.spriteSheets.pokemon.get(1 + num*4),
					   down: map.spriteSheets.pokemon.get(0 + num*4),
					   left: map.spriteSheets.pokemon.get(2 + num*4),
					   right: map.spriteSheets.pokemon.get(3 + num*4)
					}
		this.image = this.images.down;
	}

    $gamejs.utils.objects.extend(Person, $mapobj.MapObject);
    
	Person.prototype.handle = function(event) {
    	var $e = $gamejs.event;

    	if(event.type === $e.KEY_DOWN) {
			if (event.key == $e.K_w) {
				this.moving = 'up';
				this.image = this.images.up;
			} else if (event.key == $e.K_s) {
				this.moving = 'down';
				this.image = this.images.down;
			} else if (event.key == $e.K_d) {
				this.moving = 'right';
				this.image = this.images.right;
			} else if (event.key == $e.K_a) {
				this.moving = 'left';
				this.image = this.images.left;
			}
    	}
    	if(event.type === $e.KEY_UP) {
  			if (event.key == $e.K_w) {
  				if(this.moving === 'up') {
  					this.moving = false;
  				}
  			} else if (event.key == $e.K_s) {
  				if(this.moving === 'down') {
  					this.moving = false;
  				}
  			} else if (event.key == $e.K_d) {
  				if(this.moving === 'right') {
  					this.moving = false;
  				}
  			} else if (event.key == $e.K_a) {
  				if(this.moving === 'left') {
  					this.moving = false;
  				}
  			}
    	}
    };
    Person.prototype.update = function(msDuration) {
		if ((this.moving) && (this.move_delay <= 0)) {
			this.move();
			this.move_delay = 200;
		};
		if (this.move_delay > 0) {
			this.move_delay -= msDuration;
		};

    };

    

    Person.prototype.move = function() {
    	var pos = this.pos;
    	var check = {};
    	if (this.moving === "left") {
    		check = this.map.checkSpace([pos[0], pos[1] - 1]);
    		if(check.open) {
    			this.map.objects[this.pos[0]][this.pos[1]] = 0;
    			this.pos[1] -= 1;
    			this.map.objects[this.pos[0]][this.pos[1]] = this;
    		};
    	} else if(this.moving === "right") {
    		check = this.map.checkSpace([pos[0], pos[1] + 1]);
    		if(check.open) {
    			this.map.objects[this.pos[0]][this.pos[1]] = 0;
    			this.pos[1] += 1;
    			this.map.objects[this.pos[0]][this.pos[1]] = this;
    		};
    	} else if(this.moving === "down") {
    		check = this.map.checkSpace([pos[0] + 1, pos[1]]);
    		if(check.open) {
    			this.map.objects[this.pos[0]][this.pos[1]] = 0;
    			this.pos[0] += 1;
    			this.map.objects[this.pos[0]][this.pos[1]] = this;
    		};
    	} else if(this.moving === "up") {
    		check = this.map.checkSpace([pos[0] - 1, pos[1]]);
    		if(check.open) {
    			this.map.objects[this.pos[0]][this.pos[1]] = 0;
    			this.pos[0] -= 1;
    			this.map.objects[this.pos[0]][this.pos[1]] = this;
    		};
    	};
  		if (check.edge) {
  			this.map.changeMap(this.moving);
  			this.moving = false;
  			console.log("Changing Map")
  		}
    };
    var NonPlayableChar = function(map, pos, imageNum, moveCycle) {
  		NonPlayableChar.superConstructor.apply(this, arguments);
  		this.currentMove = 0;
  		this.moveTimer = 0;
  		if (!moveCycle) {
	  		this.moveCycle = [{dir: "right", spaces: 4},
	  						   {dir: "left", spaces: 4}];
		} else {
			this.moveCycle = moveCycle;
		}
    }
    $gamejs.utils.objects.extend(NonPlayableChar, Person);

    NonPlayableChar.prototype.update = function(msDuration) {
    	if (this.move_delay <= 0) {
			if ((this.moving) ) {
				this.move();
				this.move_delay = 500;
			}
			this.moveTimer -= 1;
			if (this.moveTimer < 0) {
				this.currentMove ++;
				if (this.currentMove > this.moveCycle.length - 1) {
					this.currentMove = 0;
				}
				this.moving = this.moveCycle[this.currentMove].dir;
				if (this.moving) {
					this.image = this.images[this.moving];
				}
				this.moveTimer = this.moveCycle[this.currentMove].spaces;
			}
		};
		this.move_delay -= msDuration;

    }

    return {
    	Person: Person,
    	NPC: NonPlayableChar
    }
});
