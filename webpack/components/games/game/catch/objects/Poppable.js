export default class extends Phaser.Sprite {
  constructor(game, x, y, data) {
    super(game, x, y, 'poppable', 0);

    this.data = data;
    this.game.physics.arcade.enable(this);
    //this.game.physics.arcade.gravity.y = 500;

    let offsetY = this.game.device.mobileSafari && !this.game.device.iPad ? 44 : this.game.device.iPad ? 42 : 0;
    this.scalar = this.game.width < this.game.height ? (this.game.width * .20 < 100 ? (this.game.width * .20) / 100 : 1)
                                                     : (this.game.height * .20 < 100 ? (this.game.height * .20) / 100 : 1);
    this.scale.setTo(this.scalar);
    this.anchor.setTo(0.5);
    this.x = this.game.width / 2;
    this.y = this.game.height - this.height / 1.5 - offsetY;
    this.startingPos = {x : this.x, y : this.y};

    this.checkWorldBounds = true;

    this.crunchSound = this.game.state.states.play.crunchSound;

    this.events.onOutOfBounds.add(this.missed, this);

    if(this.game.device.desktop) {
      this.game.input.addMoveCallback(this.movePoppable, this);
    }
  }

  setActive() {
    this.active = true;
    this.body.moves = true;
    this.body.gravity.y = 600;
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

    let xVel = this.game.device.desktop ? 0 : xDif / 1.5;
    let yVel = 0;

    switch(this.destination.key) {
    case 'grass1':
    case 'grass2':
      this.pIndex = 2;
      if(this.game.device.desktop || this.game.device.iPad) {
        yVel = -650;
        this.shrinkage = .0075;
      }
      else {
        yVel = -this.game.height - (this.game.height * .025);
        this.shrinkage = .0065;
      }
      break;
    case 'grass3':
      this.pIndex = 1;
      if(this.game.device.desktop || this.game.device.iPad) {
        yVel = -750;
        this.shrinkage = .0075;
      }
      else {
        yVel = -this.game.height - (this.game.height * .05);
        this.shrinkage = .007;
      }
      break;
    case 'bg':
      this.pIndex = 0;
      if(this.game.device.desktop || this.game.device.iPad) {
        yVel = -800;
        this.shrinkage = .008;
      }
      else {
        yVel = -this.game.height - (this.game.height * .15)
        this.shrinkage = .00685;
      }
      break;
    }

    this.body.velocity.setTo(xVel, yVel);
  }

  throw(pointer) {
    if(this.active) {
      return;
    }

    let key = pointer.interactiveCandidates.length > 0 ? pointer.interactiveCandidates[0].sprite.key : 'bg'
    this.destination = { x: pointer.x, y: pointer.y, key};

    this.setActive();
    this.setVelocity();
  }

  missed() {
    this.text = this.parent.scoreText;
    this.tween = this.parent.textTween;
    this.text.alpha = 1;
    this.text.fill = '#ed1846';
    this.text.text = 'Oops!'

    this.text.x = this.game.width / 2 - this.text.width / 2;
    this.text.y = this.game.height - this.text.height;

    this.tween.stop();
    this.tween.pendingDelete = false;
    this.tween.updateTweenData('vStart', {y: this.text.y, alpha: 1}).updateTweenData('vEnd', {y: this.text.y - 150, alpha: 0});
    this.tween.start();

    // this.game.settings.misses--;

    this.reset();
  }

  reset() {
    this.setInactive();
    this.scale.setTo(this.scalar);
    this.x = this.startingPos.x
    this.y = this.startingPos.y
    this.parent.setChildIndex(this, this.parent.children.length - 1);
    this.game.settings.misses--;
  }

  caughtBy(person) {
    this.text = this.parent.scoreText;
    this.tween = this.parent.textTween;
    this.text.alpha = 1;
    this.text.fill = '#fff';
    this.text.text = '+ ' + person.points;
    this.text.x = person.x;
    this.text.y = person.y;
    this.tween.stop();
    this.tween.pendingDelete = false;
    this.tween.updateTweenData('vStart', {y: person.y, alpha: 1}).updateTweenData('vEnd', {y: person.y - 150, alpha: 0});
    this.tween.start();

    this.crunchSound.play();

    this.game.settings.score += person.points;
    this.reset();
  }

  resize() {
    this.scalar = this.game.width < this.game.height ? (this.game.width * .20 < 100 ? (this.game.width * .20) / 100 : 1)
                                                     : (this.game.height * .20 < 100 ? (this.game.height * .20) / 100 : 1);
    this.scale.setTo(this.scalar);

    let offsetY = this.game.device.mobileSafari ? 44 : 0;
    this.x = this.game.width / 2;
    this.y = this.game.height - this.height / 1.5 - offsetY;
    this.startingPos = {x : this.x, y : this.y};
  }

  update() {
    if(this.active) {
      this.scale.setTo(this.scale.x - this.shrinkage); /* (this.shrinkage - this.shrinkage / 2)); */
      if(this.deltaY > 0) {
        this.parent.setChildIndex(this, this.pIndex * 2 + 1)
        // this.scale.setTo(this.scale.x - this.shrinkage);
      }
    }

    if(this.scale.x <= 0.005 ) {
      this.missed();
    }
  }
}