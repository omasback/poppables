export default class extends Phaser.State {

  preload() {

  }

  create() {
    this.bg = this.game.add.audio('background', .1);
    this.bg.loop = true;

    this.game.sound.setDecodedCallback([ this.bg ], () => {
      this.bg.play();
    }, this);
  }

  playMusic() {
    this.bg.play()
  }
}