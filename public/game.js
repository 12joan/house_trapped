var w = 1600
var h = 1200
var div_id = null

if (typeof glIsEditor != "undefined") {
    if (glIsEditor == true) {
        w = 1200
        h = 800
        div_id = 'phaser-div'
    }
}

if (div_id == null) {
    var game = new Phaser.Game(
        w,
        h,
        Phaser.CANVAS
    );
} else {
    var game = new Phaser.Game(
        w,
        h,
        Phaser.CANVAS,
        div_id
    );
}

game.state.add('level', level);
game.state.start('level');

