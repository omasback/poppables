import Tile from './Tile'
import Item from './Item'

export default class extends Phaser.Group {
  constructor(game) {
    super(game);

    this.MIN_ITEMS = 2;
    this.BOARD_SIZE = 5;
    this.POPPABLE_FRAME = 4;
    this.OFFSET_Y = 75;

    //TODO - calculate tile and item size here instead of assigning after they're created?
    this.data = {
      tile: {},
      item: {},
    }

    this.selected = [];
    this.words = [];

    this.board = this.game.add.group();
    this.items = this.game.add.group();

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
        let tile = new Tile(this.game, x, y);
        let item = new Item(this.game, x * tile.size + (tile.size / 2), y * tile.size + (tile.size / 2));
        
        this.data.tile.size = tile.size;
        this.data.item.size = item.size;

        this.board.add(tile);
        column.add(item);
      }
      this.items.add(column);
    }

    this.add(this.board);
    this.add(this.items);

    this.x = (this.game.width - this.board.width) / 2;
    this.y = this.OFFSET_Y; // (this.game.height - this.board.height) / 2;
  }

  reset() {
    this.selected = [];
    this.board.forEach(tile => tile.deselect());
  }

  checkBoard() {

  }

  checkItem() {

  }

  isAdjacent(item, other) {
    return (Math.abs(other.data.tileX - item.data.tileX) === 1 && Math.abs(other.data.tileY - item.data.tileY) === 0)
          || (Math.abs(other.data.tileX - item.data.tileX) === 0 && Math.abs(other.data.tileY - item.data.tileY) === 1);
  }

  notSelected(item) {
    return this.selected.filter(_item => item.data.tileX === _item.data.tileX && item.data.tileY === _item.data.tileY).length === 0;
  }

  canAddItem(item) {
    return item.match(this.selected[0]) 
      && this.notSelected(item)
      && this.isAdjacent(item, this.selected[this.selected.length - 1])
  }

  load(pointer, x, y) {
    if(!pointer.isDown)
      return;

    let tileX = Math.floor((x - this.x) / this.data.tile.size);
    let tileY = Math.floor((y - this.y) / this.data.tile.size);
    if(tileX >= 0 && tileX <= 4 && tileY >= 0 && tileY <= 4) {
      let tile = this.board.getAt(tileY + tileX * this.BOARD_SIZE);

      // let itemIndex = tileX + tileY * this.BOARD_SIZE;
      let item = this.items.getAt(tileX).getAt(tileY);
      item.data = {tileX, tileY};

      if(this.selected.length === 0) {
        tile.frame = 1;
        this.selected.push(item);
      }
      else if(this.canAddItem(item)) {
        tile.frame = 1;
        this.selected.push(item) 
      }

      if(this.selected.length >= 4) {
        for(let i = 1; i < this.selected.length; i++) {
          // let prev = this.selected[i - 1];
          // let curr = this.selected[i];
        }
      }
      
    }
  }

  showReward(points, frame) {
    this.scoreText.x = this.selected[this.selected.length - 1].world.x - (this.data.tile.size / 4);
    this.scoreText.y = this.selected[this.selected.length - 1].world.y;
    this.scoreText.text = '+' + points;
    this.scoreText.alpha = 1;

    this.textTween.pendingDelete = false;
    this.textTween.updateTweenData('vStart', {y: this.selected[this.selected.length - 1].world.y, alpha: 1}).updateTweenData('vEnd', {y: this.selected[this.selected.length - 1].world.y - this.data.tile.size, alpha: 0}).start();

    this.game.settings.score += points;

    if(frame === this.POPPABLE_FRAME) {
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
              //find out how many dead items there are below me
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
    this.checkBoard();
  }

  update() {
    this.items.forEach(col => col.sort('y', Phaser.Group.SORT_ASCENDING));
  }
  
  resize() {
    this.x = (this.game.width - this.board.width) / 2;
    this.y = this.OFFSET_Y; // (this.game.height - this.board.height) / 2;
  }
}