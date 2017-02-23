export default class extends Phaser.Sprite {
  constructor(game, x, y, key, data) {
    super(game, x, y, key, 0);
    this.data = data;

    game.physics.arcade.enable(this);
    
    this.anchor.setTo(0, 1);

    this.setSize();
    
    let yPos = game.height;

    if(this.data.index === 3) {
      yPos = game.height - game.height / 1.9;
    }
    else if (this.data.index === 2) {
      yPos = game.height - game.height / 3;
    }
    else {
      yPos = game.height - game.height / 6;
    }

    this.x = game.world.randomX;
    this.y = yPos;

    this.body.collideWorldBounds = true;
    this.body.setSize(50, 50, 25, 80);
    this.body.bounce.set(1);
    this.body.velocity.setTo(25 * (this.data.index + 2), 0)

  }

  setSize() {
    let scalar = 1;

    switch(this.data.index) {
      case 3:
        scalar = 0.33;
      break;
      case 2:
        scalar = 0.5;
      break;
      case 1:
        scalar = 0.75;
      break;
      default:
      break;
    }

    this.scale.setTo(scalar);
  }
  
  swapDirection() {
    //take current x velocity and negate it
  }

  resize() {

  }

  update() {

  }
}