import Bubble from './Bubble'

export default class extends Phaser.Group {

  constructor(game) {
    super(game);
    this.inputEnableChildren = true;

    this.perCol = 4; //Math.ceil(this.game.height / Bubble.height) + 1
    this.perRow = 4; 
    this.step = this.game.width * .225;


    for(let y = 0; y < this.perCol; y++) {
      for(let x = 0; x < this.perRow; x++) {
        x % 2 === 0 ? this.add(new Bubble(game, x * this.step, y * this.step))
                    : this.add(new Bubble(game, x * this.step, y * this.step + this.step / 2));
      }
    }

    this.onChildInputDown.add(this.popBubble, this);
  }

  popBubble(bubble, cursor) {
    bubble.pop(cursor.x, cursor.y)
  }

  reset() {
    this.y = this.height;
  }

  update() {
    // console.log(this.y, this.game.height, this.height)
    this.y -= this.game.settings.speed;

    if(this.y <= -this.height)
      this.reset();
  }

  resize(w, h) {
    
  }
}