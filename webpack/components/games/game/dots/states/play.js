import World from '../objects/World'

export default class extends Phaser.State {
  preload() {
 
  }
  create() {
    this.bg = this.game.add.audio('background', .1);
    this.bg.loop = true;
    this.game.sound.setDecodedCallback([ this.bg ], () => {
      this.bg.play();
    }, this);

    this.scale.forceOrientation(false, true);
    this.scale.enterIncorrectOrientation.add(this.incorrectOrientation);
    this.scale.leaveIncorrectOrientation.add(this.correctOrientation);

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
    this.game.settings.resized = true;
    this.world.resize();
  }

  incorrectOrientation() {
    if(!this.game.device.desktop) {
      alert('incorrect')

    }
  }

  correctOrientation() {
    if(!this.game.device.desktop) {
      alert('correct')

    }
  }
}