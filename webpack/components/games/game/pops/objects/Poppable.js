export default class extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'poppable', 0);
    
    this.particles = this.game.state.states.play.particles;
    this.animations.add('crunch');
    
    this.animations._anims.crunch.onComplete.add((sprite) => {
      sprite.scale.setTo((Math.random() * 0.5) + 0.5);
      //sprite.anchor.setTo(0);
    });
  }

  crunch(x, y) {
    if(this.frame === 0)
      this.play('crunch', 15);
    
    this.particles.emitX = x;
    this.particles.emitY = y;
    this.particles.makeParticles(['crumb1', 'crumb2', 'crumb3'], 0, 30, true, false);
    this.particles.explode(750, 40);
  }

  reset() {
    this.anchor.setTo(0);
    this.scale.setTo(1);
    this.frame = 0;
  }
}