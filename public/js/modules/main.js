define(['underscore', 'gamejs', 'modules/globals', 'modules/scenes/director', 'modules/animation', 'modules/scenes/start'], function(_, $gamejs, $globals, $director, $anim, $start) {
    return function() {
        var display = $gamejs.display.setMode($globals.game.screenSize);
        var director = new $director.Director();

        director.start(new $start.StartScene(director));
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