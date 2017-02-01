export default class extends Phaser.Game {
  constructor(width, height, container, config) {
    super(width, height, Phaser.AUTO, container, { preload() {}, create() {}, update() {}, render() {} }, true);

    this.defaultConfig = {
      defaultW: 320,
      defaultH: 568,
      maxW: 768,
      maxH: 1024,
      
    }
    this.config = config || this.defaultConfig;

    this.boot = {
      preload() {
        this.game.renderer.autoResize = true;
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setMinMax(this.config.defaultW, this.config.defaultH, this.config.maxW, this.config.maxH);
        this.scale.forceOrientation(false, true);
      },
      create() {

      }
    }
    this.load = {
      preload() {

      },
      create() {
        
      }
    }
    this.menu = {
      preload() {

      },
      create() {
        
      }
    }
    this.play = {
      preload() {

      },
      create() {
        
      },
      update() {

      },
      render() {
        
      }
    }
    this.over = {
      preload() {

      },
      create() {
        
      }
    }
  }
}