var on_ground;

class Player { 
  init(game) {
    this.sprite = game.add.sprite(400, 300, 'player');
    var ratio = 870 / 298;
    this.sprite.width = 50;
    this.sprite.height = this.sprite.width * ratio;

    game.physics.p2.enable(this.sprite);
    player.sprite.body.onBeginContact.add(this.landed);
    on_ground = true;
  }

  walk(direction) {
    this.sprite.body.velocity.x = direction * 250;
  }

  stop_walking() {
    this.sprite.body.velocity.x *= 0.9;
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
