require.config({
    paths: {
        // templates: '../templates',
        jquery      : 'lib/jquery',
        underscore  : 'lib/underscore',
        gamejs      : 'lib/gamejs/gamejs',
        main        : 'modules/main'
    }
});
require(['jquery', 'gamejs', 'modules/globals', 'socket'], function($, gamejs, $globals, $socket) {
    // game init
    for (var image in $globals.images){
        gamejs.preload([$globals.images[image]]);
    }
    gamejs.ready(main);

});