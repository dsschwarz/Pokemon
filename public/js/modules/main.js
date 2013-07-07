define(['underscore', 'gamejs', 'modules/globals', 'modules/map', 'modules/animation'], function(_, $gamejs, $globals, $map, $anim) {
    return function() {
        var display = $gamejs.display.setMode($globals.game.screenSize);
        var map = $map.MapScene();
        var player = map.addPerson([2,3], 0);
        map.addObject([3,2], 2)
        map.addObject([5,4], 2)
        map.addObject([2,2], 2)
        map.addObject([3,0], 1)
        map.addObject([4,4], 1)
        map.addObject([1,1], 1)
        map.addNPC([3,3], 4)
        map.addNPC([0,5], 2)
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