const getById = (id) => document.getElementById(id);
const getByClass = (c) => document.getElementsByClassName(c);
const getEle = (selector) => document.querySelector(selector);
const getElements = (selector) => document.querySelectorAll(selector);

const game = {
  bubbles: null,
  settings: {
    speed: 0,
    chance: .25
  },
  player: {
    score: 0,
    multiplier: 1,
    power: 100,
  },
  config: {

  },
  boot: {
    preload() {
      //Any big asset -- load here first
    },
    create() {
      this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
      this.game.stage.backgroundColor = "#6FE7ED";
      this.game.state.start("load");
      console.log(this.scale, this.scale.aspectRatio, this.scale.currentScaleMode)
      console.log(this.scale.grid)
    }
  },
  load: {
    preload() {
      //TODO: Asset pipeline -- where will assets be?
      this.game.load.image('logo', '../img/logo-poppables.png');
      this.game.load.image('bubble', '../img/bubble.png');
      this.game.load.spritesheet('poppable', '../img/poppables.png')
    },
    create() {
      this.game.state.start("menu");
    }
  },
  menu: {
    preload() {

    },
    doLogoAnim() {
      let sprites = this.game.add.group();
      for (let i = 0; i < 40; i++) {
        let logo = this.game.add.sprite(0, 0, 'logo', 0, sprites);
        this.game.physics.arcade.enable(logo);

        logo.scale.setTo(0.5 / window.devicePixelRatio, 0.5 / window.devicePixelRatio);
        logo.anchor.setTo(0.5);
        logo.x = Math.random() * this.game.height;
        logo.y = 50;

        logo.body.velocity.x = Math.random() * 200 - 100;
        logo.body.velocity.y = 50 + Math.random() * 200;
      }
    },
    create() {
      //emit a vue state change to handle this DOM change.
      getById('game').classList.add('blurred');
      getById('play').addEventListener('click', function (e) {
        getEle('.game-gui').classList.add('close');
        getEle('body').classList.add('overflow')
        getById('game').classList.remove('blurred');
      }.bind(this));
      
      this.doLogoAnim();
    },
    update() {

    },
    render() {

    },
    resize(width, height) {
      console.log(width, height)
    }
  },
  pause: {
    preload() {

    },
    create() {
      this.game.paused = true;
    },
    update() {

    }
  },
  play: {
    // TODO: This better
    setConfig() {
      let config = {};
      switch (true) {
        case 570 > this.game.width:
          config = {
            size: 'small',
            bubble: {
              size: 300,
              scaledSize: 300 * .3,
              scale: { //300 * .3 = 100
                x: 0.33,
                y: 0.33
              },
              perRow: Math.floor((window.innerWidth - 40) / (300 * .33)),
              perCol: Math.floor((window.innerHeight - 100) / (300 * .33)) + 1 //100 for header
            }
          }
          break;
        case 1040 > this.game.width:
          config = {
            size: 'medium',
            bubble: {
              size: 300,
              scaledSize: 300 * .5,
              scale: { //300 * .5 = 150
                x: 0.5,
                y: 0.5
              },
              perRow: Math.floor((window.innerWidth - 40) / (300 * .5)),
              perCol: Math.ceil((window.innerHeight - 100) / (300 * .5)) + 1//100 for header
            }
          }
          break;
        default:
          config = {
            size: 'large',
            bubble: {
              size: 300,
              scaledSize: 300 * .75,
              scale: { //300 * .75 = 225
                x: 0.75,
                y: 0.75
              },
              perRow: Math.floor((window.innerWidth - 40) / (300 * .75)), //40 for padding
              perCol: Math.ceil((window.innerHeight - 100) / (300 * .75)) + 1 //100 for header
            }
          }
          break;
      }
      return config;
    },
    addPoppable(bubble) {
      //does it already have a child?
      // console.log(bubble)
      if(bubble.children.length > 0)
        bubble.children[0].kill(); 
      //is it lucky?
      if (Math.random() <= .25) {
        if(bubble.children.length > 0) {
          bubble.children[0].revive();
        }
        else {
          let poppable = this.game.make.sprite(bubble.width / 2, bubble.height / 2, 'poppable');
          bubble.addChild(poppable);
        } 
        
      }
    },
    addBubble(x, y, group) {
      let bubble;
      if (x % 2 == 0)
        bubble = this.game.add.sprite(x * game.config.bubble.scaledSize, y * game.config.bubble.scaledSize, 'bubble', 0, group);
      else
        bubble = this.game.add.sprite(x * game.config.bubble.scaledSize, y * game.config.bubble.scaledSize + (game.config.bubble.scaledSize / 2), 'bubble', 0, group);
      

      bubble.scale.setTo(game.config.bubble.scale.x, game.config.bubble.scale.y);

      this.addPoppable(bubble);
    },
    popPoppable(poppable, pointer) {
      if (poppable.children.length >= 1) {
        //TODO - emit message to ScoreBoard.vue 
        game.player.score += game.player.multiplier;
        game.player.multiplier += 1;
        game.settings.speed == 0 ? game.settings.speed += 1 : game.settings.speed += .5;
        //TODO - move to vue
        getById("score").innerHTML = game.player.score;
        getById("multiplier").innerHTML = game.player.multiplier;
      }
      else {
        //reset player things
        game.player.multiplier = 1;

        //TODO - move to vue
        getById("multiplier").innerHTML = game.player.multiplier;
      }

      poppable.kill();
    },
    spawnGroup() {
      let group = this.game.add.group();
      group.inputEnableChildren = true;

      for (let x = 0; x < game.config.bubble.perRow; x++) {
        for (let y = 0; y < game.config.bubble.perCol; y++) {
          this.addBubble(x, y, group);        
        }
      }

      group.onChildInputDown.add(this.popPoppable, this);

      return group;
    },
    moveGroup(i) {
      let group = game.bubbles.children[i];
      group.y -= game.settings.speed;

      console.log(group.y)
      if (group.y <= -this.game.height) //- group.height)
        this.resetGroup(i);
    },
    resetGroup(i) {
      // console.log(i)
      let group = game.bubbles.children[i];
      let otherGroup = i == 0 ? game.bubbles.children[1] : game.bubbles.children[0];

      group.y = otherGroup.height// - (game.config.bubble.scaledSize / 2);

      group.forEach(function(bubble) {
        bubble.revive();
        //this.addPoppable(bubble);
      }.bind(this))
    },
    create() {
      this.game.paused = false;

      game.config = this.setConfig(); // this can be done in another state.

      game.bubbles = this.game.add.group();
      //need two groups for infinite scroll
      let group1 = this.spawnGroup();
      let group2 = this.spawnGroup();
      game.bubbles.add(group1);
      game.bubbles.add(group2);
      group2.y += group2.height - (game.config.bubble.scaledSize / 2);
      
      game.bubbles.x = (this.game.width - game.config.bubble.perRow * (game.config.bubble.size * game.config.bubble.scale.x)) / 2;
      game.bubbles.y = 0; //this.game.height;

      /*
      setInterval(() => {
        game.speed += .1;
      }, 1000);
      */
    },
    update() {
      for (let i = 0; i < game.bubbles.children.length; i++) {
        this.moveGroup(i);
      }
    },
    render() {

    }
  },
  won: {
    create() {

    },
    update() {

    },
    render() {

    }
  }
}

export { game as default}