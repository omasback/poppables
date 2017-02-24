import Person from './Person'
import Grass from './Grass'
import Poppable from './Poppable'

export default class extends Phaser.Group {
  constructor(game) {
    super(game);
    
    this.NUM_ROWS = 3;

    this.people = this.game.add.group();

    this.init();
  }

  addPoppable() {
    this.poppable = new Poppable(this.game, 0, 0);
    this.add(this.poppable);
  }

  addRows() {
    for(let i = this.NUM_ROWS; i > 0; i--) {
      let grass = new Grass(this.game, 0, 0, 'grass'+(i), {index: i});
      let person = new Person(this.game, 0, 0, 'person'+(i), {index: i, grassPos: grass.position});
      this.add(person);
      this.add(grass);
      // this.people.add(person);
    }
  }

  throwPoppable(pointer) {
    this.poppable.move(pointer);
  }

  init() {
    this.addRows();
    this.addPoppable();

    this.game.input.onTap.add(this.throwPoppable, this);
  }

  update() {
    //physics collide with poppable and the three people.
    this.game.physics.arcade.collide(this.poppable, this.people);
    //this.sort('y', Phaser.Group.SORT_ASCENDING);
    this.poppable.update();
  }

  resize() {

  }

  render() {
    console.log(this.children)
    for(let i = 0; i < this.children.length; i++) {
      this.game.debug.spriteBounds(this.children[i]);
    }  
  }
}