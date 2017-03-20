import Background from '../objects/Background'
import World from '../objects/World'

export default class extends Phaser.State {
  preload() {

  }
  create() {
    this.game.physics.startSystem(Phaser.Physics.Arcade);
    this.game.physics.arcade.sortDirection = Phaser.Physics.Arcade.BOTTOM_TOP;

    this.scale.forceOrientation(false, true);
    this.scale.enterIncorrectOrientation.add(this.incorrectOrientation.bind(this));
    this.scale.leaveIncorrectOrientation.add(this.correctOrientation.bind(this));

    this.crunchSound = this.game.add.audio('crunch');

    this.bg = new Background(this.game);
    this.world = new World(this.game);
  }

  update() {

  }

  render() {
    this.world.render();
  }

  resize() {
    // this.game.settings.resized = true;
    this.bg.resize();
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