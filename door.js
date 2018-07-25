class Door {
  constructor(x, y, d) {
    var destination = d;
    this.sprite = doors.create(x, y, 'door');
    this.sprite.body.setRectangle(this.sprite.width, this.sprite.height);

    this.sprite.body.static = true;
    this.sprite.body.setCollisionGroup( doorCollisionGroup );
    this.sprite.body.collides([ playerCollisionGroup ]);

    this.sprite.body.onBeginContact.add(function () {
      player.sprite.body.x = destination.x;
      player.sprite.body.y = destination.y;
    });
  }
}