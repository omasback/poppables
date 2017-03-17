import Person from './Person'
import Grass from './Grass'
import Poppable from './Poppable'

export default class extends Phaser.Group {
  constructor(game) {
    super(game);

    this.NUM_ROWS = 3;

    this.grass = [];
    this.people = [];

    let fontStyle = {
      font: 'bold 24pt Montserrat',
      fill: '#fff'
    }
    this.scoreText = this.game.add.text(0, 0, '', fontStyle);
    this.scoreText.z = 9000;
    this.scoreText.setShadow(1, 2, 'rgba(0,0,0,0.5)', 3);
    this.textTween = this.game.add.tween(this.scoreText).to({alpha:0}, 750, Phaser.Easing.Linear.None, false, 200);

    this.init();
  }

  addPoppable() {
    this.poppable = new Poppable(this.game, 0, 0, {people: this.people});
    this.add(this.poppable);
  }

  addRows() {
    for (let i = this.NUM_ROWS; i > 0; i--) {
      let grass = new Grass(this.game, 0, 0, 'grass'+(i), {index: i});
      let person = new Person(this.game, 0, 0, 'person'+(i), {index: i, grass: grass});
      this.add(person);
      this.add(grass);
      this.people.push(person);
      this.grass.push(grass);
    }
  }

  throwPoppable(pointer) {
    this.poppable.throw(pointer);
  }

  init() {
    this.addRows();
    this.addPoppable();

    this.game.input.onTap.add(this.throwPoppable, this);
  }

  collided(poppable, person) {
    if(poppable.pIndex * 2 === person.z) {
      this.poppable.caughtBy(person);
      person.dance();
    }
  }

  update() {
    this.game.physics.arcade.overlap(this.poppable, this.people, this.collided, null, this);

    this.poppable.update();
    this.people.map(person => person.update());
  }

  resize() {
    this.grass.map(grass => grass.resize());
    this.people.map(person => person.resize());
    this.poppable.resize();
  }

  render() {
    for(let i = 0; i < this.children.length; i++) {
      // this.game.debug.body(this.children[i]);
    }
  }
}