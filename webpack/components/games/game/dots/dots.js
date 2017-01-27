// import background from './sprites/dots-tiles.json'
import tiles from './sprites/dotsBG.png'

//console.log(background)

const game = {
  settings: {
    time: 60
  },
  player: {
    score: 0
  },
  sprites: {

  },
  boards: null,
  board: {
    tileY: 5,
    tileX: 5,
    tileW: 100,
    tileH: 100
  },
  boot: {
    preload() {

    },
    create() {
      this.game.renderer.autoResize = true;
      this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;

      this.game.stage.backgroundColor = '#33C1CD';

      this.game.state.start('load');
    }
  },
  load: {
    preload() {
      this.load.tilemap('bg', '/vendor/dots-tiles.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('tiles', tiles);
    },
    create() {
      this.game.state.start('menu');
    }
  },
  menu: {
    preload() {

    },
    create() {
      this.game.state.start('play');
    }
  },
  play: {
    preload() {

    },
    create() {
      //game.boards = this.game.add.group();
      /*
      let marker = this.game.add.graphics();
      marker.lineStyle(2, 0xFFFFFF, 1);
      marker.drawRect(0, 0, game.board.tileW, game.board.tileH);
      */
      this.input.maxPointers = 1;

      let pointer = this.game.input.activePointer;

      game.map = this.game.add.tilemap('bg');
      game.map.addTilesetImage('tiles', 'tiles');
      
      console.log(game.map)

      game.layer = game.map.createLayer('Background');
      //game.layer.fixedToCamera = false;
      //game.layer.position.set((this.game.width - game.layer.layer.widthInPixels) / 2, 55);

      this.input.addMoveCallback((() => {
        if(pointer.isDown) {
          //console.log('moving', this.game.input.activePointer.worldX)
          let x = game.layer.getTileX(this.game.input.activePointer.worldX);
          let y = game.layer.getTileY(this.game.input.activePointer.worldY);
          let tile = game.map.getTile(x, y, game.layer);
          console.log(tile)
          tile.alpha = 1;
          tile.layer.dirty = true;
        }

      }).bind(this))

    },
    update() {

    },
    render() {
      //console.log(game.boards.children)
      /*
      for(let i = 0; i < game.boards.length; i++) {
        this.game.debug.geom(game.boards[i], game.boards[i].hex);
      }
      */
      
    },
    resize(w, h) {
      console.log(w, h)
      let scalar;

      if(w < 600 || h < 600) 
        scalar = .5;
      else if(w >= 600 || h >= 600 && w <= 700 || h <= 700)
        scalar = .75;
      else
        scalar = 1;
        
      game.layer.scale.set(scalar)

      console.log(game.layer)
      game.layer.left = (this.game.width - game.layer.layer.widthInPixels * scalar) / 2
      //game.layer.position.set((this.game.width - game.layer.layer.widthInPixels) / 2, 60);
      //game.layer.layer.widthInPixels = (w)
      //game.layer.layer.heightInPixels = (h)
    }
  },
  won: {
    preload() {

    },
    create() {

    }
  },
  over: {
    preload() {

    },
    create() {

    }
  }
}

export { game as default }