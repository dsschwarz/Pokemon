define(['underscore','gamejs', 'modules/scenes/map'], 
  function(_, $gamejs, $map) {

  var StartScene = function(director) {
      this.director = director;
      this.draw = function(surface) {
        surface.fill('#eee')
        var font = new $gamejs.font.Font('20px monospace');
        surface.blit(font.render("Press any key to begin"), [40, 40]);
      };
      this.handle = function(event) {
        if(event.type === $gamejs.event.KEY_DOWN) {
            var map = new $map.MapScene(this.director);
            map.player = map.addPerson([2,3]);
            map.addObject([3,2], 2);
            map.addObject([5,4], 2);
            map.addObject([2,2], 2);
            map.addObject([3,0], 1);
            map.addObject([4,4], 1);
            map.addObject([1,1], 1);
            map.addNPC([3,3], 4);
            map.addNPC([0,5], 2);
            this.director.replaceScene(map);
        }
      }
    };

  return {
    StartScene: StartScene
  }
});