class Enemy {
  constructor(type, x, y, does_fly, fly_pos, fly_speed) {
    this.sprite = enemies.create(x, y, type);
    var ratio = 870 / 298;
    this.sprite.height = 200;
    this.sprite.width = this.sprite.height / ratio;

    this.sprite.body.setRectangle(this.sprite.width, this.sprite.height);

    this.sprite.body.static = true;
    this.sprite.body.setCollisionGroup( enemyCollisionGroup );
    this.sprite.body.collides([ playerCollisionGroup ]);
    this.sprite.body.onBeginContact.add(this.touched);

    var sprite = this.sprite;

    if ( !does_fly ) { 
      return;
    }

    setInterval( function () {
      game.add.tween(sprite.body).to( 
        fly_pos, 
        fly_speed, 
        Phaser.Easing.Quadratic.InOut, 
        true 
      ).onComplete.add( function () {
        game.add.tween(sprite.body).to( 
          { x: x, y: y }, 
          fly_speed, 
          Phaser.Easing.Quadratic.InOut, 
          true 
        );
      });
    }, fly_speed * 2 );
  }

  touched() {
    if ( player.teleporting ) return;

    var initial_pos = { x: player.sprite.x - 2000, y: player.sprite.y };
    var hand = game.add.sprite(initial_pos.x, initial_pos.y, 'hand');
    hand.anchor.set(0.6, 0.6);
    player.can_move = false;
    player.stop_walking();
    player.sprite.body.static = true;
    player.sprite.body.velocity.x = 0;
    player.sprite.body.velocity.y = 0;
    game.add.tween(hand).to(player.sprite.position, 400, Phaser.Easing.Quadratic.InOut, true).onComplete.add(function() {
      player.die('stab', 1000);
      game.add.tween(hand).to(initial_pos, 400, Phaser.Easing.Quadratic.InOut, true)
    });
  }
}
