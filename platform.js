class Platform {
  init() {
    this.sprite = game.add.sprite(400, 430, 'platform');
    this.sprite.width = 100;
    this.sprite.height = 20;

    game.physics.p2.enable(this.sprite);
    this.sprite.body.static = true;
  }
}
