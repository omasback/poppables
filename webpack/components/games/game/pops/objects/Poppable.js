export default class extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'poppable', 0);

    this.crunchSound = this.game.state.states.play.crunchSound;
    this.particles = this.game.state.states.play.particles;

    this.animations.add('crunch');
    this.animations._anims.crunch.onComplete.add((sprite) => {
      sprite.scale.setTo((Math.random() * 0.5) + 0.5);
    });
  }

  crunch(x, y) {
    if(this.frame === 0) {
      this.play('crunch', 15);
      this.crunchSound.play();
    }

    this.particles.emitX = x;
    this.particles.emitY = y;
    this.particles.explode(750, 20);
  }

  reset() {
    this.anchor.setTo(0);
    this.scale.setTo(1);
    this.rotation = 0;
    this.frame = 0;
  }

  update() {

  }

  resize() {

  }

}