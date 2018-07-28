class FinalDoor {
    constructor(x, y, isEditor) {

        var offX = 50
        var offY = -110
        if (isEditor == true) {
            offX = 0
            offY = -210
        }
        this.sprite = doors.create(x + offX, y + offY, 'final_door');
      if (isEditor === undefined || isEditor == false) {
          this.sprite.body.setRectangle(this.sprite.width, this.sprite.height);

          this.sprite.body.static = true;
          this.sprite.body.setCollisionGroup(doorCollisionGroup);
          this.sprite.body.collides([]);
      }
  }

  enter() {
    game.paused = true;
    game.canvas.remove();
    var iframe = document.getElementsByTagName('iframe')[0];
    iframe.style.display = "inherit";
    iframe.src += "&autoplay=1";
  }
}
