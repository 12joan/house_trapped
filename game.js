var player, platformCollisionGroup, playerCollisionGroup, platforms;

var game = new Phaser.Game(
  800,
  600, 
  Phaser.CANVAS
);

var level = {
  preload: function () {
    game.load.spritesheet('player', 'player.png', 298, 870);
  },

  create: function () {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.stage.backgroundColor = 0xffffff;

    game.world.setBounds(0, 0, 10000, 2000);

    platformCollisionGroup = game.physics.p2.createCollisionGroup();
    playerCollisionGroup = game.physics.p2.createCollisionGroup();

    platforms = game.add.group();
    platforms.enableBody = true;
    platforms.physicsBodyType = Phaser.Physics.P2JS;

    player = new Player(50, 1700);
    game.camera.follow(player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

    new Platform(45, 1789, 62);
    new Platform(188, 1598, 57);
    new Platform(334, 1795, 91);

    game.physics.p2.gravity.y = 600;
    game.physics.p2.restitution = 0;
  }, 

  update: function () {
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

