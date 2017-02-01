export default class extends Phaser.Game {
  constructor(width, height, container, config) {
    super(width, height, Phaser.AUTO, container, { preload() {}, create() {}, update() {}, render() {} }, true);

    this.config = config || {
      defaultW: 320,
      defaultH: 568,
      maxW: 768,
      maxH: 1024,
    }

    this.boot = {
      preload() {
        this.game.renderer.autoResize = true;
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setMinMax(game.config.defaultW, game.config.defaultH, game.config.maxW, game.config.maxH);
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