class Player { 
  init(game) {
    this.sprite = game.add.sprite(400, 300, 'player');
    var ratio = 870 / 298;
    this.sprite.width = 50;
    this.sprite.height = this.sprite.width * ratio;

    game.physics.p2.enable(this.sprite);
  }

  walk(direction) {
    alert(direction);
  }

  jump() {
    alert("Whee!");
  }
}
