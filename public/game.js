var w = 1600
var h = 1200

if (typeof glIsEditor != "undefined") {
    if (glIsEditor == true) {
        w = 1200
        h = 800
    }
}

var game = new Phaser.Game(
  w,
  h, 
  Phaser.CANVAS
);

game.state.add('level', level);
game.state.start('level');

