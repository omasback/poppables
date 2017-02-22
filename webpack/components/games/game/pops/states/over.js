export default class extends Phaser.State {
  
  preload() {

  }

  create() {
    console.log(this.game)
    this.game.canvas.hidden = true;
    this.game.sound.mute = true;
    this.scale.enterIncorrectOrientation.removeAll()
    this.scale.leaveIncorrectOrientation.removeAll();
  }

  resize(w, h) {
    this.game.resize(w, h);
  }
}