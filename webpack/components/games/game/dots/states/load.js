// import circles from '../sprites/circles-ss.png'
import tiles from '../sprites/tiles.png'
import items from '../sprites/item-ss.png'
import glow from '../sprites/glow.png'
import particle from '../sprites/particle.png'
import yum from '../sprites/words/yum-ss.png'
import airy from '../sprites/words/airy-ss.png'
import yay from '../sprites/words/yay-ss.png'
import pop from '../sprites/words/pop-ss.png'
import light from '../sprites/words/light-ss.png'
import bgMusic from '../sounds/bg.wav'
import crunch from '../sounds/crunch.wav'

export default class extends Phaser.State {
  preload() {
    this.load.onFileComplete.add(this.fileComplete, this)
    this.load.crossOrigin = 'anon';

    this.load.audio('background', bgMusic);
    this.load.audio('crunch', crunch);
    this.load.image('particle', particle);
    this.load.spritesheet('tiles', tiles, 128, 128, 2);
    this.load.spritesheet('item', items, 128, 128, 5);
    this.load.spritesheet('glow', glow, 128, 128, 1);

    this.load.spritesheet('yum', yum, 256, 256, 120);
    this.load.spritesheet('airy', airy, 256, 256, 120);
    this.load.spritesheet('yay', yay, 256, 256, 120);
    this.load.spritesheet('pop', pop, 256, 256, 120);
    this.load.spritesheet('light', light, 256, 256, 120);

    console.log(this.game.device)
    if(this.game.device.desktop) {
      //
    }
    else if(this.game.device.iPad){
      //
    }
    else {
      //
    }
  }
  create() {
    setTimeout(window.hideLoader, 1000);
    
    this.bg = this.game.add.audio('background', .1);
    this.bg.loop = true;
    this.game.sound.setDecodedCallback([ this.bg ], () => {
      this.bg.play();
    }, this);

    this.game.setState('menu');
  }
  fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    console.log(progress, cacheKey, success, totalLoaded, totalFiles)
  }
}