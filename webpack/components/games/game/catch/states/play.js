
export default class extends Phaser.State {
  preload() {
 
  }
  create() {
    //bg
    let myBitmap = this.game.add.bitmapData(this.game.width, this.game.height);
    let grd = myBitmap.context.createLinearGradient(0, 0, 0, this.game.height);
    grd.addColorStop(0, '#2dc4cb');
    grd.addColorStop(0.5, '#33dae3');
    grd.addColorStop(1, '#2dc4cb')
    myBitmap.context.fillStyle=grd;
    myBitmap.context.fillRect(0,0,this.game.width, this.game.height);
    this.game.add.sprite(0, 0, myBitmap);

    this.scale.forceOrientation(false, true);
    this.scale.enterIncorrectOrientation.add(this.incorrectOrientation.bind(this));
    this.scale.leaveIncorrectOrientation.add(this.correctOrientation.bind(this));

    this.game.physics.startSystem(Phaser.Physics.Arcade);

    this.height = this.game.height;
    this.width = this.game.width;

    //clouds
    let cloud1 = this.game.add.sprite(this.world.randomX, 55, 'cloud');
    cloud1.scale.setTo(0.5);
    let cloud2 = this.game.add.sprite(this.world.randomX, 85, 'cloud');
    cloud2.scale.setTo(0.5);
    let cloud3 = this.game.add.sprite(this.world.randomX, 115, 'cloud');
    cloud3.scale.setTo(0.5);
    
    let person3 = this.game.add.sprite(this.world.randomX, this.game.height - 545, 'person3');
    person3.scale.setTo(.33);
    this.game.add.sprite(0, this.game.height - 500, 'grass3');
    
    let person2 = this.game.add.sprite(this.world.randomX, this.game.height - 475, 'person2');
    person2.scale.setTo(.5);
    this.game.add.sprite(0, this.game.height - 400, 'grass2');

    let person1 = this.game.add.sprite(this.world.randomX, this.game.height - 420, 'person1');
    person1.scale.setTo(1);
    this.game.add.sprite(0, this.game.height - 275, 'grass1');
    
    //add physics
    this.game.physics.arcade.enable([person1, person2, person3]);

    person1.body.collideWorldBounds = true;
    person2.body.collideWorldBounds = true;
    person3.body.collideWorldBounds = true;

    person1.body.bounce.set(1);
    person2.body.bounce.set(1);
    person3.body.bounce.set(1);

    person1.body.velocity.setTo(75, 0);
    person2.body.velocity.setTo(125, 0);
    person3.body.velocity.setTo(200, 0);
  }

  update() {
    
  }

  render() {
    // this.game.debug.spriteBounds(this.world, 'rgba(0, 0, 0, .5)')
    // this.game.debug.spriteBounds(this.board)
    // this.game.debug.spriteBounds(this.ground);
  }
  
  resize() {
    this.game.settings.resized = true;
    this.world.resize();
  }

  incorrectOrientation() {
    if(!this.game.device.desktop) {
      // alert('incorrect')

    }
  }

  correctOrientation() {
    if(!this.game.device.desktop) {
      // alert('correct')

    }
  }
}