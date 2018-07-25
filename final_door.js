class FinalDoor {
  constructor(x, y) {
    this.sprite = doors.create(x, y, 'final_door');
    this.sprite.body.setRectangle(this.sprite.width, this.sprite.height);

    this.sprite.body.static = true;
    this.sprite.body.setCollisionGroup( doorCollisionGroup );
    this.sprite.body.collides([ playerCollisionGroup ]);

    this.sprite.body.onBeginContact.add(function () {
      var url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      var result = window.open(url);
      if ( !result ) {
        window.location = url;
      }
    });
  }
}
