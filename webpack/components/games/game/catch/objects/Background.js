import Cloud from './Cloud'

export default class extends Phaser.Group {

  constructor(game) {
    super(game);

    this.NUM_CLOUDS = 3;
    this.TEXT_WIDTH = this.game.device.desktop ? 260 : 216;
    this.TEXT_STYLE = this.game.device.desktop ? { font: '12pt Montserrat, sans-serif', fill: '#fff'} : { font: '10pt Montserrat, sans-serif', fill: '#fff'};

    this.bg = null;
    this.footer = null;
    this.clouds = [];

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
    this.bg = this.create(0, 0, bmp);
  }

  addClouds() {
    let scalar = this.game.width < this.game.height ? (this.game.width * .20) / 265
                                                    : (this.game.height * .20 < 265 ? (this.game.height * .20) / 265 : 1);

    for(let i = 0; i < this.NUM_CLOUDS; i++) {
      let cloud = new Cloud(this.game, this.game.world.randomX, this.game.rnd.integerInRange(25, 100), scalar, {});
      this.add(cloud);
      this.clouds.push(cloud);
    }
  }

  addText() {
    let text = this.game.add.text(0, 0, 'TAP WHERE YOU WANT TO TOSS', this.TEXT_STYLE)
    this.footer.addChild(text);
    text.x = this.game.width / 2 - text.width / 2;
    text.y = this.footer.height / 2;
  }

  addFooter() {
    let offsetY = this.game.device.mobileSafari && !this.game.device.iPad ? 44 : this.game.device.iPad || !this.game.device.desktop ? 44 : 0;
    let bmp = this.game.add.bitmapData(this.game.width, this.game.height * .1);
    let grd = bmp.context.createRadialGradient(0, 0, 5, 0, 0, 10);
    grd.addColorStop(0, '#FC600D');/*'#ffb300');*/
    grd.addColorStop(1, '#FC600D');
    bmp.context.fillStyle = grd;
    bmp.context.fillRect(0, 0, this.game.width, this.game.height * .1);

    this.footer = this.create(0, this.game.height - this.height * .1 - offsetY, bmp);
    this.addText();
  }

  init() {
    this.addBG();
    this.addClouds();
    this.addFooter();
  }

  update() {
    this.children.map(child => child.update());
  }

  resetFooter() {
    this.removeChildAt(this.children.length - 1);
    this.addFooter();

    this.addText();
  }

  resize() {
    this.bg.width = this.game.width;
    this.bg.height = this.game.height;
    this.resetFooter();
    this.clouds.map(cloud => cloud.resize());
  }
}