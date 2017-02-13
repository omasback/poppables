export default class extends Phaser.State {
  
  preload() {

  }

  create() {
    this.game.sound.mute = true;
  }

  resize(w, h) {
    this.game.resize(w, h);
  }
}