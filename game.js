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

    player = new Player();
    player.init(game);

    game.physics.p2.gravity.y = 100;
  }
}

game.state.add('level', level);
game.state.start('level');

