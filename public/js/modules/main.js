define(['underscore', 'gamejs', 'modules/globals', 'modules/map', 'modules/animation'], function(_, $gamejs, $globals, $map, $anim) {
    return function() {
        var display = $gamejs.display.setMode($globals.game.screenSize);
        var map = $map.Map();
        var player = map.addObject([2,3]);
        var tick = function(msDuration) {

            _.each($gamejs.event.get(), function(event) {
                //Handle Event
                player.handle(event);
                // console.warn(event);
            });
            map.update(msDuration);
            map.draw(display);
            // console.warn(msDuration);
        };

        $gamejs.time.fpsCallback(tick, this, $globals.game.fps);
    };
});