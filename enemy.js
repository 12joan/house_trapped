class Enemy {
  constructor(type, x, y) {
    this.sprite = enemies.create(x, y, type);
    var ratio = 870 / 298;
    this.sprite.height = 200;
    this.sprite.width = this.sprite.height / ratio;

    this.sprite.body.setRectangle(this.sprite.width, this.sprite.height);

    this.sprite.body.static = true;
    this.sprite.body.setCollisionGroup( enemyCollisionGroup );
    this.sprite.body.collides([ playerCollisionGroup ]);
    this.sprite.body.onBeginContact.add(this.touched);
  }

  touched() {
    player.die('stab', 1000);
  }
}
