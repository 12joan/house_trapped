class Enemy {

    constructor(type, x, y, does_fly, fly_pos, fly_speed, isEditor) {
        var ratio = 870 / 298;
        var height = 200;
        var width = height / ratio
        this.isEditor = isEditor
        if (isEditor == true) {
            x -= width / 2
            y -= height / 2
        }
        this.type = type
        this.does_fly = does_fly
        this.fly_pos = fly_pos
        this.fly_speed = fly_speed
        this.childEnemy = null

        this.sprite = enemies.create(x, y, type);

        this.sprite.height = height;
        this.sprite.width = width;
        if (isEditor === undefined || isEditor == false) {
            this.sprite.body.setRectangle(this.sprite.width, this.sprite.height);

            this.sprite.body.static = true;
            this.sprite.body.setCollisionGroup(enemyCollisionGroup);
            this.sprite.body.collides([playerCollisionGroup]);
            this.sprite.body.onBeginContact.add(this.touched);

            var sprite = this.sprite;

            if (!does_fly) {
                return;
            }

            setInterval(function () {
                game.add.tween(sprite.body).to(
                    fly_pos,
                    fly_speed,
                    Phaser.Easing.Quadratic.InOut,
                    true
                ).onComplete.add(function () {
                    game.add.tween(sprite.body).to(
                        { x: x, y: y },
                        fly_speed,
                        Phaser.Easing.Quadratic.InOut,
                        true
                    );
                });
            }, fly_speed * 2);

        }
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

  destroy() {
      if (this.childEnemy != null) {
          this.childEnemy.destroy(true)
      }
  }
  get_key()
  {
      return "enemies"
  }
  get_value()
  {
      // {"type":"fork","x":1429,"y":689,"does_fly":true,"fly_pos":{"x":1429,"y":489},"fly_speed":2000},
      var result = {}
      var width = this.sprite.width
      var height = this.sprite.height
      result.type = this.type
      if (this.isEditor == true) {
          result.x = this.sprite.x + width / 2
          result.y = this.sprite.y + height / 2
      } else {
          result.x = this.sprite.x
          result.y = this.sprite.y
      }
      if (this.childEnemy != null) {
          this.fly_pos = { x: this.childEnemy.x, y: this.childEnemy.y}
      }
      if (this.does_fly !== undefined) {
          result.does_fly = this.does_fly
          if (this.fly_pos != null) {
              result.fly_pos = this.fly_pos
          }
          if (this.fly_speed != null) {
              result.fly_speed = this.fly_speed
          }
      }
      return result

  }
}
