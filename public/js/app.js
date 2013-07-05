require.config({
    paths: {
        // templates: '../templates',
        jquery      : 'lib/jquery',
        underscore  : 'lib/underscore',
        gamejs      : 'lib/gamejs/gamejs',
    }
});

require(['jquery', 'gamejs', 'modules/main'], function($, gamejs, main) {
    // game init
    var images = [

    ];
    gamejs.preload(images);
    gamejs.ready(main);
});