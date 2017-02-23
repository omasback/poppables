import Row from './Row'
import Poppable from './Poppable'


export default class extends Phaser.Group {
  constructor(game) {
    super(game);
    
    this.NUM_ROWS = 3;

    this.init();
  }

  addPoppable() {
    // this.poppable = new Poppable();
  }

  addRows() {
    for(let i = this.NUM_ROWS; i > 0; i--) {
      this.add(new Row(this.game, i));
    }
  }

  init() {
    this.addRows()
  }

  update() {
    
  }

  resize() {

  }

  render() {
    // this.game.debug.spriteBounds(this.world, 'rgba(0, 0, 0, .5)')
    // this.game.debug.body(this.person1);
    // this.game.debug.body(this.person2);
    // this.game.debug.body(this.person3);
    // this.game.debug.spriteBounds(this.ground);
  
  }
}