var player;
var game = new Phaser.Game(
  800,
  600, 
  Phaser.CANVAS,
  'game-container'
);

var level = {
  preload: function () {
    game.load.image('player', 'player.png');
  },

  create: function () {
    player = game.add.sprite(400, 300, 'player');
    game.stage.backgroundColor = 0xffffff
    var ratio = 870 / 298;
    player.width = 50;
    player.height = player.width * ratio;
  }
}

game.state.add('level', level);
game.state.start('level');

