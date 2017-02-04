import circles from '../sprites/circles-ss.png'
import tiles from '../sprites/tiles.png'

export default class extends Phaser.State {
  preload() {
    this.load.onFileComplete.add(this.fileComplete, this)
    //TODO: Asset pipeline -- where will assets be?
    this.load.crossOrigin = 'anon';
    // this.game.load.image('logo', '../img/logo-poppables.png');
    // this.load.image('particle', particle);
    // this.load.image('crumb1', crumb1);
    // this.load.image('crumb2', crumb2);
    // this.load.image('crumb3', crumb3);
    this.load.spritesheet('tiles', tiles, 128, 128, 2);
    this.load.spritesheet('circle', circles, 128, 128, 9);
  }
  create() {
    this.game.setState('menu');
  }
  fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    console.log(progress, cacheKey, success, totalLoaded, totalFiles)
  }
}