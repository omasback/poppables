export default class extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'poppable', 0);
    
    this.anchor.setTo(0.5);
    this.animations.add('crunch');
  }

  crunch() {
    if(this.frame === 0)
      this.play('crunch', 15);
  }
}