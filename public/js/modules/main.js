define(['underscore', 'gamejs', 'modules/globals' ], function(_, gamejs, globals) {
    return function() {
        var display = gamejs.display.setMode(globals.game.screenSize);

        var tick = function(msDuration) {

            _.each(gamejs.event.get(), function(event) {
                //Handle Event
                console.warn(event);
            });

            console.warn(msDuration);
        };

        gamejs.time.fpsCallback(tick, this, globals.game.fps);
    };
});