import World from '../objects/World'

export default class extends Phaser.State {
  preload() {
 
  }

  create() {
    this.scale.forceOrientation(false, true);
    this.scale.enterIncorrectOrientation.add(this.incorrectOrientation.bind(this));
    this.scale.leaveIncorrectOrientation.add(this.correctOrientation.bind(this));

    this.initialW = this.game.width;
    this.initialH = this.game.height;

    this.world = new World(this.game);
  }

  update() {
    
  }

  render() {

  }

  resize() {
    this.world.resize();
  }

  incorrectOrientation() {
    if(!this.game.device.desktop) {
      this.game.settings.state = 'incorrect';
    }
  }

  correctOrientation() {
    if(!this.game.device.desktop) {
      this.game.settings.state = 'correct';
    }
  }
}