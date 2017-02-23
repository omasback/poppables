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
    this.poppable = new Poppable(this.game, this.game.width - 50, this.game.height - 100);
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

  init() {
    this.addRows();
    this.addPoppable();
  }

  update() {
    //physics collide with poppable and the three people.
    this.game.physics.arcade.collide(this.poppable, this.people);
    this.sort('y', Phaser.Group.SORT_ASCENDING);
    this.poppable.update();
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