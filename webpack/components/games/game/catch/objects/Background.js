import Cloud from './Cloud'

export default class extends Phaser.Group {

  constructor(game) {
    super(game);

    this.NUM_CLOUDS = 3;

    this.init();
  }

  addBG() {
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

  addFooter() {
    let offsetY = this.game.device.mobileSafari ? 44 : 0;
    let bmp = this.game.add.bitmapData(this.game.width, this.game.height * .1);
    let grd = bmp.context.createRadialGradient(0, 0, 5, 0, 0, 10);
    grd.addColorStop(0, '#ffb300');
    grd.addColorStop(1, '#FC600D');
    bmp.context.fillStyle = grd;
    bmp.context.fillRect(0, 0, this.game.width, this.game.height * .1);
    let footer = this.create(0, this.height - this.height * .1 - offsetY, bmp);

    let fontStyle = {
      font: 'bold 12pt Montserrat',
      fill: '#fff'
    }
    let text = this.game.add.text(0, 0, 'TAP WHERE YOU WANT TO TOSS', fontStyle);
    footer.addChild(text);
    text.x = this.width / 2 - text.width / 2;
    text.y = footer.height / 2;
    text.z = 9000;
    // text.setShadow(1, 2, 'rgba(0,0,0,0.5)', 3);
  }

  init() {
    this.addBG();
    this.addClouds();
    this.addFooter();
  }

  update() {
    for(let i = 0; i < this.children.length; i++) {
      this.children[i].update();
    }
  }

  resize() {

  }
}