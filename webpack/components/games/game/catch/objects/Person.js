// import Mouth from './Mouth'

export default class extends Phaser.Sprite {
  constructor(game, x, y, key, data) {
    super(game, x, y, key, 0);
    this.data = data;

    game.physics.arcade.enable(this);

    this.animations.add('dance');

    this.setSize();
    this.setPoints();

    this.x = game.world.randomX;
    this.y = this.data.grass.position.y - this.height + 5;

    this.body.immovable = true;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
    this.body.checkCollision.down = false;
    this.body.collideWorldBounds = true;
    this.body.setSize(50, 50, 25, 80);
    this.body.bounce.set(1);
    this.body.velocity.setTo(25 * (this.data.index + 2), 0);

    // this.particles = this.game.add.emitter(0, 0, 100);
    // this.particles.setXSpeed(-1000, 1000);
    // this.particles.setYSpeed(-1000, 1000);
    // this.particles.minParticleScale = 0.5;
    // this.particles.maxParticleScale = 0.5;
    // this.particles.makeParticles(['particle'], 0, 40, true, false);
    // this.particles.gravity = 0;
    // this.particles.emitX = this.x;
    // this.particles.emitY = this.y;
    // this.particles.explode(750, 20);
  }

  dance() {
    this.play('dance', 5, true);

    setTimeout((() => {
      this.animations.stop('dance', true);
    }).bind(this), 1250)

    // let id = setInterval((() => {
    //   this.angle += 10;
    //   if(this.angle >= 360) {
    //     clearInterval(id);
    //     this.stop('dance', true);
    //   }
    // }).bind(this), 100);

    // rotate|flip the person quickly
  }

  setPoints() {
    switch(this.data.index) {
    case 1:
      this.points = 10;
      break;
    case 2:
      this.points = 25;
      break;
    case 3:
      this.points = 50;
      break;
    }
  }

  setSize() {
    let scalar = 1;

    switch(this.data.index) {
    case 3:
      scalar = 0.4;
      break;
    case 2:
      scalar = 0.5;
      break;
    case 1:
      scalar = 0.75;
      break;
    }

    this.scale.setTo(scalar);
  }

  resize() {
    this.setSize();
    this.x = this.x;
    this.y = this.data.grass.position.y - this.height + 5;

  }

  update() {

  }
}