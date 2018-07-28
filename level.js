var music, player, all_doors, platformCollisionGroup, playerCollisionGroup, enemyCollisionGroup, doorCollisionGroup, platforms;

var level = {
  preload: function () {
    game.load.spritesheet('player', 'player.png', 298, 870);
    game.load.text('level_data1' ,'/level 1.json')
    game.load.spritesheet('fork', 'fork.png', 298, 870);
    game.load.spritesheet('knife', 'knife.png', 298, 870);
    game.load.spritesheet('background', 'house.png');
    game.load.spritesheet('platform', 'Platform.png');
    game.load.spritesheet('door', 'door.png');
    game.load.spritesheet('final_door', 'final_door.png');
    game.load.spritesheet('hand', 'hand.png');
    game.load.audio('music', 'music_1.wav');
    game.load.audio('jump', 'jump.wav');
    game.load.audio('fall', 'fall.wav');
    game.load.audio('stab', 'stab.wav');
    game.load.audio('door_open', 'door.wav');
  },

  create: function () {
    all_doors = [];
    game.physics.startSystem(Phaser.Physics.P2JS);

    game.add.sprite(0, 0, 'background');

    game.world.setBounds(0, 0, 10000, 2000);

    platformCollisionGroup = game.physics.p2.createCollisionGroup();
    playerCollisionGroup = game.physics.p2.createCollisionGroup();
    enemyCollisionGroup = game.physics.p2.createCollisionGroup();
    doorCollisionGroup = game.physics.p2.createCollisionGroup();

    platforms = game.add.group();
    platforms.enableBody = true;
    platforms.physicsBodyType = Phaser.Physics.P2JS;

    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.P2JS;

    doors = game.add.group();
    doors.enableBody = true;
    doors.physicsBodyType = Phaser.Physics.P2JS;

//    player = new Player(50, 1700);
	lvldata1=JSON.parse(game.cache.getText('level_data1'))
	curr=lvldata1.rick
	player = new Player(curr.x,curr.y)
    game.camera.follow(player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);
	

    for (i=0;i<lvldata1.platforms.length;i+=1) {
        curr=lvldata1.platforms[i]
        new Platform(curr.x1,curr.y,curr.x2-curr.x1)
    }

    for (i=0;i<lvldata1.enemies.length;i+=1) {
        curr=lvldata1.enemies[i]
        new Enemy(curr.type,curr.x,curr.y, curr.does_fly, curr.fly_pos, curr.fly_speed);
    }
	
	for (i=0;i<lvldata1.doors.length;i+=1) {
       curr=lvldata1.doors[i]
       all_doors.push( new Door(curr.x,curr.y,{"x":curr.tx,"y":curr.ty}) );
    }
	curr=lvldata1.final_door
	all_doors.push( new FinalDoor(curr.x,curr.y) );
//    new Platform(45, 1789, 62);
//    new Platform(188, 1598, 57);
//    new Platform(334, 1795, 91);
//    new Platform(45, 1789, 62);
//    new Platform(188, 1598, 57);
//    new Platform(334, 1795, 91);
//    new Platform(1000, 1850, 500);

//    new Enemy('fork', 480, 1820);
//    new Enemy('knife', 180, 1760);

//    new FinalDoor(400, 1300);

    game.physics.p2.gravity.y = 600;
    game.physics.p2.restitution = 0;

    if (!music) {
      music = game.add.sound('music', 0.1, true);
      music.play();
    }
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
    var keyT     = game.input.keyboard.addKey(Phaser.Keyboard.T);

    var left  = keyH.isDown || keyA.isDown || keyLeft.isDown;
    var up    = keyK.isDown || keyW.isDown || keyUp.isDown    || keySpace.isDown;
    var right = keyL.isDown || keyD.isDown || keyRight.isDown;
    var go_through_door = keyT.isDown;

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

    if (go_through_door) {
      for (var i = 0, len = all_doors.length; i < len; i++) {
        var door = all_doors[i];

        var boundsA = door.sprite.getBounds();
        var boundsB = player.sprite.getBounds();

        var overlapping = Phaser.Rectangle.intersects(boundsA, boundsB);
        if (overlapping) {
          door.enter();
        }
      }
    }
  }
}

