import particle from '../sprites/particle.png'
import crumb1 from '../sprites/small_crumb_1.png'
import crumb2 from '../sprites/small_crumb_2.png'
import crumb3 from '../sprites/small_crumb_3.png'
import spriteBubble from '../sprites/bubble-ss.png'
import spritePoppable from '../sprites/chip-ss.png'
import explosion from '../sprites/explosion-ss.png'
import bgMusic from '../sounds/bg.mp3'

export default class extends Phaser.State {
  preload() {
    this.load.onFileComplete.add(this.fileComplete, this)
    //TODO: Asset pipeline -- where will assets be?
    this.load.crossOrigin = 'anon';
    //this.game.load.image('logo', '../img/logo-poppables.png');
    this.load.audio('background', bgMusic)
    this.load.image('particle', particle);
    this.load.image('crumb1', crumb1);
    this.load.image('crumb2', crumb2);
    this.load.image('crumb3', crumb3);
    this.load.spritesheet('bubble', spriteBubble, 256, 256, 4);
    this.load.spritesheet('poppable', spritePoppable, 256, 256, 3);
    this.load.spritesheet('explosion', explosion, 150, 200, 13);
  }
  create() {
    setTimeout(window.hideLoader, 1000);
    this.game.setState('menu');
  }
  fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    console.log(progress, cacheKey, success, totalLoaded, totalFiles)
  }
}