var game = new Phaser.Game(
  800,
  600, 
  Phaser.CANVAS
);

game.state.add('level', level);
game.state.start('level');

