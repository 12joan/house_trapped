class FinalDoor {
    constructor(x, y, isEditor) {
        this.isEditor = isEditor
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
    get_key() {
        return "final_door"
    }
    get_value() {
        // {"x":1909,"y":1519,"tx":781,"ty":698},

        var result = {}

        if (this.isEditor == true) {
            result.x = this.sprite.x
            result.y = this.sprite.y + 210
        } else {
            result.x = this.sprite.x - 50
            result.y = this.sprite.y + 110
        }

        return result

    }
  enter() {
    game.paused = true;
    game.canvas.remove();
    var iframe = document.getElementsByTagName('iframe')[0];
    iframe.style.display = "inherit";
    iframe.src += "&autoplay=1";
  }
}
