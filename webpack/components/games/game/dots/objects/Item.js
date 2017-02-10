export default class extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'item', Math.floor(Math.random() * 5));

    this.DEFAULT_SIZE = 190;
    this.DEFAULT_SCALE = 0.5;
    this.size = this.game.width * .20 < this.DEFAULT_SIZE ? this.game.width * .20 : this.DEFAULT_SIZE;
    this.scalar = this.size / this.DEFAULT_SIZE < this.DEFAULT_SCALE ? this.size / this.DEFAULT_SIZE : this.DEFAULT_SCALE;
    this.reward = this.points = this.frame === 4 ? 20 : 10;

    this.scale.setTo(this.scalar);
    this.anchor.setTo(0.5);

    let glow = this.game.add.sprite(0, 0, 'glow', 0);
    glow.anchor.setTo(0.5);
    glow.alpha = 0.6;
    this.game.add.tween(glow).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.Out, true, 0, -1, true);
    this.addChild(glow);

    if(this.frame !== 4)
      glow.kill();

    this.particles = this.game.add.emitter(0, 0, 100);
    this.particles.setXSpeed(-1000, 1000);
    this.particles.setYSpeed(-1000, 1000);
    this.particles.minParticleScale = 0.5;
    this.particles.maxParticleScale = 1;
    this.particles.gravity = 0;

  }

  rez() {
    this.frame = Math.floor(Math.random() * 5);
    this.frame !== 4 ? this.children[0].kill() : this.children[0].revive();
    this.revive();
  }

  explode() {
    this.particles.emitX = this.world.x;
    this.particles.emitY = this.world.y;
    this.particles.makeParticles('particle', 0, 30, true, false);
    this.particles.explode(750, 40);
    this.kill();
  }

  match(item) {
    return item.frame === this.frame;
  }

  animate() {
    //do something to the item's scale || play an animation.

  }

}