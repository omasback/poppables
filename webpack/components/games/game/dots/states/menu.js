export default class extends Phaser.State {
  preload() {
   
  }
  
  create() {
    this.game.setState('play');
  }
}