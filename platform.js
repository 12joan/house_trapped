class Platform {
  init(x, y, length) {
    this.sprite = game.add.sprite(x, y, 'platform');
    this.sprite.width = length;
    this.sprite.height = 20;

    game.physics.p2.enable(this.sprite);
    this.sprite.body.static = true;
  }
}
