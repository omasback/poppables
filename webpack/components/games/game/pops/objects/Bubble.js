import Poppable from './Poppable'

export default class extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'bubble', 0);

    this.anchor.setTo(0.5);
    this.animations.add('pop');

    this.poppable = new Poppable(game);
    this.addChild(this.poppable);
  }

  randomizePoppable() {
    let coin = Math.random();
    if(coin <= this.game.settings.chance) {
      //TODO- add this to a poppable reset or revive?
      this.children[0].revive();
      this.children[0].frame = 0;
    }
    else
      if(this.children[0].alive)
        this.children[0].kill();
  }

  pop() {
    this.inputEnabled = false;
    if(this.frame === 0)
      this.play('pop', 15);

    this.poppable.crunch();
  }

  reset() {
    this.inputEnabled = true;
    this.frame = 0;

  }

  vibrate() {
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    if (navigator.vibrate) 
      navigator.vibrate(500);
  }
}