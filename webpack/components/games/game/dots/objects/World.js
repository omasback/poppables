import Tile from './Tile'
import Item from './Item'

export default class extends Phaser.Group {
  constructor(game) {
    super(game);

    this.MIN_ITEMS = 2;
    this.BOARD_SIZE = 5;
    this.POPPABLE_FRAME = 4;

    //TODO - calculate tile and item size here instead of assigning after they're created?
    this.data = {
      tile: {},
      item: {},
    }

    this.selected = [];
    this.words = [];

    this.board = this.game.add.group();
    this.items = this.game.add.group();

    this.soundCrunch = this.game.add.audio('crunch', .5);

    this.scoreText = this.game.add.text(0, 0, '', {font: 'bold 24pt Gotham Rounded SSm B', fill: '#fff'});
    this.scoreText.setShadow(1, 2, 'rgba(0,0,0,0.5)', 3);
    this.textTween = this.game.add.tween(this.scoreText).to({alpha:0}, 750, Phaser.Easing.Linear.None, false, 200);

    let things = ['yum']
    for(let i = 0; i < things.length; i++) {
      let word = this.game.add.sprite(-100, -100, things[i], 0);
      word.scale.setTo(0.45);
      word.anchor.setTo(0.5);
      word.animations.add('animate');
      this.words.push(word);
    }
    
    this.init();

    this.game.input.addMoveCallback(this.load, this);
    this.game.input.onUp.add(this.unload, this)
  }

  init() {
    for(let x = 0; x < this.BOARD_SIZE; x++) {
      let column = this.game.add.group();
      for(let y = 0; y < this.BOARD_SIZE; y++) {
        //TODO - objects should know its own size
        let tile = new Tile(this.game, x, y);
        this.data.tile.size = tile.size;

        let item = new Item(this.game, x * tile.size + (tile.size / 2), y * tile.size + (tile.size / 2));
        this.data.item.size = item.size;

        this.board.add(tile);
        column.add(item);
      }
      this.items.add(column);
    }

    this.add(this.board);
    this.add(this.items);

    this.x = (this.game.width - this.board.width) / 2;
    this.y = (this.game.height - this.board.height) / 2; //50
  }

  reset() {
    this.selected = [];
    this.board.forEach(tile => tile.deselect());
  }

  undoSelection() {
    let lastItem = this.selected[this.selected.length - 1];

    this.board.getAt(lastItem.data.tileY + lastItem.data.tileX * this.BOARD_SIZE).deselect();
    this.selected.pop();
  }

  isAdjacent(item, other) {
    return (Math.abs(other.data.tileX - item.data.tileX) === 1 && Math.abs(other.data.tileY - item.data.tileY) === 0)
          || (Math.abs(other.data.tileX - item.data.tileX) === 0 && Math.abs(other.data.tileY - item.data.tileY) === 1);
  }

  notSelected(item) {
    return this.selected.filter(_item => (item.data.tileX === _item.data.tileX) && (item.data.tileY === _item.data.tileY)).length === 0;
  }

  canAddItem(item) {
    return item.match(this.selected[0]) 
      && this.notSelected(item)
      && this.isAdjacent(item, this.selected[this.selected.length - 1])
  }

  wentBack(_item) {
    let item = this.selected[this.selected.length - 2];
    return _item.data.tileX === item.data.tileX && _item.data.tileY === item.data.tileY
  }

  checkForSquare() {
    let square = false;
    for(let i = 3; i < this.selected.length; i++) {
      let one = this.selected[i - 3];
      let two = this.selected[i - 2];
      let three = this.selected[i - 1];
      let four = this.selected[i];
  
      if((one.data.tileX === two.data.tileX && two.data.tileY === three.data.tileY && three.data.tileX === four.data.tileX && four.data.tileY === one.data.tileY)
      || (one.data.tileY === two.data.tileY && two.data.tileX === three.data.tileX && three.data.tileY === four.data.tileY && four.data.tileX === one.data.tileX)) {
        square = true;
      }
    }

    if(square) {
      for(let x = 0; x < this.items.children.length; x++) {
        for(let y = 0; y < this.items.children[x].children.length; y++) {
          let item = this.items.children[x].children[y];
          if(item.frame === this.selected[0].frame && this.notSelected(item))
            this.selected.push(item);
        }
      }
    }
  }

  load(pointer, x, y) {
    if(!pointer.isDown)
      return;

    let tileX = Math.floor((x - this.x) / this.data.tile.size);
    let tileY = Math.floor((y - this.y) / this.data.tile.size);

    if(tileX < 0 || tileX > 4 || tileY < 0 || tileY > 4)
      return;

    let tile = this.board.getAt(tileY + tileX * this.BOARD_SIZE);
    let item = this.items.getAt(tileX).getAt(tileY);
    item.data = {tileX, tileY};

    if(this.selected.length === 0 || this.canAddItem(item)) {
      tile.select()
      this.selected.push(item);
    }
    else if(this.selected.length > 1 && this.wentBack(item)) {
      this.undoSelection();
    }

    if(this.selected.length >= 4)
      this.checkForSquare();    
  }

  showReward(points, frame) {
    this.scoreText.x = this.selected[this.selected.length - 1].world.x - (this.data.tile.size / 4);
    this.scoreText.y = this.selected[this.selected.length - 1].world.y;
    this.scoreText.text = '+' + points;
    this.scoreText.alpha = 1;

    this.textTween.pendingDelete = false;
    this.textTween.updateTweenData('vStart', {y: this.selected[this.selected.length - 1].world.y, alpha: 1}).updateTweenData('vEnd', {y: this.selected[this.selected.length - 1].world.y - this.data.tile.size, alpha: 0}).start();

    this.game.settings.score += points;

    if(frame === 0) {
      //balloon
    }
    else if(frame === 1) {
      //bubble
    }
    else if(frame === 2) {
      //cloud
    }
    else if(frame === 3) {
      //spinner
    }
    else {
      this.soundCrunch.play();
      let randWord = this.words[Math.floor(Math.random() * this.words.length)];
      randWord.x = this.selected[this.selected.length - 1].world.x;
      randWord.y = this.selected[this.selected.length - 1].world.y;
      randWord.play('animate');
    }
    

  }

  byGreaterY(a, b) {
    return a.y < b.y ? 1 : -1;
  }
  
  byY(a, b) {
    return a.y < b.y ? -1 : 1;
  }

  unload() {
    if(this.selected.length < this.MIN_ITEMS) {
      this.reset();
      return;
    }

    this.showReward(this.selected.reduce((a, b, i) => i === 1 ? a.points + b.points * i : a + b.points * i), this.selected[0].frame);

    this.selected.map(item => {
      item.explode();
    });

    for(let x = 0; x < this.items.children.length; x++) {
      let numDead = this.items.children[x].countDead();
      if(numDead > 0) {
        if(numDead === 1) {
          let firstDead = this.items.children[x].getFirstDead();
          this.items.children[x].forEachAlive(item => {
            if(item.y < firstDead.y) 
              this.game.add.tween(item).to({y: item.y + this.data.tile.size}, 450, Phaser.Easing.Bounce.Out, true, 50);
          });
        }
        else {
          for(let y = 0; y < this.items.children[x].length; y++) {
            let item = this.items.children[x].children[y];
            if(item.alive) {
              let offset = 0;
              for(let i = 0; i < this.selected.length; i++) {
                if(x === this.selected[i].data.tileX && item.y < this.selected[i].y) {
                  offset++;
                }
              }
              this.game.add.tween(item).to({y: item.y + this.data.tile.size * offset}, 450, Phaser.Easing.Bounce.Out, true, 50);
            }
          }
        }
        
        for(let i = 0; i < numDead; i++) {
          let deadItem = this.items.children[x].getFirstDead();
          deadItem.y = -(this.data.tile.size / 2) - this.data.tile.size * i;
          deadItem.rez();
          this.game.add.tween(deadItem).to({y: deadItem.y + this.data.tile.size * numDead}, 450, Phaser.Easing.Bounce.Out, true, 50);
        }
      }
    }
    
    this.reset();
  }

  checkBoard() {
    let swap = true;

    for(let x = 1; x < this.items.children.length; x++) {
      let prevCol = this.items.children[x - 1];
      let currCol = this.items.children[x];
      for(let y = 1; y < currCol.children.length; y++) {
        let topLeft = prevCol.children[y - 1];
        let botLeft = prevCol.children[y];
        let topRight = currCol.children[y - 1];
        let botRight = currCol.children[y];
        if(topLeft.frame === botLeft.frame || topLeft.frame === topRight.frame || botRight.frame === botLeft.frame || botRight.frame === topRight.frame) {
          swap = false;
          break;
        }
      }
    }

    if(swap) {
      //this.game.camera.shake(.05, 500);
      this.items.forEach(col => {
        /*
        let i1 = col.getAt(0);
        let y1 = i1.y;
        let i2 = col.getAt(1);
        let y2 = i2.y;
        let i3 = col.getAt(2);
        let y3 = i3.y;
        let i4 = col.getAt(3);
        let y4 = i4.y;
        let i5 = col.getAt(4);
        let y5 = i5.y;

        this.game.add.tween(i1).to({y : y4}, 300, Phaser.Easing.Quartic.Out, true);
        this.game.add.tween(i2).to({y : y2}, 300, Phaser.Easing.Quartic.Out, true);
        this.game.add.tween(i3).to({y : y5}, 300, Phaser.Easing.Quartic.Out, true);
        this.game.add.tween(i4).to({y : y3}, 300, Phaser.Easing.Quartic.Out, true);
        this.game.add.tween(i5).to({y : y1}, 300, Phaser.Easing.Quartic.Out, true);
        */
        col.forEach(item => item.rez())
      });
    }
  }

  update() {
    this.items.forEach(col => col.sort('y', Phaser.Group.SORT_ASCENDING));
    this.checkBoard();
  }
  
  resize() {
    this.x = (this.game.width - this.board.width) / 2;
    this.y = (this.game.height - this.board.height) / 2; //50

    // this.board.children.map(tile => tile.setSize());
    // this.items.children.map(column => column.children.map(item => item.setSize()));
  }
}