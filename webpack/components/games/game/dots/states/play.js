export default class extends Phaser.State {
  preload() {
 
  }
  create() {
    // this.game.physics.startSystem(Phaser.Physics.ARCADE);
    // this.game.physics.arcade.gravity.y = 200;
    
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
    //this.items.inputEnableChildren = true;

    //this.world.body.immovable = true;

    for(let x = 0; x < 5; x++) {
      for(let y = 0; y < 5; y++) {
        let tile = this.game.add.sprite(x * 128 + 64, y * 128 + 64, 'tiles', 0, this.board);
        tile.anchor.setTo(0.5);
        tile.input.useHandCursor = true;

        let circle = this.game.add.sprite(x * 128 + 64, y * 128 + 64, 'circle', Math.floor(Math.random() * 9), idx['column'+x]);
        circle.anchor.setTo(0.5);
        // this.game.physics.arcade.enable(circle);
        
        // if(y === 4) {
        //   circle.body.immovable = true;
        //   circle.body.moves = false;
        // }
        
      }
    }

    this.world.addChild(this.board);
    this.world.addChild(this.items);

    this.world.x = (this.game.width - this.board.width) / 2;
    this.world.y = 50;
    // console.log(this.game)
    // this.ground = this.game.add.sprite(0, this.board.y);
    // this.game.physics.arcade.enable(this.ground);
    // this.ground.body.immovable = true;
    // this.ground.body.moves = false;
    // this.ground.alignTo(this.game.world, Phaser.BOTTOM_LEFT)
    // this.ground.scale.setTo(200, 1);
    // console.log(this.world, this.board, this.ground)
    //this.ground.allowGravity = false;
    
    let selected = [];

    this.board.onChildInputDown.add((tile) => {
      tile.frame = 1;
      selected.push(tile);
    }, this);

    this.board.onChildInputOver.add((tile) => {
      if(this.input.activePointer.isDown) {
        tile.frame = 1;

        let alreadySelected = selected.filter(t => t.z === tile.z);
        if(alreadySelected.length === 0)
          selected.push(tile);         
      }
    }, this);


    this.input.onUp.add(() => {
      if(!this.input.activePointer.withinGame)
        return;
      //reset board 
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

        //do they match && are they a square bonus?
        for(let i = 1; i < selectedItems.length; i++) {
          if(selectedItems[i-1].frame !== selectedItems[i].frame) {
            match = false;
            break;
          }
        }
        // let a = items.reduce((acc, next) => acc.frame + next.frame) / items[0].frame;

        if(match) {
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

            //kill
            item.kill(); 
          });

          for(let i in data) {
            if(data[i].count > 0) {            
              let dCount = 0;
              this.items.getAt(i).forEachDead((item) => {
                //console.log('Dead: ', item);
                item.y = -64 - 128 * dCount;
                item.frame = Math.floor(Math.random() * 5);
                item.revive();
                dCount++;
              });

              this.items.getAt(i).forEachAlive((item) => {
                //console.log('Alive: ', item)
                if(item.y < data[i].maxY) {
                  //let column = this.items.getAt(i);
                  console.log(item.y, item.y + ((128 + 64) * data[i].count))
                  this.game.add.tween(item).to({y: item.y + (128 * data[i].count)}, 500).start();
                }
                console.log(data[i].maxY)
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
    if(this.game.width > this.board.width) {
      //resize board & sprites.

    }
    this.world.x = (this.game.width - this.board.width) / 2;
  }
}