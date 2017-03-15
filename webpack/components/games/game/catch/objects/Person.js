// import Mouth from './Mouth'

export default class extends Phaser.Sprite {
  constructor(game, x, y, key, data) {
    super(game, x, y, key, 0);
    this.data = data;

    game.physics.arcade.enable(this);

    this.setSize();
    this.setPoints();

    this.x = game.world.randomX;
    this.y = this.data.grassPos.y - this.height + 5;

    this.body.immovable = true;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
    this.body.checkCollision.down = false;
    this.body.collideWorldBounds = true;
    this.body.setSize(50, 50, 25, 80);
    this.body.bounce.set(1);
    this.body.velocity.setTo(25 * (this.data.index + 2), 0);

    //this.addChild(new Mouth(game, 0, 0, {}))
  }

  moveComplete() {
    console.log('awerw', arguments)
  }

  setPoints() {
    switch(this.data.index) {
    case 1:
      this.points = 10;
      break;
    case 2:
      this.points = 25;
      break;
    case 3:
      this.points = 50;
      break;
    }
  }

  setSize() {
    let scalar = 1;

    switch(this.data.index) {
    case 3:
      scalar = 0.4;
      break;
    case 2:
      scalar = 0.5;
      break;
    case 1:
      scalar = 0.75;
      break;
    }

    this.scale.setTo(scalar);
  }

  swapDirection() {

  }

  resize() {

  }

  update() {

  }
}