import BubbleGroup from '../objects/BubbleGroup'
// import Particle from '../objects/Particle'

export default class extends Phaser.State {

  preload() {

  }

  create() {
    this.scale.forceOrientation(false, true);
    this.scale.enterIncorrectOrientation.add(this.incorrectOrientation.bind(this));
    this.scale.leaveIncorrectOrientation.add(this.correctOrientation.bind(this));

    this.initialW = this.game.width;
    this.initialH = this.game.height;

    this.crunchSound = this.game.add.audio('crunch');

    this.particles = this.game.add.emitter(0, 0, 100);
    this.particles.setXSpeed(-1000, 1000);
    this.particles.setYSpeed(-1000, 1000);
    this.particles.minParticleScale = 0.5;
    this.particles.maxParticleScale = 0.5;
    this.particles.makeParticles(['crumb1', 'crumb2', 'crumb3'], 0, 40, true, false);
    this.particles.gravity = 0;

    this.bubbles = this.game.add.group();

    this.one = new BubbleGroup(this.game);
    this.two = new BubbleGroup(this.game);

    this.bubbles.add(this.one);
    this.bubbles.add(this.two);

    this.two.y = this.one.height - (this.one.bubble.height / 2);

    let fontStyle = {
      font: 'bold 24pt Montserrat',
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

    group.y = (otherGroup.y + otherGroup.height) - (otherGroup.children[0].height / 2);

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
  }

  render() {
  }

  resize(w, h) {
    this.bubbles.forEach(group => group.resize(w, h));
    if(this.bubbles.children[0].y < this.bubbles.children[1].y) {
      this.bubbles.children[1].y = this.bubbles.children[0].y + this.bubbles.children[0].height - (this.bubbles.children[0].children[0].height / 2);
    }
    else {
      this.bubbles.children[0].y = this.bubbles.children[1].y + this.bubbles.children[1].height - (this.bubbles.children[1].children[0].height / 2);
    }
  }

  incorrectOrientation() {
    if(!this.game.device.desktop) {
      this.game.settings.state = 'incorrect';
    }
    //
  }

  correctOrientation() {
    if(!this.game.device.desktop) {
      this.game.settings.state = 'correct';
    }
    //
  }
}