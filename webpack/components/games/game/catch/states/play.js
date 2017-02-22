import Background from '../objects/Background'
import World from '../objects/World'

export default class extends Phaser.State {
  preload() {
 
  }
  create() {
    this.game.physics.startSystem(Phaser.Physics.Arcade);

    this.scale.forceOrientation(false, true);
    this.scale.enterIncorrectOrientation.add(this.incorrectOrientation.bind(this));
    this.scale.leaveIncorrectOrientation.add(this.correctOrientation.bind(this));

    this.bg = new Background(this.game);
    this.world = new World(this.game);

    //clouds
    // let cloud1 = this.game.add.sprite(this.world.randomX, 55, 'cloud');
    // cloud1.scale.setTo(0.5);
    // let cloud2 = this.game.add.sprite(this.world.randomX, 85, 'cloud');
    // cloud2.scale.setTo(0.5);
    // let cloud3 = this.game.add.sprite(this.world.randomX, 115, 'cloud');
    // cloud3.scale.setTo(0.5);
    
    // this.person3 = this.game.add.sprite(this.world.randomX, this.game.height - 545, 'person3');
    // // this.person3.anchor.setTo(0.5);
    // this.person3.scale.setTo(.33);
    // let grass3 = this.game.add.sprite(0, this.game.height - 500, 'grass3');
    
    // this.person2 = this.game.add.sprite(this.world.randomX, this.game.height - 475, 'person2');
    // // this.person2.anchor.setTo(0.5);
    // this.person2.scale.setTo(.5);
    // let grass2 = this.game.add.sprite(0, this.game.height - 400, 'grass2');

    // this.person1 = this.game.add.sprite(this.world.randomX, this.game.height - 420, 'person1');
    // // this.person1.anchor.setTo(0.5);
    // this.person1.scale.setTo(1);
    // let grass1 = this.game.add.sprite(0, this.game.height - 275, 'grass1');

    // if(this.game.width <= 768) {
    //   let scalar = this.game.width / 768;
    //   grass3.scale.setTo(scalar);
    //   grass2.scale.setTo(scalar);
    //   grass1.scale.setTo(scalar);
    // }
    // else if(this.game.height <= 768) {
    //   let scalar = this.game.height / 200;
    // }

    // this.poppable = this.game.add.sprite(this.game.width - 150, this.game.height - 100, 'poppable');
    // this.poppable.anchor.setTo(0.5);

    // this.scaleTween = this.game.add.tween(this.poppable.scale).to({x: 0.5, y: 0.5}, 250);
    // this.firstTween = this.game.add.tween(this.poppable.position).to({x: this.game.width })
    
    // //add physics
    // this.game.physics.arcade.enable([this.person1, this.person2, this.person3, this.poppable]);

    // this.person1.body.collideWorldBounds = true;
    // this.person1.body.immovable = true;
    // this.person2.body.collideWorldBounds = true;
    // this.person3.body.collideWorldBounds = true;

    // this.person1.body.bounce.set(1);
    // this.person2.body.bounce.set(1);
    // this.person3.body.bounce.set(1);

    // this.person1.body.setSize(50, 50, 25, 80);
    // this.person2.body.setSize(50, 50, 25, 80);
    // this.person3.body.setSize(50, 50, 25, 80);

    // this.person1.body.velocity.setTo(75, 0);
    // this.person2.body.velocity.setTo(100, 0);
    // this.person3.body.velocity.setTo(125, 0);

    this.input.onTap.add(this.tap, this);
  }

  tap(pointer) {
  //   console.log(pointer.x, pointer.y);

  //   this._dest = {x: pointer.x, y: pointer.y};

  // let xv = pointer.x - this.poppable.x;
  // let yv = pointer.y - this.poppable.y;

  //   //this.poppable.body.allowGravity = true;
  //   //this.poppable.body.velocity.setTo(xv, yv);
  //   this.scaleTween.start();
  //   //this.game.physics.arcade.moveToPointer(this.poppable, 100)

  }

  update() {
    
  }

  render() {
    // this.game.debug.body(this.person1);
    // this.game.debug.body(this.person2);
    // this.game.debug.body(this.person3);
  }

  resize() {
    this.game.settings.resized = true;
    this.world.resize();
  }

  incorrectOrientation() {
    if(!this.game.device.desktop) {
      // alert('incorrect')
      this.game.setState('pause');
    }
  }

  correctOrientation() {
    if(!this.game.device.desktop) {
      // alert('correct')
      this.game.resume();
    }
  }
}