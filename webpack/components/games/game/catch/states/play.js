
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
    
    this.person3 = this.game.add.sprite(this.world.randomX, this.game.height - 545, 'person3');
    // this.person3.anchor.setTo(0.5);
    this.person3.scale.setTo(.33);
    this.game.add.sprite(0, this.game.height - 500, 'grass3');
    
    this.person2 = this.game.add.sprite(this.world.randomX, this.game.height - 475, 'person2');
    // this.person2.anchor.setTo(0.5);
    this.person2.scale.setTo(.5);
    this.game.add.sprite(0, this.game.height - 400, 'grass2');

    this.person1 = this.game.add.sprite(this.world.randomX, this.game.height - 420, 'person1');
    // this.person1.anchor.setTo(0.5);
    this.person1.scale.setTo(1);
    this.game.add.sprite(0, this.game.height - 275, 'grass1');

    this.poppable = this.game.add.sprite(this.game.width - 150, this.game.height - 100, 'poppable');
    
    //add physics
    this.game.physics.arcade.enable([this.person1, this.person2, this.person3, this.poppable]);

    this.person1.body.collideWorldBounds = true;
    this.person1.body.immovable = true;
    this.person2.body.collideWorldBounds = true;
    this.person3.body.collideWorldBounds = true;

    this.person1.body.bounce.set(1);
    this.person2.body.bounce.set(1);
    this.person3.body.bounce.set(1);

    this.person1.body.setSize(50, 50, 25, 80);
    this.person2.body.setSize(50, 50, 25, 80);
    this.person3.body.setSize(50, 50, 25, 80);

    this.person1.body.velocity.setTo(75, 0);
    this.person2.body.velocity.setTo(100, 0);
    this.person3.body.velocity.setTo(150, 0);

    this.input.onTap.add(this.tap, this);
  }

  tap(pointer) {
    console.log(pointer.x, pointer.y);

    this._dest = {x: pointer.x, y: pointer.y};

    let xv = pointer.x - this.poppable.x;
    let yv = pointer.y - this.poppable.y;

    this.poppable.body.allowGravity = true;
    this.poppable.body.velocity.setTo(xv, yv)
    //this.game.physics.arcade.moveToPointer(this.poppable, 100)

  }

  update() {
    
  }

  render() {
    // this.game.debug.spriteBounds(this.world, 'rgba(0, 0, 0, .5)')
    this.game.debug.body(this.person1);
    this.game.debug.body(this.person2);
    this.game.debug.body(this.person3);
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