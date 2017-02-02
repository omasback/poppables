import BubbleGroup from '../objects/BubbleGroup'
import Particle from '../objects/Particle'

export default class extends Phaser.State {

  preload() {

  }

  create() {
    this.particles = this.game.add.emitter(0, 0, 100);
    this.particles.setXSpeed(-1000, 1000);
    this.particles.setYSpeed(-1000, 1000);
    this.particles.minParticleScale = 0.5;
    this.particles.maxParticleScale = 0.5;
    this.particles.gravity = 0;

    let fontStyle = {
      font: 'bold 18pt Lato',
      strokeThickness: 5,
      stroke: 'black',
      fill: '#ffb300'
    }
    this.scoreText = this.game.add.text(0, 0, '', fontStyle);
    this.scoreText.z = 9000;
    this.textTween = this.game.add.tween(this.scoreText).to({alpha:0}, 750, Phaser.Easing.Bounce.Out);

    this.bubbles = this.game.add.group();
    //TODO - do something better than caching these in one and two..
    this.one = new BubbleGroup(this.game);
    this.two = new BubbleGroup(this.game);

    this.bubbles.add(this.one);
    this.bubbles.add(this.two);

    this.two.y = this.one.height - (this.one.bubble.height / 2);

  }

  resetGroup(i) {
    let group = this.bubbles.children[i];
    let otherGroup = i === 0 ? this.bubbles.children[1] : this.bubbles.children[0];

    group.y = (otherGroup.y + otherGroup.height) - (this.one.bubble.height / 2);

    group.forEach(((bubble) => {
      bubble.reset();
    }).bind(this))
  }

  update() {
    for(let i = 0; i < this.bubbles.children.length; i++) {
      if(this.bubbles.children[i].y <= -this.bubbles.children[i].height) {
        this.resetGroup(i);
      }
    }

    //this.objects.map(o => o.update());
  }

  render() {
    for(let i = 0; i < this.bubbles.children.length; i++) {
      //this.game.debug.spriteBounds(this.bubbles.children[i]);
    }
  }

  resize(w, h) {
    for(let i = 0; i < this.bubbles.children.length; i++) {
      this.bubbles.children[i].resize(w, h)
    }
    //this.objects.map(o => o.resize(w, h))
  }
}