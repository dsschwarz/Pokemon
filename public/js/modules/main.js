define(['gamejs', 'underscore'], function(gamejs, _) {
    return function() {

        var tick = function(msDuration) {

            _.each(gamejs.event.get(), function(event) {
               console.warn(event);
            });
            console.warn(msDuration);
        };

        gamejs.time.fpsCallback(tick, this, 32);
    };
});