class FinalDoor {
  constructor(x, y) {
    this.sprite = doors.create(x+50, y-110, 'final_door');
    this.sprite.body.setRectangle(this.sprite.width, this.sprite.height);

    this.sprite.body.static = true;
    this.sprite.body.setCollisionGroup( doorCollisionGroup );
    this.sprite.body.collides([]);

  }

  enter() {
    game.paused = true;
    game.canvas.remove();
    var iframe = document.getElementsByTagName('iframe')[0];
    iframe.style.display = "inherit";
    iframe.src += "&autoplay=1";
  }
}
