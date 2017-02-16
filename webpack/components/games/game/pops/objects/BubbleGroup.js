import Bubble from './Bubble'

export default class extends Phaser.Group {

  constructor(game) {
    super(game);

    let step = this.game.width * .225;
    let bubbleSize = this.game.width * .25;
    let scalar = bubbleSize < 256 ? bubbleSize / 256 : .66;
    let perCol = Math.ceil(this.game.height / bubbleSize) + 1
    let perRow = 4;

    this.bubble = {
      width: bubbleSize,
      height: bubbleSize,
      scalar,
      perCol,
      perRow
    }

    for(let y = 0; y < perCol; y++) {
      for(let x = 0; x < perRow; x++) {
        x % 2 === 0 ? this.add(new Bubble(game, x * step, y * step, scalar))
                    : this.add(new Bubble(game, x * step, y * step + step / 2, scalar));
      }
    }
    
    this.x = (this.game.width - this.width) / 2;
    this.onChildInputDown.add(this.popBubble, this);
  }

  popBubble(bubble, cursor) {
    bubble.pop(cursor.x, cursor.y);
  }

  update() {
    this.y -= this.game.settings.speed;
  }

  resize(w, h) {
    this.x = (this.game.width - this.width) / 2;
    this.forEach(bubble => bubble.resize(w, h));
  }
}