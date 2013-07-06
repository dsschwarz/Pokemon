define(['underscore', 'gamejs', 'modules/globals'], function(_, $gamejs, $globals) {
    var MapObject = function(map, pos){
		MapObject.superConstructor.apply(this, arguments);
		this.moving = false;
		this.map = map;
		this.pos = pos;
		this.move_delay = 0;
		this.images = {up: map.spriteSheet.get(1),
					   down: map.spriteSheet.get(0),
					   left: map.spriteSheet.get(2),
					   right: map.spriteSheet.get(3)
					}
		this.image = this.images.down;
	}
    $gamejs.utils.objects.extend(MapObject, $gamejs.sprite.Sprite);

    MapObject.prototype.update = function(msDuration) {
      if ((this.moving) && (this.move_delay <= 0)) {
        this.move();
        this.move_delay = 500;
      };
      this.move_delay -= msDuration;

    };

    MapObject.prototype.handle = function(event) {
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


	MapObject.prototype.move = function() {
		var pos = this.pos;
      if (this.moving === "left") {
      	var check = this.map.checkSpace([pos[0], pos[1] - 1]);
      	if(check.open) {
      		this.map.objects[this.pos[0]][this.pos[1]] = 0;
      		this.pos[1] -= 1;
      		this.map.objects[this.pos[0]][this.pos[1]] = this;
      	};
      } else if(this.moving === "right") {
      	var check = this.map.checkSpace([pos[0], pos[1] + 1]);
      	if(check.open) {
      		this.map.objects[this.pos[0]][this.pos[1]] = 0;
      		this.pos[1] += 1;
      		this.map.objects[this.pos[0]][this.pos[1]] = this;
      	};
      } else if(this.moving === "down") {
      	var check = this.map.checkSpace([pos[0] + 1, pos[1]]);
      	if(check.open) {
      		this.map.objects[this.pos[0]][this.pos[1]] = 0;
      		this.pos[0] += 1;
      		this.map.objects[this.pos[0]][this.pos[1]] = this;
      	};
      } else if(this.moving === "up") {
      	var check = this.map.checkSpace([pos[0] - 1, pos[1]]);
      	if(check.open) {
      		this.map.objects[this.pos[0]][this.pos[1]] = 0;
      		this.pos[0] -= 1;
      		this.map.objects[this.pos[0]][this.pos[1]] = this;
      	};
      };
    };

    return {
        MapObject: MapObject
    };
});