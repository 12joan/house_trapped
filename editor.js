var music, player, all_doors, platformCollisionGroup, playerCollisionGroup, enemyCollisionGroup, doorCollisionGroup, platforms;

var posX = 0
var posY = 0
var result = "hello"
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

  },

  create: function () {
    all_doors = [];


    game.add.sprite(0, 0, 'background');

    game.world.setBounds(0, 0, 10000, 2000);



    platforms = game.add.group();
    platforms.enableBody = true;
    platforms.inputEnableChildren = true;
    platforms.onChildInputDown.add(this.onDown, this);
    enemies = game.add.group();
    enemies.enableBody = true;


    doors = game.add.group();
    doors.enableBody = true;
    //doors.physicsBodyType = Phaser.Physics.P2JS;

//    player = new Player(50, 1700);
	lvldata1=JSON.parse(game.cache.getText('level_data1'))
	curr=lvldata1.rick
	player = new Player(curr.x,curr.y, true)


    for (i=0;i<lvldata1.platforms.length;i+=1) {
        curr=lvldata1.platforms[i]
        var plt = new Platform(curr.x1, curr.y, curr.x2 - curr.x1, true)
        plt.sprite.inputEnabled = true;
        plt.sprite.input.enableDrag();
        plt.sprite.events.onDragStart.add(this.onDragStart, this);
        plt.sprite.events.onDragStop.add(this.onDragStop, this);
    }

    for (i=0;i<lvldata1.enemies.length;i+=1) {
        curr=lvldata1.enemies[i]
        var enm = new Enemy(curr.type, curr.x, curr.y, true)

        enm.sprite.inputEnabled = true;
        enm.sprite.input.enableDrag();
        enm.sprite.events.onDragStart.add(this.onDragStart, this);
        enm.sprite.events.onDragStop.add(this.onDragStop, this);
    }
	
	for (i=0;i<lvldata1.doors.length;i+=1) {
        curr = lvldata1.doors[i]
        var currDoor = new Door(curr.x, curr.y, { "x": curr.tx, "y": curr.ty }, true);
        currDoor.sprite.inputEnabled = true;
        currDoor.sprite.input.enableDrag();
        currDoor.sprite.events.onDragStart.add(this.onDragStart, this);
        currDoor.sprite.events.onDragStop.add(this.onDragStop, this);
        all_doors.push(currDoor);

    }
    curr = lvldata1.final_door
    var final = new FinalDoor(curr.x, curr.y, true)
    final.sprite.inputEnabled = true;
    final.sprite.input.enableDrag();
    final.sprite.events.onDragStart.add(this.onDragStart, this);
    final.sprite.events.onDragStop.add(this.onDragStop, this);
    all_doors.push(final);
    
    cursors = game.input.keyboard.createCursorKeys();
    keyP = game.input.keyboard.addKey(Phaser.Keyboard.P)
    keyF = game.input.keyboard.addKey(Phaser.Keyboard.F)
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

//    game.physics.p2.gravity.y = 600;
//    game.physics.p2.restitution = 0;

    //if (!music) {
    //  music = game.add.sound('music', 0.1, true);
    //  music.play();
    //}
  }, 

  update: function () {
      if (cursors.up.isDown) {
          game.camera.y -= 4;
      }
      else if (cursors.down.isDown) {
          game.camera.y += 4;
      }

      if (cursors.left.isDown) {
          game.camera.x -= 4;
      }
      else if (cursors.right.isDown) {
          game.camera.x += 4;
      }
      else if (keyP.isDown) {

          plt = new Platform(this.input.mousePointer.worldX , this.input.mousePointer.worldY, 100)
          plt.sprite.inputEnabled = true;
          plt.sprite.input.enableDrag();
          plt.sprite.events.onDragStart.add(this.onDragStart, this);
          plt.sprite.events.onDragStop.add(this.onDragStop, this);

      }
      else if (keyF.isDown) {

          new Enemy("fork", this.input.mousePointer.worldX, this.input.mousePointer.worldY)
      }
  },
  onDown: function(sprite, pointer) {

      result = "Down " + sprite.key;

        console.log('down', sprite.key);

   },

 onDragStart: function(sprite, pointer) {

    result = "Dragging " + sprite.key;


   },

   onDragStop: function(sprite, pointer) {


       result = sprite.key + " dropped at x:" + pointer.worldX + " y: " + pointer.worldY;
       sprite.x = pointer.worldX - sprite.width/2
       sprite.y = pointer.worldY - sprite.height/2
    },


  render: function () {
      game.debug.text(result, 10, 20);

  }
}

