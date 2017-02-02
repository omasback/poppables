export default class extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'poppable', 0);
    
    this.particles = this.game.state.states.play.particles;

    //this.anchor.setTo(0.5);
    this.animations.add('crunch');
  }

  crunch(x, y) {
    if(this.frame === 0)
      this.play('crunch', 15);
    
    this.particles.emitX = x;
    this.particles.emitY = y;
    this.particles.makeParticles(['crumb1', 'crumb2', 'crumb3'], 0, 20, true, true);
    this.particles.explode(750, 30);
  }

  reset() {
    this.frame = 0;
  }


}