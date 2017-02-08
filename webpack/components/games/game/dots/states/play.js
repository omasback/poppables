export default class extends Phaser.State {
  preload() {
 
  }
  create() {
    const POPPABLE_FRAME = 4;
    const GAME_OFFSET_Y = 70;
    const BOARD_LENGTH = 5;

    this.input.maxPointers = 1;

    this.world = this.game.add.group();
    this.board = this.game.add.group();
    this.items = this.game.add.group();

    let fontStyle = {
      font: 'bold 24pt Gotham Rounded SSm B',
      fill: '#fff'
    }
    this.scoreText = this.game.add.text(0, 0, '', fontStyle);
    this.scoreText.z = 9000;
    this.scoreText.setShadow(1, 2, 'rgba(0,0,0,0.5)', 3);
    this.textTween = this.game.add.tween(this.scoreText).to({alpha:0}, 750, Phaser.Easing.Linear.None, false, 200);

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
      '0': this.column0,
      '1': this.column1,
      '2': this.column2,
      '3': this.column3,
      '4': this.column4
    }
  
    this.world.inputEnableChildren = true;
    this.board.inputEnableChildren = true;

    let tileSize = 128;
    let _tileSize = this.game.width * .20 < tileSize ? this.game.width * .20 : tileSize;
    let tileScalar = _tileSize < tileSize ? _tileSize / tileSize : 1;
    let tileScaledSize = tileSize * tileScalar;
    console.log(tileSize, _tileSize, tileScalar, tileScaledSize)

    let itemSize = 146;
    let _itemSize = this.game.width * .20 < itemSize ? this.game.width * .20 : itemSize;
    let itemScalar = _itemSize / itemSize < .75 ? _itemSize / itemSize : .75;
    let itemScaledSize = itemSize * itemScalar;
    console.log(itemSize, _itemSize, itemScalar, itemScaledSize)

    for(let x = 0; x < BOARD_LENGTH; x++) {
      for(let y = 0; y < BOARD_LENGTH; y++) {
        let tile = this.game.add.sprite(x * tileScaledSize + (tileScaledSize / 2), y * tileScaledSize + (tileScaledSize / 2), 'tiles', 0, this.board);
        tile.scale.setTo(tileScalar);
        tile.anchor.setTo(0.5);
        tile.input.useHandCursor = true;

        let glow = this.game.add.sprite(0, 0, 'glow', 0);
        glow.anchor.setTo(0.5);
        glow.alpha = 0.60;
        this.game.add.tween(glow).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.Out, true, 0, -1, true);

        let item = this.game.add.sprite(x * tileScaledSize + (tileScaledSize / 2), y * tileScaledSize + (tileScaledSize / 2), 'item', Math.floor(Math.random() * 5), idx[x]);
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
    this.world.y = GAME_OFFSET_Y;
    
    let selected = [];

    this.game.input.addMoveCallback((pointer, x, y) => {
      //grab first icon type|frame
      if(pointer.isDown) {
        let tileX = Math.floor(x / tileScaledSize);
        let tileY = Math.floor((y - GAME_OFFSET_Y) / tileScaledSize);
  
        if(tileX >= 0 && tileX <= 4 && tileY >= 0 && tileY <= 4) {
          let tileIndex = tileY + tileX * BOARD_LENGTH;
          let itemIndex = tileX + tileY * BOARD_LENGTH; 
          let item = this.items.getAt(tileX).getAt(tileY); // this.items.getAt(itemIndex); 
          let tile = this.board.getAt(tileIndex); //this.board.getAt(tileY).getAt(tileX);

          item.data = {
            tileX,
            tileY,
            itemIndex
          }

          if(selected.length === 0) {
            selected.push(item);
            tile.frame = 1;
          }
          else if(selected.filter(_item => item.data.tileX === _item.data.tileX && item.data.tileY === _item.data.tileY).length === 0 
                  && selected[0].frame === item.frame
                  && (Math.abs(selected[selected.length - 1].data.tileX - item.data.tileX) === 1 && Math.abs(selected[selected.length - 1].data.tileY - item.data.tileY) === 0
                  || Math.abs(selected[selected.length - 1].data.tileX - item.data.tileX) === 0 && Math.abs(selected[selected.length - 1].data.tileY - item.data.tileY) === 1)) {
            
            selected.push(item);
            tile.frame = 1;
          }

        }
      }
    });

    this.input.onUp.add(pointer => {
      if(selected.length <= 1) {
        this.board.forEach((tile) => tile.frame = 0);
        selected = [];
        return;
      }
      //TODO -- Make makeshift manager into real manager
      let data = {
        '0': {
          indices: []
        },
        '1': {
          indices: []
        },
        '2': {
          indices: []
        },
        '3': {
          indices: []
        },
        '4': {
          indices: []
        },
      }

      let pointsMade = 0;
      selected.map((item) => {
        data[item.data.tileX].indices.push(item.z);
        pointsMade += item.frame === POPPABLE_FRAME ? 10 : 5;
        item.kill(); 
      });

      this.textTween.stop();
      this.scoreText.x = pointer.x - 30;
      this.scoreText.y = pointer.y;
      this.scoreText.text = '+' + pointsMade;
      this.scoreText.alpha = 1;
      this.textTween.pendingDelete = false;
      this.textTween.updateTweenData('vStart', {y: pointer.y, alpha: 1}).updateTweenData('vEnd', {y: pointer.y - 50, alpha: 0}).start();
      this.game.settings.score += pointsMade;
      console.log(data)

      for(let col in data) {
        let columnData = data[col];
        let deadItems = columnData.indices.sort();
        let islandItems = [];
        for(let i = 1; i < deadItems.length; i++) {
          if(deadItems[i] - deadItems[i - 1] !== 1)
            islandItems.push(deadItems[i] - 1);
        }

        if(deadItems.length > 0) {
          deadItems.map((index, i) => {
            let item = this.items.getAt(col).getFirstDead();
            item.zombie = true;
            item.y = -(tileScaledSize / 2) - tileScaledSize * i;
            item.frame = Math.floor(Math.random() * 5);
            item.frame !== POPPABLE_FRAME ? item.children[0].kill() : item.children[0].revive();
            item.revive();
          });

          let itemColumn = this.items.getAt(col);
          for(let i = 0; i < islandItems.length; i++) {
            let item = itemColumn.getAt(islandItems[i]);
            this.game.add.tween(item).to({y: item.y + tileScaledSize}, 450, Phaser.Easing.Quintic.In, true, 50);
          }
          for(let i = 0; i < itemColumn.children.length; i++) {
            if(itemColumn.children[i].z < deadItems[0]) {
              let item = itemColumn.children[i];
              this.game.add.tween(item).to({y: item.y + tileScaledSize * deadItems.length}, 450, Phaser.Easing.Quintic.In, true, 50);
            }
          }
          for(let i = 0; i < deadItems.length; i++) {
            let item = itemColumn.getAt(deadItems[i]);
            this.game.add.tween(item).to({y: item.y + (tileScaledSize * deadItems.length)}, 450, Phaser.Easing.Quintic.In, true, 50);
          }
        }
        
        /*
        column.indices.map((index, i) => {
          // let item = this.items.getAt(col)
          let itemAbove = this.items.getAt(col).getAt(index - column.indices.length );
          this.game.add.tween(itemAbove).to({y: itemAbove.y + tileScaledSize}, 450, Phaser.Easing.Quintic.In, true, 50)
        });
        */
      }

      //console.log(item.z, data[i].indices)
      /*
      if(item.y < data[i].maxY) {
        let currY = item.y;
        let destY = item.y + (tileScaledSize * data[i].count);
        console.log(currY, destY, data[i].count);

        //TODO - FIX ME
        this.game.add.tween(item).to({y: item.y + (tileScaledSize * data[i].count)}, 450, Phaser.Easing.Quintic.In, true, 50);
      }
      */
    
      this.board.forEach((tile) => tile.frame = 0);
      selected = [];
    })

    /*
    this.board.onChildInputDown.add((tile) => {
      tile.frame = 1;

      let alreadySelected = selected.filter(t => t.z === tile.z);
      if(alreadySelected.length === 0) {
        selected.push(tile);
      }
      else {
        //console.log(tile)
      }
      // console.log(selected)
    }, this);

    this.board.onChildInputOver.add((tile) => {
      if(this.input.activePointer.isDown) {
        tile.frame = 1;

        let alreadySelected = selected.filter(t => t.z === tile.z);
        if(alreadySelected.length === 0) {
          selected.push(tile);
        }
        else {
          // console.log(tile)
        }
      }
    }, this);
    */
    /*
    this.input.onUp.add(() => {
      //if(!this.input.activePointer.withinGame)
      //  return;

      this.board.forEach((tile) => tile.frame = 0);

      if(selected.length > 1) {
        let match = true; 
        //find items selected
        let selectedItems = selected.map(tile => {
          let tileX = Math.floor(tile.x / tileScaledSize);
          let tileY = Math.floor(tile.y / tileScaledSize);
          let index = tileX + tileY * 5;
        
          let item = this.items.getAt(index); //this.items.getAt(tileX).getAt(tileY);
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

        if(match) {
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
                //reset dead item
                item.y = -(tileScaledSize / 2) - tileScaledSize * dCount;
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
                  let destY = item.y + (tileScaledSize * data[i].count);
                  console.log(currY, destY, data[i].count);

                  //TODO - FIX ME
                  this.game.add.tween(item).to({y: item.y + (tileScaledSize * data[i].count)}, 450, Phaser.Easing.Quintic.In, true, 50);
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
    */

  }
  update() {
    // this.game.physics.arcade.collide(this.ground, this.items);
    // this.game.physics.arcade.collide(this.items, this.items)
    
    this.items.forEach(column => {
      column.sort('y', Phaser.Group.SORT_ASCENDING)
    });
    //this.items.sort('y', Phaser.Group.SORT_ASCENDING);
  }
  render() {
    // this.game.debug.spriteBounds(this.world, 'rgba(0, 0, 0, .5)')
    // this.game.debug.spriteBounds(this.board)
    // this.game.debug.spriteBounds(this.ground);
  }
  resize(w, h) {
    console.log(w, h);

    if(this.game.width < 640|| this.game.height < 640) {
      let _tileSize = this.game.width * .20;
      let scalar = _tileSize / 128;
      this.board.forEach(tile => {
        tile.scale.setTo(scalar);
        //move up and left

      });
    }
    
    this.world.x = (this.game.width - this.board.width) / 2;
    this.world.y = 70;
  }
}