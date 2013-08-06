define(['underscore', 'gamejs', 'modules/globals', 'modules/scenes/director'], 
    function(_, $gamejs, $globals, $director) {
    return function() {
        var display = $gamejs.display.setMode($globals.game.screenSize, $gamejs.display.FULLSCREEN);

        var director = new $director.Director();
        $globals.director = director;

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