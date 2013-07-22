require.config({
    paths: {
        // templates: '../templates',
        jquery      : 'lib/jquery',
        underscore  : 'lib/underscore',
        gamejs      : 'lib/gamejs/gamejs',
        main        : 'modules/main'
    }
});
require(['jquery', 'gamejs', 'modules/main', 'modules/globals', 'socket'], function($, gamejs, main, $globals, $socket) {
    // game init
    for (var image in $globals.images){
        gamejs.preload([$globals.images[image]]);
    }
    gamejs.ready(main);
});