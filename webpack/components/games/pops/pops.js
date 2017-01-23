const getById = (id) => document.getElementById(id);
const getByClass = (c) => document.getElementsByClassName(c);
const getEle = (selector) => document.querySelector(selector);
const getElements = (selector) => document.querySelectorAll(selector);

const game = {
  bubbles: null,
  settings: {
    speed: 0,
    maxSpeed: 5,
    chance: .25
  },
  player: {
    score: 0,
    multiplier: 1,
    power: 100,
  },
  config: {
    defaultW: 320,
    defaultH: 568,
    maxW: 1920,
    maxH: 1080,
    ratio: 0,
    scalar: {
      x: 0,
      y: 0
    },
    sprites: {
      bubbles: {
        width: 0,
        height: 0
      },
      bubble: {
        defaultW: 300,
        defaultH: 300,
        size: {
          x: 80,
          y: 80
        },
        scale: {
          x: .25,
          y: .25
        },
        perRow: 4,
        perCol: Math.floor((window.innerHeight - 100) / (80)) + 1
      }
    },

    
  },
  boot: {
    preload() {
      //Any big asset -- load here first
    },
    create() {
      this.game.renderer.autoResize = true;
      this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;

      //this.scale.setMinMax(game.config.defaultW, game.config.defaultH, game.config.maxW, game.config.maxH)
      


      /*
      console.log(this.scale.scaleFactor)
      console.log(this.scale.aspectRatio)
      console.log(this.scale.offset)
      */
      //alert("desktop: " + this.game.device.desktop)
      if(this.game.device.desktop) {

      }
      else {
        
      }


      //this.game.stage.backgroundColor = "#2EC7CF";
      this.game.state.start("load");
    }
  },
  load: {
    preload() {
      //TODO: Asset pipeline -- where will assets be?
      this.game.load.image('logo', '../img/logo-poppables.png');

      this.game.load.spritesheet('bubble', '../img/bubble.png');
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
      
      //this.doLogoAnim();
    },
    update() {

    },
    render() {

    },
    resize(w, h) {

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
      return {
        bubble: {
          size: 75,
          scaledSize: 75,
          scale: {
            x: .25,
            y: .25
          },
          perRow: 4,
          perCol: Math.floor((window.innerHeight - 100) / (75)) + 1
        }
      }

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
      if(bubble.children.length > 0)
        bubble.children[0].kill(); 
      //is it lucky?
      if (Math.random() <= .25) {
        if(bubble.children.length > 0) {
          bubble.children[0].revive();
        }
        else {
          //console.log(bubble.width, bubble.height)
          let poppable = this.game.make.sprite(bubble.width, bubble.height , 'poppable');
          bubble.addChild(poppable);
          //poppable.x += bubble.width;
          //poppable.y += bubble.height;
        } 
        
      }
    },
    addBubble(x, y, group) {
      let bubble;

      if (x % 2 == 0)
        bubble = this.game.add.sprite(x * 80, y * 80, 'bubble', 0, group);
      else
        bubble = this.game.add.sprite(x * 80, y * 80 + (32.5), 'bubble', 0, group);

      bubble.animations.add('pop');

      bubble.scale.setTo(game.config.sprites.bubble.scale.x, game.config.sprites.bubble.scale.y);
      
      this.addPoppable(bubble);
    },
    popPoppable(bubble, pointer) {
      if (bubble.children.length >= 1) {
        //TODO - emit message to ScoreBoard.vue 
        game.player.score += game.player.multiplier;
        game.player.multiplier += 1;
        game.settings.speed == 0 ? game.settings.speed += 1 : game.settings.speed += .5;

        if(game.settings.speed >= game.settings.maxSpeed)
          game.settings.speed = game.settings.maxSpeed;

        bubble.children[0].animations.play('crunch', 30)

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
      
      //bubble.play('pop', 30, false, true);
      bubble.kill();
    },
    spawnGroup() {
      let group = this.game.add.group();
      group.inputEnableChildren = true;
      //group.enableBody = true;

      for (let x = 0; x < game.config.sprites.bubble.perRow; x++) {
        for (let y = 0; y < game.config.sprites.bubble.perCol; y++) {
          this.addBubble(x, y, group);        
        }
      }

      group.onChildInputDown.add(this.popPoppable, this);

      return group;
    },
    moveGroup(i) {
      let group = game.bubbles.children[i];
      group.y -= 2 // game.settings.speed;

      //console.log(group.y)

      if (group.y <= -game.config.sprites.bubbles.height) //this.game.height) //- group.height)
        this.resetGroup(i);
    },
    resetGroup(i) {
      let group = game.bubbles.children[i];
      let otherGroup = i == 0 ? game.bubbles.children[1] : game.bubbles.children[0];
     
      //console.log(otherGroup.height)
      //TODO- Image sizes
      group.y = otherGroup.y + otherGroup.height - 30; // - (game.config.bubble.scaledSize / 2);
      
      group.forEach(function(bubble) {
        bubble.revive();
      }.bind(this))
      
    },
    create() {
      //console.log(this.scale.grid.width, this.scale.grid.height, this.scale.grid)

      this.game.paused = false;
      
      //TODO - FIx this
      //game.config = this.setConfig(); // this can be done in another state.

      game.bubbles = this.game.add.group();
      //need two groups for infinite scroll
      let group1 = this.spawnGroup();
      let group2 = this.spawnGroup();
      game.bubbles.add(group1);
      game.bubbles.add(group2);

      game.config.sprites.bubbles.height = group1.height;

      //console.log(group1.height, group2.height)

      group2.y += group1.height - 30; //- (game.config.bubble.scaledSize / 2);
      
      game.bubbles.x = (this.game.width - game.bubbles.width) / 2; //(this.game.width - game.config.bubble.perRow * (game.config.bubble.size * game.config.bubble.scale.x)) / 2;
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
      // this.game.debug.spriteBounds(game.bubbles, 'rgba(0, 0, 255, .1)');
      
      // this.game.debug.spriteBounds(game.bubbles.children[0])
      // this.game.debug.spriteBounds(game.bubbles.children[1], 'rgba(255, 0, 0, .4)')
      /*
      this.scale.grid.debug();
      */
    },
    resize(w, h) {
      //game.resizeGroup()
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