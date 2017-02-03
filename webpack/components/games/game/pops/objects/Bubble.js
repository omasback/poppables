import Poppable from './Poppable'

export default class extends Phaser.Sprite {
  constructor(game, x, y, scalar) {
    super(game, x, y, 'bubble', 0);

    this.inputEnabled = true;
    this.input.useHandCursor = true;

    this.animations.add('pop');
    this.scale.setTo(scalar);

    this.poppable = new Poppable(game);
    this.addChild(this.poppable);
    this.randomizePoppable();

    this.text = this.game.state.states.play.scoreText;
    this.tween = this.game.state.states.play.textTween;
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

      //this.text.fill = '#3DA045';
      this.text.x = x;
      this.text.y = y;
      this.text.text = '+ ' + this.game.settings.multiplier;
      this.text.alpha = 1;
      this.tween.stop();
      this.tween.pendingDelete = false;
      this.tween.updateTweenData('vStart', {y: y, alpha: 1}).updateTweenData('vEnd', {y: y - 150, alpha: 0});
      this.tween.start();

      this.game.settings.score += this.game.settings.multiplier;
      this.game.settings.multiplier += 1;

      this.game.settings.speed === 0 ? this.game.settings.speed += 1 : this.game.settings.speed += .5;
      if(this.game.settings.speed >= this.game.settings.maxSpeed)
        this.game.settings.speed = this.game.settings.maxSpeed;
    }
    else {
      this.vibrate();
      this.game.settings.multiplier = 1;
      this.game.settings.misses += 1;

      /*
      let powerBar = document.getElementById('power');
      powerBar.style.width = (1 - this.game.settings.misses * .25) * 100 + '%';
      switch(powerBar.style.width) {
      case '50%':
        powerBar.classList.add('medium');
        break;
      case '25%':
        powerBar.classList.add('low');
        break;
      case '0%':
        this.game.setState('over');
        break;
      }
      */

      //this.text.fill = '#D50000';
    }

    //document.getElementById('score').innerHTML = this.game.settings.score;
    //document.getElementById('multiplier').innerHTML = this.game.settings.multiplier;
  }

  reset() {
    this.inputEnabled = true;
    this.frame = 0;
    this.rotation = 0;

    this.poppable.reset();
    this.randomizePoppable();
  }

  vibrate() {
    this.game.camera.shake(.01, 250);
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    if (navigator.vibrate) 
      navigator.vibrate(500);
  }

  resize(w, h) {
    console.log(w, h)
  }
}