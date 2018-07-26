class Door {
  constructor(x, y, d) {
    this.destination = d;
    this.sprite = doors.create(x+50, y-110, 'door');
    this.sprite.body.setRectangle(this.sprite.width, this.sprite.height);

    this.sprite.body.static = true;
    this.sprite.body.setCollisionGroup( doorCollisionGroup );
    this.sprite.body.collides([]);
  }

  enter() {
    player.sprite.body.x = this.destination.x;
    player.sprite.body.y = this.destination.y;
    player.sprite.body.velocity.x = 0;
    player.sprite.body.velocity.y = 0;
  };
}
