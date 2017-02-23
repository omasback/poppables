export default class extends Phaser.Sprite {
  constructor(game, x, y, scalar, data) {
    super(game, x, y, 'cloud', 0);
    
    this.data = data;
    this.speed = (Math.random() + 0.5) - 0.4;

    this.scale.setTo(scalar);
  }

  reset() {
    this.x = -this.width;
    this.y = this.game.rnd.integerInRange(25, 100);
    this.speed = (Math.random() + 0.5) - 0.4;
  }

  update() {
    this.x += this.speed;
    if(this.x >= this.game.width) {
      this.reset();
    }
  }

}