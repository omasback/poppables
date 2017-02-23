//TODO - rename this group
import Grass from './Grass'
import Person from './Person'

export default class extends Phaser.Group {
  constructor(game, index) {
    super(game);

    let w = game.width;
    let h = game.height;

    this.add(new Person(game, 0, 0, 'person'+(index), {index}));
    this.add(new Grass(game, 0, 0, 'grass'+(index), {index}));
  }

  resize() {

  }

  update() {
    for(let i = 0; i < this.children.length; i++) {
      //this.children[i].update();
    }
  }
}