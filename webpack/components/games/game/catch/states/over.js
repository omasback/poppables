export default class extends Phaser.State {
  
  preload() {

  }

  create() {
    //TODO - TWEEN OUT SOUND?
    this.game.sound.mute = true;
  }
}