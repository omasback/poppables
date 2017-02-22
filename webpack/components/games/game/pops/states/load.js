import particle from '../sprites/particle.png'
import crumb1 from '../sprites/small_crumb_1.png'
import crumb2 from '../sprites/small_crumb_2.png'
import crumb3 from '../sprites/small_crumb_3.png'
import spriteBubble from '../sprites/bubble-ss.png'
import spritePoppable from '../sprites/chip-ss.png'
import explosion from '../sprites/explosion-ss.png'
import bgMusic from '../sounds/pops-bg.wav'
import crunch from '../sounds/crunch.wav'

export default class extends Phaser.State {
  preload() {
    this.load.onFileComplete.add(this.fileComplete, this)
    this.load.crossOrigin = 'anon';

    this.load.audio('background', bgMusic);
    this.load.audio('crunch', crunch);
    this.load.image('particle', particle);
    this.load.image('crumb1', crumb1);
    this.load.image('crumb2', crumb2);
    this.load.image('crumb3', crumb3);
    this.load.spritesheet('bubble', spriteBubble, 256, 256, 4);
    this.load.spritesheet('poppable', spritePoppable, 256, 256, 3);
    this.load.spritesheet('explosion', explosion, 150, 200, 13);

    if(this.game.device.desktop) {
      this.game.settings.maxSpeed = 10;
    }
    else if(this.game.device.iPad){
      this.game.settings.maxSpeed = 10;
    }
    else {
      this.game.settings.maxSpeed = 5;
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