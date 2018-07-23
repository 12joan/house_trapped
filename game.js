var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 200 }
      }
  },
  scene: {
      preload: preload,
      create: create
  }
};

var game = new Phaser.Game(config);

function preload () {
  this.load.setBaseURL('http://labs.phaser.io');

  this.load.image('logo', 'assets/sprites/phaser3-logo.png');
}

function create () {
  this.add.sprite(400, 300, 'logo')
}

