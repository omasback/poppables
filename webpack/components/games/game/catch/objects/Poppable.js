export default class extends Phaser.Sprite {
  constructor(game, x, y, data) {
    super(game, x, y, 'poppable', 0);

    this.data = data;

    this.game.physics.arcade.enable(this);

    //scale poppable
    this.scalar = this.game.width < this.game.height ? (this.game.width * .20 < 100 ? (this.game.width * .20) / 100 : 1)
                                                    : (this.game.height * .20 < 100 ? (this.game.height * .20) / 100 : 1);
    this.scale.setTo(this.scalar);
    //set starting position
    this.anchor.setTo(0.5);
    this.x = this.game.width - this.width / 1.5;
    this.y = this.game.height - this.height / 1.5;
    

    //use this.tween to kick off the motion and scaling for fake perspective.
    // this.tween = this.game.add.tween(this);
    // this.tween.onLoop.add(this.tweenUpdate, this);
    // this.tween.onComplete.add(this.tweenComplete, this);
    
  }

  setActive() {
    this.active = true;
    this.body.moves = true;
    this.body.gravity.y = 500;
  }

  setInactive() {
    this.active = false;
    this.body.moves = false;
    this.body.gravity.y = 0;
    this.body.velocity.setTo(0);
  }

  move(pointer) {
    if(this.active) {
      return;
    }

    this.setActive();

    let destination = { x: pointer.x, y: pointer.y };
    let yDiff = pointer.y - this.y;
    let xDiff = pointer.x - this.x;
    let dist = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    let power = 1;

    this.z = 2
    this.renderOrderID = 5;

    this.body.velocity.setTo(0, yDiff * 2)

    console.log(this, yDiff, xDiff, dist);
  }

  reset() {
    this.setInactive();
    this.scale.setTo(this.scalar);
    this.x = this.game.width - this.width / 1.5;
    this.y = this.game.height - this.height / 1.5;
  }

  resize() {
    
  }

  update() {
    if(this.active) {
      this.scale.setTo(this.scale.x - .005);
      if(this.scale.x <= 0) {
        this.active = false;
        this.reset();
      }
    }

  }
}