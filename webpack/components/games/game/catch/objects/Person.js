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
    this.y = this.data.grass.position.y - (this.height / 2) + 5;
    this.anchor.setTo(0.5);

    this.body.immovable = true;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
    this.body.checkCollision.down = false;
    this.body.collideWorldBounds = true;
    // this.body.setSize(50, 50, 25, 80);
    this.body.setSize(70, 55, 20, 60);
    this.body.bounce.set(1);
    this.body.velocity.x = (20 * (this.data.index + 2));

    this.tween = this.game.add.tween(this).to({angle: 5}, 50).to({angle: -5}, 50, Phaser.Easing.Linear.None, false, 50).to({angle: 5}, 50, Phaser.Easing.Linear.None, false, 100).to({angle: -5}, 50, Phaser.Easing.Linear.None, false, 150).to({angle: 5}, 50, Phaser.Easing.Linear.None, false, 200).to({angle: 0}, 100, Phaser.Easing.Linear.None, false, 250);

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
    if(this.data.index === 2) {
      this.game.settings.pos = {x: this.position.x, y: this.position.y};
    }
  }

  dance() {
    this.play('dance', 5, true);
    this.tween.start();

    setTimeout((() => {
      this.animations.stop('dance', true);
    }).bind(this), 1250)
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
    this.y = this.data.grass.position.y - (this.height / 2) + 5;
  }

  update() {
    if(this.data.index === 2) {
      let dir = this.deltaX > 0 ? 1 : -1;
      this.game.settings.pos = {x: this.position.x, y: this.position.y, dir}
    }
  }
}