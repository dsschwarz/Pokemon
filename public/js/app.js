require.config({
    paths: {
        // templates: '../templates',
        jquery      : 'lib/jquery',
        underscore  : 'lib/underscore',
        gamejs      : 'lib/gamejs/gamejs',
        main        : 'modules/main',
        globals     : 'modules/globals',
    }
});

require(['jquery', 'gamejs', 'main'], function($, gamejs, main) {
    // game init
    var images = [

    ];
    gamejs.preload(images);
    gamejs.ready(main);
});