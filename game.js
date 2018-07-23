var player;
var platformCollisionGroup;
var playerCollisionGroup;
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

    game.physics.p2.gravity.y = 600;
    game.physics.p2.restitution = 0;
  }, 

  update: function () {
    player.sprite.body.setZeroRotation();

    var keyH     = game.input.keyboard.addKey(Phaser.Keyboard.H);
    var keyA     = game.input.keyboard.addKey(Phaser.Keyboard.A);
    var keyLeft  = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    var keyK     = game.input.keyboard.addKey(Phaser.Keyboard.K);
    var keyW     = game.input.keyboard.addKey(Phaser.Keyboard.W);
    var keyUp    = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    var keyL     = game.input.keyboard.addKey(Phaser.Keyboard.L);
    var keyD     = game.input.keyboard.addKey(Phaser.Keyboard.D);
    var keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    var keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    var left  = keyH.isDown || keyA.isDown || keyLeft.isDown;
    var up    = keyK.isDown || keyW.isDown || keyUp.isDown    || keySpace.isDown;
    var right = keyL.isDown || keyD.isDown || keyRight.isDown;

    if (left) {
      player.walk(-1);
    } else if (right) {
      player.walk(1);
    } else {
      player.stop_walking();
    }

    if (up) {
      player.jump();
    }
  }
}

game.state.add('level', level);
game.state.start('level');

