var game = new Phaser.Game(
  1600,
  1200, 
  Phaser.CANVAS
);

game.state.add('level', level);
game.state.start('level');

