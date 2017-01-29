// require('pixi')
// require('phaser')

import spriteBubble from './sprites/bubble.png'
import spritePoppable from './sprites/poppable.png'

const getById = (id) => document.getElementById(id);
//const getByClass = (c) => document.getElementsByClassName(c);
const getEle = (selector) => document.querySelector(selector);
//const getElements = (selector) => document.querySelectorAll(selector);

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
    maxW: 1080,
    maxH: 1920,
    ratio: 0,
    scalar: {
      x: 0,
      y: 0
    },
    sprites: {
      bubbles: {
        width: 0,
        height: 0,
        startPoint: null,
      },
      bubble: {
        defaultW: 300,
        defaultH: 300,
        maxW: 200,
        maxH: 200,
        width: 0,
        height: 0,
        step: 0,
        scalar: 1,
        perRow: 4,
        perCol: Math.floor((window.innerHeight - 100) / (80)) + 1
      }
    }
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

      this.scale.setMinMax(game.config.defaultW, game.config.defaultH, game.config.maxW, game.config.maxH);

      /*
      console.log(this.scale.scaleFactor)
      console.log(this.scale.aspectRatio)
      console.log(this.scale.offset)
      */
      /*
      if(this.game.device.desktop) {

      }
      else {

      }
      */
      //this.game.stage.backgroundColor = '#2EC7CF';
      this.game.state.start('load');
    }
  },
  load: {
    preload() {
      //TODO: Asset pipeline -- where will assets be?
      this.load.crossOrigin = 'anon';
      //this.game.load.image('logo', '../img/logo-poppables.png');

      this.load.spritesheet('bubble', spriteBubble);
      this.load.spritesheet('poppable', spritePoppable)
    },
    create() {
      this.game.state.start('menu');
    }
  },
  menu: {
    preload() {
      let configBubble = game.config.sprites.bubble;
      let width = this.game.width;
      let height = this.game.height;

      configBubble.step = width * .25;
      configBubble.width = width * .20;
      configBubble.height = configBubble.width;
      configBubble.scalar = configBubble.width < configBubble.maxW ? configBubble.width / configBubble.defaultW : .66;
      configBubble.perCol =  Math.floor(height / (configBubble.step)) + 2;
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
      getById('play').addEventListener('click', () => getEle('body').classList.add('overflow'));
      //this.doLogoAnim();
    },
    update() {

    },
    render() {

    },
    resize(w, h) {
      //console.log(w, h)
      let configBubble = game.config.sprites.bubble;

      configBubble.step = w * .25;
      configBubble.width = w * .20;
      configBubble.height = configBubble.width;
      configBubble.scalar = configBubble.width < configBubble.maxW ? configBubble.width / configBubble.defaultW : .66;
      configBubble.perCol =  Math.floor(h / (configBubble.step)) + 2;
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
    randomizePoppable(bubble) {
      let coin = Math.random();
      if (coin <= .25)
        bubble.children[0].revive();
      else
        bubble.children[0].kill();
    },
    addPoppable(bubble) {
      let poppable = this.game.make.sprite(0, 0, 'poppable');
      poppable.anchor.setTo(0.5);
      poppable.animations.add('crunch')
      bubble.addChild(poppable);
      this.randomizePoppable(bubble);
    },
    addBubble(x, y, group) {
      let bubble;
      let bubbleConfig = game.config.sprites.bubble;

      if (x % 2 === 0)
        bubble = this.game.add.sprite(x * bubbleConfig.step + (bubbleConfig.step / 2), y * bubbleConfig.step, 'bubble', 0, group);
      else
        bubble = this.game.add.sprite(x * bubbleConfig.step + (bubbleConfig.step / 2), y * bubbleConfig.step + (bubbleConfig.step / 2), 'bubble', 0, group);

      bubble.anchor.setTo(0.5);
      bubble.scale.setTo(bubbleConfig.scalar);
      bubble.animations.add('pop');

      this.addPoppable(bubble);

    },
    popPoppable(bubble) {
      if (bubble.children[0].alive) {
        //TODO - emit message to ScoreBoard.vue
        game.player.score += game.player.multiplier;
        game.player.multiplier += 1;
        game.settings.speed === 0 ? game.settings.speed += 1 : game.settings.speed += .5;

        if(game.settings.speed >= game.settings.maxSpeed)
          game.settings.speed = game.settings.maxSpeed;

        //play particle
        //bubble.children[0].animations.play('crunch', 30);

        //TODO - move to vue
        getById('score').innerHTML = game.player.score;
        getById('multiplier').innerHTML = game.player.multiplier;
      }
      else {
        //reset player things
        game.player.multiplier = 1;

        //TODO - move to vue
        getById('multiplier').innerHTML = game.player.multiplier;

        let width = parseInt(getComputedStyle(getById('power')).width);

        if(width >= 60) {
          getById('power').classList.add('medium')
        }
        else if(width >= 40) {
          getById('power').classList.add('low');
          getById('power').classList.remove('medium');
        }
        else if(width >= 0) {
          //game over
          console.log('GAME OVER')
          this.game.state.start('over')
        }

        getById('power').style.width = (width - 20)+'px';

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
      group.y -= game.settings.speed;

      if (group.y <= -game.config.sprites.bubbles.height)
        this.resetGroup(i);
    },
    resetGroup(i) {
      let group = game.bubbles.children[i];
      let otherGroup = i === 0 ? game.bubbles.children[1] : game.bubbles.children[0];

      group.y = otherGroup.y + otherGroup.height - (game.config.sprites.bubble.step / 4);

      group.forEach(((bubble) => {
        bubble.revive();
        this.randomizePoppable(bubble);
      }).bind(this))

    },
    create() {
      this.game.paused = false;

      game.bubbles = this.game.add.group();

      let group1 = this.spawnGroup();
      let group2 = this.spawnGroup();
      game.bubbles.add(group1);
      game.bubbles.add(group2);

      game.config.sprites.bubbles.height = group1.height;

      group2.y += group1.height - (game.config.sprites.bubble.step / 4);

      game.bubbles.x = 0;
      game.bubbles.y = 0;
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
    scaleBubbles(group, w, h) {
      console.log(group, w, h);

      let configBubble = game.config.sprites.bubble;
      configBubble.step = w * .25;
      configBubble.width = w * .20;
      configBubble.scalar = configBubble.width < configBubble.defaultW ? configBubble.width / configBubble.defaultW : 1;

      group.forEach(bubble => {
        bubble.scale.setTo(configBubble.scalar);
      });
    },
    resize(w, h) {
      //game.resizeGroup()
      game.bubbles.x = (this.game.width - game.bubbles.width) / 2;

      //scale background

      //scale all bubbles
      for(let i = 0; i < game.bubbles.children.length; i++) {
        let bubbleGrp = game.bubbles.children[i];
        this.scaleBubbles(bubbleGrp, w, h);
      }
    }
  },
  won: {
    create() {

    },
    update() {

    },
    render() {

    }
  },
  over: {
    create() {

    },
    update() {

    },
    render() {

    }
  }
}

export { game as default}
