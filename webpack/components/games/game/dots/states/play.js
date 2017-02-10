import World from '../objects/World'

export default class extends Phaser.State {
  preload() {
 
  }
  create() {
    this.world = new World(this.game);
  }
  update() {
    
  }
  render() {
    // this.game.debug.spriteBounds(this.world, 'rgba(0, 0, 0, .5)')
    // this.game.debug.spriteBounds(this.board)
    // this.game.debug.spriteBounds(this.ground);
  }
  resize() {
    this.world.resize();
  }
}