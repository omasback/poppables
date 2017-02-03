// import background from './sprites/dots-tiles.json'
//import api from '../../api'
import tiles from './sprites/tiles.png'
import circles from './sprites/circles-ss.png'

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

      this.game.canvas.style.cursor = 'pointer';

      this.game.stage.backgroundColor = '#33C1CD';

      // api.setState('load');
      this.game.state.start('load');
    }
  },
  load: {
    preload() {
      this.load.crossOrigin = 'anon';
      this.load.tilemap('bg', '/vendor/dots-tiles.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.spritesheet('tiles', tiles, 128, 128, 2);
      this.load.spritesheet('circle', circles, 128, 128, 9)
    },
    create() {
      // api.setState('menu');
      this.game.state.start('menu');
    }
  },
  menu: {
    preload() {

    },
    create() {
      // api.setState('play');
      this.game.state.start('play');
    }
  },
  play: {
    moveToTile(sprite, x, y) {
      let tween = this.game.add.tween(sprite).to({y: 128 * y + 64}, 500, Phaser.Easing.Bounce.Out, true);
    },
    preload() {

    },
    create() {
      //game.boards = this.game.add.group();
      /*
      let marker = this.game.add.graphics();
      marker.lineStyle(2, 0xFFFFFF, 1);
      marker.drawRect(0, 0, game.board.tileW, game.board.tileH);
      */
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 100;
      
      this.input.maxPointers = 1;

      this.world = this.game.add.group();
      this.board = this.game.add.group();
      this.items = this.game.add.group();

      this.world.inputEnableChildren = true;
      this.board.inputEnableChildren = true;
      //this.items.inputEnableChildren = true;

      for(let y = 0; y < 5; y++) {
        for(let x = 0; x < 5; x++) {
          let tile = this.game.add.sprite(x * 128 + 64, y * 128 + 64, 'tiles', 0, this.board);
          tile.anchor.setTo(0.5);
          tile.input.useHandCursor = true;

          let circle = this.game.add.sprite(x * 128 + 64, y * 128 + 64, 'circle', Math.floor(Math.random() * 9), this.items);
          circle.anchor.setTo(0.5);
          this.game.physics.arcade.enable(circle);
          if(y === 4) {
            circle.body.immovable = true;
            circle.body.moves = false;
          }
          
        }
      }
      
      let selected = [];

      this.board.onChildInputDown.add((tile) => {
        tile.frame = 1;
        selected.push(tile);
      }, this);

      this.board.onChildInputOver.add((tile) => {
        if(this.input.activePointer.isDown) {
          tile.frame = 1;
          let present = selected.filter((t) => t.z === tile.z);
         
          if(present.length === 0)
            selected.push(tile);         
        }
      }, this);

      this.input.onUp.add(() => {
        if(!this.input.activePointer.withinGame)
          return;
        
        this.board.forEach((tile) => tile.frame = 0);

        if(selected.length > 1) {
          let flag = true;
          selected.map((tile, i) => {
            let tileX = Math.floor(tile.x / 128);
            let tileY = Math.floor(tile.y / 128);
            let index = tileX + tileY * 5;
            let item = this.items.getAt(index);
            console.log(item)
            if(i <= selected.length - 2) {
              // if(tile.children[0].frame !== selected[i+1].children[0].frame)
                // flag = false;
            }
          });

          if(flag) {
            selected.map((tile) => {
              
            });
          }
        }

        selected = [];
      }, this)

      this.world.addChild(this.board);
      this.world.addChild(this.items);

      this.world.x = (this.game.width - this.board.width) / 2;
      this.world.y = 50;

      /*
      game.map = this.game.add.tilemap('bg');
      game.map.addTilesetImage('tiles', 'tiles');
      
      game.layer = game.map.createLayer('Background');
      //game.layer.alpha = .5;
      //game.layer.fixedToCamera = false;
      //game.layer.position.set((this.game.width - game.layer.layer.widthInPixels) / 2, 55);

      console.log(game.map)

      this.input.addMoveCallback((() => {
        if(pointer.isDown) {
          //console.log('moving', this.game.input.activePointer.worldX)
          let x = game.layer.getTileX(this.game.input.activePointer.worldX);
          let y = game.layer.getTileY(this.game.input.activePointer.worldY);
          let tile = game.map.getTile(x, y, game.layer);
          console.log(tile)
          console.log(x, y)
          game.map.swap(1, 2, x, y, 128, 128, 'Background')
          tile.alpha = 1;
          tile.layer.dirty = true;
        }

      }).bind(this));

      this.input.onUp.add((pointer) => {
        if(!pointer.withinGame)
          return;
        
        game.map.swap(2, 1);
      }, this);
      */
    },
    update() {
      this.game.physics.arcade.collide(this.items, this.items)
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
      console.log(w, h);
      this.game.renderer.resize(w, h)
      this.world.x = (this.game.width - this.board.width) / 2;

      /*
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
      */
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