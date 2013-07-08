define(function() {
    console.log(window.innerWidth-20)
    return {
        game: {
            fps: 36,
            screenSize: [window.innerWidth-20, window.innerHeight-35]
        },
        images: {
        	grass: '/images/grass.png',
        	dirt: '/images/dirt.png',
            sprites: '/images/overworld-sprites.png'
        }
    };
});
