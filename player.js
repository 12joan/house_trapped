var on_ground, land_timer;

class Player { 
  constructor(x, y) {
    this.sprite = game.add.sprite(x, y, 'player');
    var ratio = 870 / 298;
    this.sprite.height = 150;
    this.sprite.width = this.sprite.height / ratio;

    this.sprite.animations.add("run", [1, 2]);

    game.physics.p2.enable(this.sprite);

    this.sprite.body.setRectangle(this.sprite.width, this.sprite.height);
    this.sprite.body.fixedRotation = true;

    this.sprite.body.setCollisionGroup( playerCollisionGroup );
    this.sprite.body.collides([ playerCollisionGroup, platformCollisionGroup ]);
    this.sprite.body.onBeginContact.add(this.landed);
  }

  walk(direction) {
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
      this.sprite.body.velocity.y = -500;
      this.sprite.animations.stop("run");
      this.sprite.frame = 3;
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

  landed() {
    player.sprite.frame = 0;
  }
}
