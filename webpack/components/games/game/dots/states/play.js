export default class extends Phaser.State {
  preload() {
 
  }
  create() {
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

        let items = selected.map(tile => {
          let tileX = Math.floor(tile.x / 128);
          let tileY = Math.floor(tile.y / 128);
          let index = tileX + tileY * 5;
          return this.items.getAt(index);
        });

        items.reduce((acc, next) => {
          console.log(acc, next)
        });

        if(flag) {
          console.log('TIS TRUE -- IT IS A MATCH')
        }
        
      }

      selected = [];
    }, this)

    this.world.addChild(this.board);
    this.world.addChild(this.items);

    this.world.x = (this.game.width - this.board.width) / 2;
    this.world.y = 50;
  }
  update() {
    this.game.physics.arcade.collide(this.items, this.items)
  }
  render() {

  }
  resize(w, h) {
    console.log(w, h);
    this.world.x = (this.game.width - this.board.width) / 2;
  }
}