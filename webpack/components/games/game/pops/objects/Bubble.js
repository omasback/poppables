import Poppable from './Poppable'

export default class extends Phaser.Sprite {
  constructor(game, x, y, scalar, data) {
    super(game, x, y, 'bubble', 0);

    this.inputEnabled = true;
    this.input.useHandCursor = true;

    this.animations.add('pop');
    this.scale.setTo(scalar);

    this.poppable = new Poppable(game);
    this.addChild(this.poppable);
    this.randomizePoppable();

    this.data = data;

  }

  randomizePoppable() {
    let coin = Math.random();
    if(coin <= this.game.settings.chance) {
      this.children[0].revive();
      this.children[0].frame = 0;
    }
    else
      if(this.children[0].alive)
        this.children[0].kill();
  }

  pop(x, y) {
    this.inputEnabled = false;
    if(this.frame === 0)
      this.play('pop', 15);

    if(this.poppable.alive) {
      this.poppable.crunch(x, y);

      this.text = this.game.state.states.play.scoreText;
      this.tween = this.game.state.states.play.textTween;

      this.text.x = x;
      this.text.y = y;
      this.text.text = '+ ' + this.game.settings.multiplier;
      this.text.alpha = 1;
      this.tween.stop();
      this.tween.pendingDelete = false;
      this.tween.updateTweenData('vStart', {y: y, alpha: 1}).updateTweenData('vEnd', {y: y - 150, alpha: 0});
      this.tween.start();

      //this.game.settings.
      this.game.settings.score += this.game.settings.multiplier;
      this.game.settings.multiplier += 1;
      this.game.settings.speed === 0 ? this.game.settings.speed += 1 : this.game.settings.speed += .25;

      if(this.game.settings.speed >= this.game.settings.maxSpeed)
        this.game.settings.speed = this.game.settings.maxSpeed;
    }
    else {
      this.vibrate();
      this.game.settings.multiplier = 1;
      this.game.settings.misses += 1;
    }
  }

  reset() {
    this.inputEnabled = true;
    this.frame = 0;
    this.rotation = 0;

    this.poppable.reset();
    this.randomizePoppable();
  }

  vibrate() {
    this.game.camera.shake(.0025, 250);
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    if(navigator.vibrate) {
      navigator.vibrate(500);
    }

  }

  update() {

  }

  resize(w, h) {
    console.log(w, h);
    let step = this.game.width * .225;
    let bubbleSize = this.game.width * .25;
    let scalar = bubbleSize < 256 ? bubbleSize / 256 : .66;

    this.scale.setTo(scalar);
    this.x = this.data.x * step;
    this.y = this.data.x % 2 === 0 ? this.data.y * step : this.data.y * step + step / 2;
  }
}