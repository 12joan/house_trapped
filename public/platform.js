class Platform {
    constructor(x, y, length, isEditor) {
    var nx = x + (length / 2), y
    var ny = y
    if (isEditor == true) {
        nx = x
        ny = y - 10
    }
    this.sprite = platforms.create(nx,ny, 'platform');
    this.sprite.width = length;
    this.sprite.height = 20;
    if (isEditor == undefined || isEditor == false) {
        this.sprite.body.setRectangleFromSprite(this.sprite);

        this.sprite.body.static = true;
        this.sprite.body.setCollisionGroup(platformCollisionGroup);
        this.sprite.body.collides([playerCollisionGroup]);
    }
  }
}
