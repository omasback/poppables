import Person from './Person'
import Grass from './Grass'
import Poppable from './Poppable'

export default class extends Phaser.Group {
  constructor(game) {
    super(game);

    this.NUM_ROWS = 3;

    this.people = [];

    this.init();
  }

  addPoppable() {
    this.poppable = new Poppable(this.game, 0, 0);
    this.add(this.poppable);
  }

  addRows() {
    for (let i = this.NUM_ROWS; i > 0; i--) {
      let grass = new Grass(this.game, 0, 0, 'grass'+(i), {index: i});
      let person = new Person(this.game, 0, 0, 'person'+(i), {index: i, grassPos: grass.position});
      this.add(person);
      this.add(grass);
      this.people.push(person);
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

  collided(poppable, person) {
    if(poppable.pIndex * 2 === person.z) {
      this.poppable.caughtBy(person);
      this.game.camera.shake(.0025, 250);
    }
  }

  update() {
    //option 1
    this.game.physics.arcade.overlap(this.poppable, this.people, this.collided, null, this);
    //option 2
    // for (let i = 0; i < this.people.length; i++) {
    //   if (this.game.physics.arcade.intersects(this.poppable.body, this.people[i].body)) {
    //     if (this.poppable.deltaY > 0 && i === this.poppable.pIndex) {
    //       //this.people[i].animate();
    //       this.poppable.caughtBy(this.people[i]);
    //     }
    //   }
    // }
    //option 3
    // this.game.physics.arcade.collided(this.poppable, this.people, this.collided, null);
    //this.sort('y', Phaser.Group.SORT_ASCENDING);

    this.poppable.update();

  }

  resize() {

  }

  render() {
    // for(let i = 0; i < this.children.length; i++) {
    //   this.game.debug.body(this.children[i]);
    // }
  }
}