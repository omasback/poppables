export default class extends Phaser.Sprite {
  constructor(game, x, y, data) {
    super(game, x, y, 'poppable', 0);

    this.data = data;

    this.game.physics.arcade.enable(this);
    //this.game.physics.arcade.gravity.y = 500;

    this.scalar = this.game.width < this.game.height ? (this.game.width * .20 < 100 ? (this.game.width * .20) / 100 : 1)
                                                    : (this.game.height * .20 < 100 ? (this.game.height * .20) / 100 : 1);
    this.scale.setTo(this.scalar);
    this.anchor.setTo(0.5);
    this.x = this.game.width / 2;
    this.y = this.game.height - this.height / 1.5;

    this.checkWorldBounds = true;

    this.events.onOutOfBounds.add(this.missed, this);

    if(this.game.device.desktop) {
      this.game.input.addMoveCallback(this.movePoppable, this);
    }
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

  movePoppable(pointer) {
    if(!this.active)
      this.x = pointer.x;
  }

  setVelocity() {
    let yDif = this.destination.y - this.y;
    let xDif = this.destination.x - this.x;
    this.dist = Math.sqrt(Math.pow(xDif, 2) + Math.pow(yDif, 2));

    let xVel = 0;
    let yVel = 0;

    if(this.game.device.desktop) {
      switch(true) {
      case yDif > -180:
        yVel = -650;
        this.pIndex = 2;
        break;
      case yDif <= -180 && -300 < yDif:
        yVel = -750;
        this.pIndex = 1;
        break;
      case yDif <= -300:
        yVel = -800;
        this.pIndex = 0;
        break;
      }
      this.shrinkage = .006;
    }
    else {
      switch(true) {
      case yDif > -150:
        yVel = -450;
        this.pIndex = 2;
        break;
      case yDif <= -150 && -220 < yDif:
        yVel = -550;
        this.pIndex = 1;
        break;
      case yDif <= -220:
        yVel = -650;
        this.pIndex = 0;
        break;
      }
      xVel = xDif / 2;
      this.shrinkage = .0045;
    }
    this.body.velocity.setTo(xVel, yVel);

    setTimeout((() => {
      this.parent.setChildIndex(this, this.pIndex * 2 + 1)
    }).bind(this), 1000);
  }

  move(pointer) {
    if(this.active) {
      return;
    }

    this.destination = { x: pointer.x, y: pointer.y };

    this.setActive();
    this.setVelocity();
  }

  missed() {
    this.game.settings.misses--;
    this.reset();
  }

  reset() {
    this.setInactive();
    this.scale.setTo(this.scalar);
    this.x = this.game.width / 2;
    this.y = this.game.height - this.height / 1.5;
    this.parent.setChildIndex(this, this.parent.children.length - 1);
  }

  caughtBy(person) {
    console.log(person)
    this.reset();
  }

  resize() {

  }

  update() {
    if(this.active) {
      this.scale.setTo(this.scale.x - this.shrinkage);
    }

    if(this.scale.x <= 0.005) {
      this.missed();
    }
  }
}