export default class extends Phaser.Sprite {
  constructor(game, x, y, data) {
    super(game, x, y, 'item', Math.floor(Math.random() * 5));

    this.DEFAULT_SIZE = 190;
    this.DEFAULT_SCALE = 0.5;
    this.size = this.getSize();
    this.scalar = this.size / this.DEFAULT_SIZE < this.DEFAULT_SCALE ? this.size / this.DEFAULT_SIZE : this.DEFAULT_SCALE;
    this.points = this.frame === 4 ? 20 : 10;

    this.tileSize = data.tileSize;
    this.data.tileX = Math.floor(this.world.x / this.tileSize);
    this.data.tileY = Math.floor(this.world.y / this.tileSize);
    this.data.x = data.x;
    this.data.y = data.y;

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
    this.particles.makeParticles('particle', 0, 20, true, false);
    this.particles.minParticleScale = 0.5;
    this.particles.maxParticleScale = 1;
    this.particles.gravity = 0;
  }

  getTileSize() {
    if(this.game.width < this.game.height)
      return this.game.width * .20 < 128 ? this.game.width * .20 : 128;
    else
      return (this.game.height - 50) * .20 < 128 ? (this.game.height - 50) * .20 : 128;
  }

  getSize() {
    if(this.game.width < this.game.height) {
      return this.game.width * .20 < this.DEFAULT_SIZE ? this.game.width * .20 : this.DEFAULT_SIZE;
    }
    else {
      return (this.game.height - 50) * .20 < this.DEFAULT_SIZE ? (this.game.height - 50) * .20 : this.DEFAULT_SIZE;
    }
  }

  rez() {
    this.frame = Math.floor(Math.random() * 5);
    if(this.frame !== 4) {
      this.children[0].kill();
      this.points = 10;
    }
    else {
      this.children[0].revive();
      this.points = 20;
    }
    this.revive();
  }

  explode() {
    this.particles.emitX = this.world.x;
    this.particles.emitY = this.world.y;
    this.particles.explode(750, 20);
    this.kill();
  }

  match(item) {
    return item.frame === this.frame;
  }

  animate() {
    //do something to the item's scale || play an animation.
  }

  resize() {
    let tileSize = this.getTileSize();
    this.size = this.getSize();
    this.scalar = this.size / this.DEFAULT_SIZE < this.DEFAULT_SCALE ? this.size / this.DEFAULT_SIZE : this.DEFAULT_SCALE;

    this.scale.setTo(this.scalar);
    
    this.x = this.data.x * tileSize + (tileSize / 2);
    this.y = this.data.y * tileSize + (tileSize / 2);
  }

  update() {
    this.data.tileX = Math.floor(this.x / this.tileSize);
    this.data.tileY = Math.floor(this.y / this.tileSize);
  }

}