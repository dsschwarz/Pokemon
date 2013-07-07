define(['underscore', 'gamejs', 'modules/globals', 'modules/scenes', 'modules/animation'], function(_, $gamejs, $globals, $scenes, $anim) {
    return function() {
        var display = $gamejs.display.setMode($globals.game.screenSize);
        var director = new $scenes.Director();

        director.start(new $scenes.StartScene(director));
        var tick = function(msDuration) {

            _.each($gamejs.event.get(), function(event) {
                //Handle Event
                director.handle(event);
                // console.warn(event);
            });
            director.update(msDuration);
            director.draw(display);
            // console.warn(msDuration);
        };


        $gamejs.time.fpsCallback(tick, this, $globals.game.fps);
    };
});