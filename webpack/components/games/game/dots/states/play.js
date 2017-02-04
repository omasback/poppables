export default class extends Phaser.State {
  preload() {
 
  }
  create() {
    this.game.setState('menu');
  }
  update() {

  }
  render() {

  }
  resize(w, h) {
    console.log(w, h);
  }
}