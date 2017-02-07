export default class extends Phaser.State {
  preload() {
 
  }
  create() {
    // this.game.physics.startSystem(Phaser.Physics.ARCADE);
    // this.game.physics.arcade.gravity.y = 200;
    const POPPABLE_FRAME = 4;

    this.input.maxPointers = 1;

    this.world = this.game.add.group();
    this.board = this.game.add.group();
    this.items = this.game.add.group();

    this.column0 = this.game.add.group();
    this.column1 = this.game.add.group();
    this.column2 = this.game.add.group();
    this.column3 = this.game.add.group();
    this.column4 = this.game.add.group();

    this.items.add(this.column0);
    this.items.add(this.column1);
    this.items.add(this.column2);
    this.items.add(this.column3);
    this.items.add(this.column4);

    let idx = {
      'column0': this.column0,
      'column1': this.column1,
      'column2': this.column2,
      'column3': this.column3,
      'column4': this.column4
    }
  
    this.world.inputEnableChildren = true;
    this.board.inputEnableChildren = true;

    let tileSize = this.game.width * .20 < 128 ? this.game.width * .20 : 128;
    let tileScalar = tileSize < 128 ? tileSize / 128 : 1;
    let tileScaledSize = tileSize * tileScalar;
    console.log(tileSize, tileScalar, tileScaledSize)

    let itemSize = this.game.width * .20 < 128 ? this.game.width * .20 : 128;
    let itemScalar = itemSize < 128 && itemSize / 128 < .75 ? itemSize / 128 : .75;
    let itemScaledSize = itemSize * itemScalar;
    console.log(itemSize, itemScalar, itemScaledSize)

    for(let x = 0; x < 5; x++) {
      for(let y = 0; y < 5; y++) {
        let tile = this.game.add.sprite(x * tileScaledSize + (tileScaledSize / 2), y * tileScaledSize + (tileScaledSize / 2), 'tiles', 0, this.board);
        tile.scale.setTo(tileScalar);
        tile.anchor.setTo(0.5);
        tile.input.useHandCursor = true;

        let glow = this.game.add.sprite(0, 0, 'glow', 0);
        glow.anchor.setTo(0.5);
        glow.alpha = 0.5;
        this.game.add.tween(glow).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.Out, true, 0, -1, true);

        let item = this.game.add.sprite(x * tileScaledSize + (tileScaledSize / 2), y * tileScaledSize + (tileScaledSize / 2), 'item', Math.floor(Math.random() * 5), idx['column'+x]);
        item.scale.setTo(itemScalar);
        item.anchor.setTo(0.5);
        item.addChild(glow);

        if(item.frame !== POPPABLE_FRAME) {
          glow.kill();
        }
      }
    }

    this.world.addChild(this.board);
    this.world.addChild(this.items);

    this.world.x = (this.game.width - this.board.width) / 2;
    this.world.y = 50;
    
    let selected = [];

    this.board.onChildInputDown.add((tile) => {
      tile.frame = 1;
      selected.push(tile);
    }, this);

    this.board.onChildInputOver.add((tile) => {
      if(this.input.activePointer.isDown) {
        tile.frame = 1;

        let alreadySelected = selected.filter(t => t.z === tile.z);
        if(alreadySelected.length === 0) {
          selected.push(tile);
        }
        else {
          console.log(tile)
          
        }
      }
    }, this);


    this.input.onUp.add(() => {
      if(!this.input.activePointer.withinGame)
        return;
      
      this.board.forEach((tile) => tile.frame = 0);

      if(selected.length > 1) {
        let match = true; 
        //find items selected
        let selectedItems = selected.map(tile => {
          let tileX = Math.floor(tile.x / 128);
          let tileY = Math.floor(tile.y / 128);
          let index = tileX + tileY * 5;
        
          let item = this.items.getAt(tileX).getAt(tileY);
          item.data.tileX = tileX;
          item.data.tileY = tileY;
          item.data.index2D = index;
          return item;
        });

        //do they match
        for(let i = 1; i < selectedItems.length; i++) {
          if(selectedItems[i-1].frame !== selectedItems[i].frame) {
            match = false;
            break;
          }
        }

        //is it a square?
        if(match && selectedItems.length === POPPABLE_FRAME) {
          console.log('hi')
        }
        else if(match) {
          //TODO - FIX THIS!
          let data = {
            '0': {
              count: 0,
              maxY: 0,
              deadIndices: []
            },
            '1': {
              count: 0,
              maxY: 0,
              deadIndices: []
            },
            '2': {
              count: 0,
              maxY: 0,
              deadIndices: []
            },
            '3': {
              count: 0,
              maxY: 0,
              deadIndices: []
            },
            '4': {
              count: 0,
              maxY: 0,
              deadIndices: []
            },
          }
          // kill off the matched selected items
          selectedItems.map((item, i) => {
            //store data
            let bin = data[item.data.tileX];
            bin.count++;
            bin.deadIndices.push(i);
            if(bin.maxY < item.y) 
              bin.maxY = item.y;
            
            item.frame === POPPABLE_FRAME ? this.game.settings.score += 10 : this.game.settings.score += 5;
       
            item.kill(); 
          });

          for(let i in data) {
            if(data[i].count > 0) {            
              let dCount = 0;
              this.items.getAt(i).forEachDead((item) => {
                item.y = -64 - 128 * dCount;
                item.frame = Math.floor(Math.random() * 5);
                if(item.frame !== POPPABLE_FRAME) {
                  item.children[0].kill();
                }
                else {
                  item.children[0].revive();
                }

                item.revive();
                dCount++;
              });

              this.items.getAt(i).forEachAlive((item) => {
                if(item.y < data[i].maxY) {
                  let currY = item.y;
                  let destY = item.y + (128 * data[i].count);
                  console.log(currY, destY, data[i].count);

                  //TODO - FIX ME
                  this.game.add.tween(item).to({y: item.y + (128 * data[i].count)}, 450, Phaser.Easing.Quintic.In, true, 50);
                }
              });
            }
          }

        }
        else {
          this.game.camera.shake(.01, 250);
        }
        
      }

      selected = [];
    }, this)

  }
  update() {
    // this.game.physics.arcade.collide(this.ground, this.items);
    // this.game.physics.arcade.collide(this.items, this.items)
    this.items.forEach(column => {
      column.sort('y', Phaser.Group.SORT_ASCENDING)
    })
    // this.items.sort('y', Phaser.Group.SORT_ASCENDING);
  }
  render() {
    // this.game.debug.spriteBounds(this.world, 'rgba(0, 0, 0, .5)')
    // this.game.debug.spriteBounds(this.board)
    // this.game.debug.spriteBounds(this.ground);
  }
  resize(w, h) {
    console.log(w, h);
    //128 * 5 == 640
    if(this.game.width < 640|| this.game.height < 640) {
      let scalar = 640 / this.game.width;
      this.board.forEach(tile => {
        tile.scale.setTo(scalar)
      });
      this.items.forEach(col => {
        col.forEach(item => {

        })
      })
    }
    
    this.world.x = (this.game.width - this.board.width) / 2;
    this.world.y = 50;
  }
}