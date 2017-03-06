import person1 from '../sprites/person-1.png'
import person2 from '../sprites/person-2.png'
import person3 from '../sprites/person-3.png'

import grass1 from '../sprites/grass-front.png'
import grass2 from '../sprites/grass-mid.png'
import grass3 from '../sprites/grass-back.png'

import cloud from '../sprites/cloud.png'
import poppable from '../sprites/poppable.png'

export default class extends Phaser.State {
  preload() {
    this.load.onFileComplete.add(this.fileComplete, this)
    this.load.crossOrigin = 'anon';

    // this.load.audio('background', bgMusic);
    // this.load.audio('crunch', crunch);

    this.load.spritesheet('cloud', cloud, 256, 125, 1);
    this.load.spritesheet('poppable', poppable, 100, 100, 1);

    this.load.spritesheet('person1', person1, 100, 175, 2);
    this.load.spritesheet('person2', person2, 100, 175, 2);
    this.load.spritesheet('person3', person3, 100, 175, 2);

    this.load.spritesheet('grass1', grass1, 768, 150, 1);
    this.load.spritesheet('grass2', grass2, 768, 150, 1);
    this.load.spritesheet('grass3', grass3, 768, 150, 1);

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
    
    //this.bg = this.game.add.audio('background', .1);
    //this.bg.loop = true;
    //this.game.sound.setDecodedCallback([ this.bg ], () => {
      //this.bg.play();
    //}, this);

    this.game.setState('menu');
  }
  fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    console.log(progress, cacheKey, success, totalLoaded, totalFiles)
  }
}