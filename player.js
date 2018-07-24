var on_ground;

class Player { 
  init() {
    this.sprite = game.add.sprite(400, 300, 'player');
    var ratio = 870 / 298;
    this.sprite.width = 50;
    this.sprite.height = this.sprite.width * ratio;

    this.sprite.animations.add("run", [1, 2]);

    game.physics.p2.enable(this.sprite);
    player.sprite.body.onBeginContact.add(this.landed);
    on_ground = true;
  }

  walk(direction) {
    this.sprite.body.velocity.x = direction * 250;
    this.sprite.animations.play("run", 4, true);
  }

  stop_walking() {
    this.sprite.body.velocity.x *= 0.9;
    this.sprite.animations.stop("run");
    this.sprite.frame = 0;
  }

  jump() {
    if ( on_ground ) {
      this.sprite.body.velocity.y = -500;
      on_ground = false;
    }
  }

  landed() {
    on_ground = true;
  }
}
