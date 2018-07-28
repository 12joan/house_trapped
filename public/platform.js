class Platform {
    constructor(x, y, length, isEditor) {
        var nx = x + (length / 2)
        var ny = y
        if (isEditor == true) {
            nx = x
            ny = y - 10
        }
        this.sprite = platforms.create(nx, ny, 'platform');
        this.sprite.width = length;
        this.sprite.height = 20;
        this.sprite.houseObject = this
        this.isEditor = isEditor
        if (isEditor == undefined || isEditor == false) {
            this.sprite.body.setRectangleFromSprite(this.sprite);

            this.sprite.body.static = true;
            this.sprite.body.setCollisionGroup(platformCollisionGroup);
            this.sprite.body.collides([playerCollisionGroup]);
        }
    }
    get_key() {
        return "platforms"
    }
    get_value() {
        var result = {}
        var width = this.sprite.width
        if (this.isEditor == true) {
            result.x1 = this.sprite.x
            result.y = this.sprite.y + 10
        } else {
            result.x1 = this.sprite.x - width / 2
            result.y = this.sprite.y
        }
        result.x2 = result.x1 + width
        return result

    }

}
