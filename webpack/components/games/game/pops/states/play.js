import BubbleGroup from '../objects/BubbleGroup'
import Bubble from '../objects/Bubble'
import Poppable from '../objects/Poppable'
import Particle from '../objects/Particle'

export default class extends Phaser.State {

  objects = [];

  preload() {

  }

  create() {
    this.one = new BubbleGroup(this.game);
    //this.two = new BubbleGroup(this.game);

    //this.objects.push(this.one, this.two);
  }

  update() {
    //
    //this.objects.map(o => o.update());
  }

  render() {
    // this.game.debug.spriteBounds(this.one);
    // this.game.debug.spriteBounds(this.two);
  }

  resize(w, h) {
    this.objects.map(o => o.resize(w, h))
  }
}