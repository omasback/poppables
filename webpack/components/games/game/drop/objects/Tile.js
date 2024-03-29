export default class extends Phaser.Sprite {
  constructor(game, x, y, data) {
    super(game, x, y, 'tiles', 0);
    
    this.DEFAULT_SIZE = 128;
    this.DEFAULT_SCALE = 1;
    this.size = this.getSize();
    this.scalar = this.size / this.DEFAULT_SIZE < this.DEFAULT_SCALE ? this.size / this.DEFAULT_SIZE : this.DEFAULT_SCALE;

    this.scale.setTo(this.scalar);
    this.anchor.setTo(0.5);
    this.inputEnabled = true;
    this.input.useHandCursor = true;

    this.data = data;
    this.x = x * this.size + (this.size / 2);
    this.y = y * this.size + (this.size / 2);
  }

  getSize() {
    if(this.game.width < this.game.height)
      return this.game.width * .20 < this.DEFAULT_SIZE ? this.game.width * .20 : this.DEFAULT_SIZE;
    else
      return (this.game.height - 50) * .20 < this.DEFAULT_SIZE ? (this.game.height - 50) * .20 : this.DEFAULT_SIZE;
    
  }

  resize() {
    this.size = this.getSize();
    this.scalar = this.size / this.DEFAULT_SIZE < this.DEFAULT_SCALE ? this.size / this.DEFAULT_SIZE : this.DEFAULT_SCALE;

    this.scale.setTo(this.scalar);
    this.x = this.data.x * this.size + (this.size / 2);
    this.y = this.data.y * this.size + (this.size / 2);
  }

  select() {
    this.frame = 1;
  }

  deselect() {
    this.frame = 0;
  }
  
}