class Platform {
  constructor(x, y, length) {
    this.sprite = platforms.create(x, y, 'platform');
    this.sprite.body.setRectangle(length, 20);
    this.sprite.anchor.setTo(0,0);
    this.sprite.width = length;
    this.sprite.height = 20;

    this.sprite.body.static = true;
    this.sprite.body.setCollisionGroup( platformCollisionGroup );
    this.sprite.body.collides([ playerCollisionGroup ]);
  }
}
