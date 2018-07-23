var player;
var game = new Phaser.Game(
  800,
  600, 
  Phaser.CANVAS
);

var level = {
  preload: function () {
    game.load.image('player', 'player.png');
  },

  create: function () {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.stage.backgroundColor = 0xffffff;

    player = game.add.sprite(400, 300, 'player');
    var ratio = 870 / 298;
    player.width = 50;
    player.height = player.width * ratio;

    game.physics.p2.enable(player);
    game.physics.p2.gravity.y = 100;
  }
}

game.state.add('level', level);
game.state.start('level');

