export default class extends Phaser.Sprite {
  constructor(game, x, y, key, data) {
    super(game, x, y, key, 0);

    this.data = data;
    this.inputEnabled = true;

    let combinedHeight = 125 * 3;
    let offsetY = this.game.device.mobileSafari && !this.game.device.iPad ? 44 : this.game.device.iPad ? 42 : 0;
    let scalarX = this.game.width < 768 ? (this.game.width / 768) : 1;
    let scalarY = this.game.height / 2 < combinedHeight ? ((this.game.height / 2) / 3) / (125 + offsetY) : 1;

    this.scale.setTo(scalarX, scalarY);
    this.x = 0;
    this.y = this.game.height - ((this.height - (this.height / 10)) * this.data.index) - (this.game.height * .1) - offsetY;

    // this.body.collideWorldBounds = true;
  }

  resize() {
    let scalarX = this.game.width < 768 ? (this.game.width / 768) : 1;
    let scalarY = this.game.height / 2 < (125 * 3) ? ((this.game.height / 2) / 3) / 125 : 1;
    let offsetY = this.game.device.mobileSafari && !this.game.device.iPad ? 44 : this.game.device.iPad ? 42 : 0;

    this.scale.setTo(scalarX, scalarY);
    this.x = 0;
    this.y = this.game.height - ((this.height - (this.height / 10)) * this.data.index) - (this.game.height * .1) - offsetY;
  }

  update() {
    console.log('update')
  }
}