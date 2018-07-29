class Door {
  constructor(x, y, d, isEditor ) {
      this.destination = d;
      var offX = 50
      var offY = -110
      if (isEditor == true) {
          offX = 0
          offY = -210
      }
      this.isEditor = isEditor
      this.sprite = doors.create(x + offX, y + offY, 'door');
      if (isEditor === undefined || isEditor == false) {
          this.sprite.body.setRectangle(this.sprite.width, this.sprite.height);

          this.sprite.body.static = true;
          this.sprite.body.setCollisionGroup(doorCollisionGroup);
          this.sprite.body.collides([]);
      }
  }
  get_key() {
      return "doors"
  }
  get_value() {
      // {"x":1909,"y":1519,"tx":781,"ty":698},

      var result = {}

      if (this.isEditor == true) {
          result.x = this.sprite.x 
          result.y = this.sprite.y +210
      } else {
          result.x = this.sprite.x -50
          result.y = this.sprite.y +110
      }
      result.tx = this.destination.x
      result.ty = this.destination.y
      return result

  }
  enter() {
    if ( player.teleporting ) {
      return;
    }

    game.add.sound('door_open', 1, false).play();
    player.teleporting = true;

    player.sprite.body.velocity.x = 0;
    player.sprite.body.velocity.y = 0;
    var player_solid = true;

    var flicker_loop = setInterval(function(){
      if ( player_solid ) {
        player.sprite.alpha = 0.2;
      } else {
        player.sprite.alpha = 1;
      }

      player_solid = !player_solid;
    }, 50);
    
    game.add.tween(player.sprite.body).to(
      this.destination, 
      400, 
      Phaser.Easing.Quadratic.InOut, 
      true
    ).onComplete.add(function(){
      clearInterval(flicker_loop);
      player.sprite.alpha = 1;
      player.teleporting = false;
    });
  };
}
