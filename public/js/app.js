require.config({
    paths: {
        // templates: '../templates',
        jquery      : 'lib/jquery',
        underscore  : 'lib/underscore',
        gamejs      : 'lib/gamejs/gamejs',
    }
});

require(['jquery', 'gamejs', 'modules/main', 'modules/globals'], function($, gamejs, main, globals) {
    // game init
    for (var image in globals.images){
        gamejs.preload([globals.images[image]]);
    }
    gamejs.ready(main);
});