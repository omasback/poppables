export default class extends Phaser.Sprite {
  constructor(game, x, y, key, data) {
    super(game, x, y, key, 0);

    this.data = data;
    
    game.physics.arcade.enable(this);

    let combinedHeight = 125 * 3;

    let scalarX = this.game.width < 768 ? (this.game.width / 768) : 1;
    let scalarY = this.game.height / 2 < combinedHeight ? ((this.game.height / 2) / 3) / 125 : 1;

    this.scale.setTo(scalarX, scalarY);
    this.x = 0;
    this.y = this.game.height - ((this.height - (this.height / 8)) * this.data.index);

    this.body.collideWorldBounds = true;
  }

  resize() {

  }

  update() {
    console.log('update')
  }
}