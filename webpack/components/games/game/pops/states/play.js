import BubbleGroup from '../objects/BubbleGroup'
// import Particle from '../objects/Particle'

export default class extends Phaser.State {

  preload() {

  }

  create() {
    // this.game.sound.mute = true;
    this.bg = this.game.add.audio('background', .1);
    this.bg.loop = true;
    this.game.sound.setDecodedCallback([ this.bg ], () => {
      this.bg.play();
    }, this);

    this.particles = this.game.add.emitter(0, 0, 100);
    this.particles.setXSpeed(-1000, 1000);
    this.particles.setYSpeed(-1000, 1000);
    this.particles.minParticleScale = 0.5;
    this.particles.maxParticleScale = 0.5;
    this.particles.gravity = 0;

    this.bubbles = this.game.add.group();
    //TODO - do something better than caching these in one and two..
    this.one = new BubbleGroup(this.game);
    this.two = new BubbleGroup(this.game);

    this.bubbles.add(this.one);
    this.bubbles.add(this.two);

    this.two.y = this.one.height - (this.one.bubble.height / 2);

    let fontStyle = {
      font: 'bold 24pt Gotham Rounded SSm B',
      fill: '#fff'
    }
    this.scoreText = this.game.add.text(0, 0, '', fontStyle);
    this.scoreText.z = 9000;
    this.scoreText.setShadow(1, 2, 'rgba(0,0,0,0.5)', 3);
    this.textTween = this.game.add.tween(this.scoreText).to({alpha:0}, 750, Phaser.Easing.Linear.None, false, 200);
    
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