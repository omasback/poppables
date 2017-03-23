export default class extends Phaser.Sprite {
  constructor(game, x, y, scalar, data) {
    super(game, x, y, 'cloud', 0);

    this.data = data;
    this.speed = 0.5;

    // this.scale.setTo(scalar);
  }

  reset() {
    this.x = -this.width;
    this.y = this.game.rnd.integerInRange(25, 100);
    this.speed = 0.5;
  }

  resize() {
    // let scalar = this.game.width < this.game.height ? (this.game.width * .20) / 265
    //                                                 : (this.game.height * .20 < 265 ? (this.game.height * .20) / 265 : 1);
    // this.scale.setTo(scalar);
  }

  update() {
    // this.x += this.speed;
    // if(this.x >= this.game.width) {
    //   this.reset();
    // }
  }
}