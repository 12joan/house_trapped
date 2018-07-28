var on_ground, land_timer;

class Player { 
    constructor(x, y, isEditor) {
        var height = 150
        var ratio = 870 / 298;
        var width = height / ratio
        if (isEditor == true) {
            x -= width / 2
            y -= height /2
        }
        this.sprite = game.add.sprite(x, y, 'player');
        this.isEditor = isEditor
    this.sprite.height = height;
    this.sprite.width = width;

    this.sprite.animations.add("run", [1, 2, 3, 4]);

    if (isEditor === undefined || isEditor == false ) {
        game.physics.p2.enable(this.sprite);

        this.sprite.body.setRectangle(this.sprite.width, this.sprite.height);
        this.sprite.body.fixedRotation = true;

        this.sprite.body.setCollisionGroup(playerCollisionGroup);
        this.sprite.body.collides([enemyCollisionGroup, platformCollisionGroup]);
        this.sprite.body.onBeginContact.add(this.landed);
    }
    this.can_move = true;
  }

  walk(direction) {
    if ( !this.can_move ) return;

    this.sprite.body.velocity.x = direction * 250;
    if ( this.can_jump ) {
      this.sprite.animations.play("run", 4, true);
    }
  }

  stop_walking() {
    this.sprite.body.velocity.x *= 0.9;
    this.sprite.animations.stop("run");
    if ( this.can_jump ) {
      this.sprite.frame = 0;
    }
  }

  jump() {
    if ( this.can_jump ) {
      this.sprite.body.velocity.y = -750;
      this.sprite.animations.stop("run");
      this.sprite.frame = 5;
      var sound = game.add.sound('jump', 0.2, false);
      sound.play();
    }
  }

  get can_jump() {
    var yAxis = p2.vec2.fromValues(0, 1);    
    var result = false;    
    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)    {        
      var c = game.physics.p2.world.narrowphase.contactEquations[i];        
      if (c.bodyA === this.sprite.body.data || c.bodyB === this.sprite.body.data)        {            
        var d = p2.vec2.dot(c.normalA, yAxis);             
        if (c.bodyA === this.sprite.body.data) d *= -1;            
        if (d > 0.5) result = true;        
      }    
    }        
    return result;
  }
  get_key() {
      return "rick"
  }
  get_value() {
      // {"x":1909,"y":1519,"tx":781,"ty":698},
      var height = 150
      var ratio = 870 / 298;
      var width = height / ratio
      var result = {}

      if (this.isEditor == true) {
          result.x = this.sprite.x + width / 2
          result.y = this.sprite.y + height / 2
      } else {
          result.x = this.sprite.x
          result.y = this.sprite.y
      }

      return result

  }
  landed() {
    player.sprite.frame = 0;
  }

  die(sound, duration) {
    if ( this.dead ) {
      return;
    }

    this.dead = true;

    var sound = game.add.sound(sound, 1, false);
    sound.play();
    player.sprite.kill();
    setTimeout(function () {
      game.state.start('level');
    }, duration);
  }
}
