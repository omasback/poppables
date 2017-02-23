import Cloud from './Cloud'

export default class extends Phaser.Group {

  constructor(game) {
    super(game);

    this.NUM_CLOUDS = 3;

    this.init();
  }

  addGradient() {
    let bmp = this.game.add.bitmapData(this.game.width, this.game.height);
    let grd = bmp.context.createLinearGradient(0, 0, 0, this.game.height);
    grd.addColorStop(0, '#2dc4cb');
    grd.addColorStop(0.5, '#33dae3');
    grd.addColorStop(1, '#229846')
    bmp.context.fillStyle = grd;
    bmp.context.fillRect(0, 0, this.game.width, this.game.height);
    this.create(0, 0, bmp);
  }

  addClouds() {
    //265x125 = clouds dimension
    let scalar = this.game.width < this.game.height ? (this.game.width * .20) / 265 
                                                    : (this.game.height * .20 < 265 ? (this.game.height * .20) / 265 : 1);

    for(let i = 0; i < this.NUM_CLOUDS; i++) {
      this.add(new Cloud(this.game, this.game.world.randomX, this.game.rnd.integerInRange(25, 100), scalar, {}));
    }
  }

  init() {
    this.addGradient();
    this.addClouds();
  }

  update() {
    for(let i = 0; i < this.children.length; i++) {
      this.children[i].update();
    }
  }

  resize() {
    
  }
}