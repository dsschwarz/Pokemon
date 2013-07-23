define(function() {

var maps = [];

var map = 
[[1, 1, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0],
 [1, 0, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0],
 [1, 1, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0],
 [1, 0, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0],
 [1, 1, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0],

 [1, 0, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0],
 [1, 1, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0],
 [1, 0, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0],
 [1, 1, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0],
 [1, 1, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0]];

maps.push(map);
map = 
[[1, 1, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0, 1, 1,   1, 1, 0, 0, 1,   0, 0, 1, 1, 0],
 [1, 0, 1, 1, 0,   0, 0, 1, 1, 0,   1, 1, 0, 0, 1,   1, 0, 0, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0, 1, 1,   1, 1, 0, 0, 1],
 [1, 1, 1, 2, 0,   0, 0, 2, 2, 0,   0, 2, 2, 0, 0,   2, 2, 0, 0, 2,   2, 0, 0, 2, 2,   0, 2, 2, 0, 0,   2, 0, 0, 2, 2],
 [2, 0, 2, 2, 0,   0, 0, 2, 0, 2,   2, 0, 0, 2, 2,   2, 0, 0, 2, 2,   0, 0, 2, 2, 0,   0, 0, 0, 2, 0,   0, 2, 2, 0, 0],
 [2, 2, 2, 2, 0,   0, 0, 2, 2, 0,   0, 2, 2, 0, 0,   2, 2, 0, 0, 2,   2, 0, 0, 2, 2,   2, 2, 0, 0, 2,   0, 0, 2, 2, 0],

 [2, 2, 2, 2, 0,   0, 0, 2, 2, 0,   0, 2, 2, 0, 0,   2, 2, 0, 0, 2,   2, 0, 0, 2, 2,   2, 2, 0, 0, 2,   0, 0, 2, 2, 0],
 [2, 0, 2, 2, 0,   0, 0, 2, 2, 0,   2, 2, 0, 0, 2,   2, 0, 0, 0, 0,   2, 2, 0, 0, 2,   2, 0, 0, 2, 2,   2, 2, 0, 0, 2],
 [2, 2, 2, 2, 0,   0, 0, 2, 2, 0,   0, 2, 2, 0, 0,   2, 2, 0, 0, 2,   2, 0, 0, 2, 2,   0, 2, 2, 0, 0,   2, 0, 0, 2, 2],
 [2, 0, 2, 2, 0,   0, 0, 2, 0, 2,   2, 0, 0, 2, 2,   2, 0, 0, 2, 2,   0, 0, 2, 2, 0,   0, 0, 0, 2, 0,   0, 2, 2, 0, 0],
 [2, 2, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0, 1, 1,   1, 1, 0, 0, 1,   0, 0, 1, 1, 0],

 [1, 1, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0, 1, 1,   1, 1, 0, 0, 1,   0, 0, 1, 1, 0],
 [1, 0, 1, 1, 0,   1, 0, 1, 0, 1,   1, 1, 0, 0, 1,   1, 0, 0, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0, 1, 1,   1, 1, 0, 0, 1],
 [1, 1, 1, 1, 0,   1, 0, 1, 0, 1,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0, 1, 1,   0, 1, 1, 0, 0,   1, 0, 0, 1, 1],
 [1, 0, 1, 1, 0,   0, 0, 1, 0, 1,   1, 0, 0, 1, 1,   1, 0, 0, 1, 1,   1, 0, 1, 0, 1,   0, 0, 0, 1, 0,   0, 1, 1, 0, 0],
 [1, 1, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0, 1, 1,   1, 1, 0, 0, 1,   0, 0, 1, 1, 0],

 [1, 1, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0, 1, 1,   1, 1, 0, 0, 1,   0, 0, 1, 1, 0],
 [1, 0, 1, 1, 0,   0, 0, 1, 1, 0,   1, 1, 0, 0, 1,   1, 0, 0, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0, 1, 1,   1, 1, 0, 0, 1],
 [1, 1, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0, 1, 1,   0, 1, 1, 0, 0,   1, 0, 0, 1, 1],
 [1, 0, 1, 1, 0,   0, 0, 1, 0, 1,   1, 0, 0, 1, 1,   1, 0, 0, 1, 1,   0, 0, 1, 1, 0,   0, 0, 0, 1, 0,   0, 1, 1, 0, 0],
 [1, 1, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0, 1, 1,   1, 1, 0, 0, 1,   0, 0, 1, 1, 0],

 [1, 0, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   0, 0, 1, 1, 0,   0, 0, 0, 1, 0,   0, 1, 1, 0, 0],
 [1, 1, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0, 1, 1,   1, 1, 0, 0, 1,   0, 0, 1, 1, 0],
 [1, 0, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 1, 0, 0, 1,   1, 0, 0, 1, 1,   1, 1, 0, 0, 1],
 [1, 1, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   0, 0, 1, 1, 0,   0, 0, 0, 1, 0,   0, 1, 1, 0, 0],
 [1, 1, 1, 1, 0,   0, 0, 1, 1, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   1, 0, 0, 1, 1,   1, 1, 0, 0, 1,   0, 0, 1, 1, 0]];
maps.push(map);

return {
	maps: maps,
	GRASS: 0,
	DIRT: 1,
	
};
});