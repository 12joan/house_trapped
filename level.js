var player, platformCollisionGroup, playerCollisionGroup, enemyCollisionGroup, platforms;

var level = {
  preload: function () {
    game.load.spritesheet('player', 'player.png', 298, 870);
    game.load.text('level_data1' ,'/level 1.json')
    game.load.spritesheet('fork', 'fork.png', 298, 870);
    game.load.spritesheet('knife', 'knife.png', 298, 870);
    game.load.spritesheet('background', 'house.png');
    game.load.spritesheet('platform', 'Platform.png');
    game.load.audio('jump', 'jump.wav');
    game.load.audio('fall', 'fall.wav');
    game.load.audio('stab', 'stab.wav');
  },

  create: function () {
    game.physics.startSystem(Phaser.Physics.P2JS);

    game.add.sprite(0, 0, 'background');

    game.world.setBounds(0, 0, 10000, 2000);

    platformCollisionGroup = game.physics.p2.createCollisionGroup();
    playerCollisionGroup = game.physics.p2.createCollisionGroup();
    enemyCollisionGroup = game.physics.p2.createCollisionGroup();

    platforms = game.add.group();
    platforms.enableBody = true;
    platforms.physicsBodyType = Phaser.Physics.P2JS;

    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.P2JS;

    platforms = game.add.group();
    platforms.enableBody = true;
    platforms.physicsBodyType = Phaser.Physics.P2JS;

    player = new Player(50, 1700);
    game.camera.follow(player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

    lvldata1=JSON.parse(game.cache.getText('level_data1'))

    for (i=0;i<lvldata1.platforms.length;i+=1) {
        curr=lvldata1.platforms[i]
        new Platform(curr.x1,curr.y,curr.x2-curr.x1)
    }

//    new Platform(45, 1789, 62);
//    new Platform(188, 1598, 57);
//    new Platform(334, 1795, 91);
//    new Platform(45, 1789, 62);
//    new Platform(188, 1598, 57);
//    new Platform(334, 1795, 91);
//    new Platform(1000, 1850, 500);

    new Enemy('fork', 480, 1820);
    new Enemy('knife', 180, 1760);

    game.physics.p2.gravity.y = 600;
    game.physics.p2.restitution = 0;
  }, 

  update: function () {
    if ( player.sprite.position.y > 2000 ) {
      player.die('fall', 3000);
    }

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

