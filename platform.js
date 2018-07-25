class Platform {
  constructor(x, y, length) {
    this.sprite = platforms.create(x + (length / 2 ), y, 'platform');
    this.sprite.width = length;
    this.sprite.height = 20;
    this.sprite.body.setRectangleFromSprite(this.sprite);

    this.sprite.body.static = true;
    this.sprite.body.setCollisionGroup( platformCollisionGroup );
    this.sprite.body.collides([ playerCollisionGroup ]);
  }
}
