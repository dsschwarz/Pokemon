define(["gamejs"],function($gamejs) {
    return {
        game: {
            map: {},
            fps: 36,
            director: {},
            screenSize: [window.innerWidth-100, window.innerHeight-135]
        },
        socket: {},
        players: [],
        mapPlayers: new $gamejs.sprite.Group(),
        images: {
        	grass: '/images/grass.png',
        	dirt: '/images/dirt.png',
            highGrass: '/images/highGrass.png',
            sprites: '/images/overworld-sprites.png',
            genOne: '/images/1-151.png'
        }
    };
});
