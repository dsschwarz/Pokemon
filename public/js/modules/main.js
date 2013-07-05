define(['underscore', 'gamejs', 'modules/globals', 'modules/map', 'modules/animation' ], function(_, $gamejs, $globals, $map, $anim) {
    return function() {
        var display = $gamejs.display.setMode($globals.game.screenSize);
        var map = $map.Map();
        var tick = function(msDuration) {

            _.each($gamejs.event.get(), function(event) {
                //Handle Event
                // console.warn(event);
            });
            map.draw(display);
            // console.warn(msDuration);
        };

        $gamejs.time.fpsCallback(tick, this, $globals.game.fps);
    };
});