// require('pixi')
// require('phaser')
import api from '../../api'
import particle from './sprites/particle.png'
import spriteBubble from './sprites/bubble-ss.png'
import spritePoppable from './sprites/chip-ss.png'

const game = {
  //TODO- all of these props and funcs are make-shift replacements 
  //for a class constructor and setting specific props for this game
  bubbles: null,
  settings: {
    speed: 0,
    maxSpeed: 5,
    chance: .35,
  },
  player: {
    misses: 0,
    score: 0,
    multiplier: 1,
    power: 100,
  },
  config: {
    defaultW: 320,
    defaultH: 568,
    maxW: 768,
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
        defaultW: 256,
        defaultH: 256,
        maxW: 256,
        maxH: 256,
        width: 0,
        height: 0,
        step: 0,
        scalar: 1,
        perRow: 4,
        perCol: Math.floor((window.innerHeight - 100) / (80)) + 1
      }
    }
  },
  scaleGame(w, h) {
    let configBubble = game.config.sprites.bubble;
    configBubble.step = w * .225;
    configBubble.width = w * .25;
    configBubble.height = configBubble.width;
    configBubble.scalar = configBubble.width < configBubble.maxW ? configBubble.width / configBubble.defaultW : .66;
    configBubble.perCol =  Math.floor(h / (configBubble.step)) + 2;
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
      this.scale.forceOrientation(false, true);
      //this.scale.enterIncorrectOrientation.add();
      //this.scale.leaveIncorrectOrientation.add();

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
      //api.changeGameState(this.game, 'load');
      api.setState('load');
      this.game.state.start('load');
      
    }
  },
  load: {
    preload() {
      //TODO: Asset pipeline -- where will assets be?
      this.load.crossOrigin = 'anon';
      //this.game.load.image('logo', '../img/logo-poppables.png');
      this.load.image('particle', particle);
      this.load.spritesheet('bubble', spriteBubble, 256, 256, 4);
      this.load.spritesheet('poppable', spritePoppable, 256, 256, 3);
    },
    create() {
      api.setState('menu');
      this.game.state.start('menu');
    }
  },
  menu: {
    preload() {
      let width = this.game.width;
      let height = this.game.height;
      game.scaleGame(width, height);      
    },
    create() {
      //getById('play').addEventListener('click', () => getEle('body').classList.add('overflow'));
    },
    update() {

    },
    render() {

    },
    resize(w, h) {
      game.scaleGame(w, h)
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
      if (coin <= game.settings.chance) {
        bubble.children[0].revive();
        bubble.children[0].frame = 0;
      }
      else
        if(bubble.children[0].alive)
          bubble.children[0].kill();
    },
    addPoppable(bubble) {
      let poppable = this.game.make.sprite(0, 0, 'poppable');
      poppable.body = null;
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
      
      bubble.body = null;
      bubble.anchor.setTo(0.5);
      bubble.scale.setTo(bubbleConfig.scalar);
      bubble.input.useHandCursor = true;
      bubble.animations.add('pop');

      this.addPoppable(bubble);

    },
    popPoppable(bubble, cursor) {
      let cursorX = cursor.x;
      let cursorY = cursor.y;
      {cursorX, cursorY}
      
      /*
      this.particles.emitX = cursor.x;
      this.particles.emitY = cursor.y;
      this.particles.makeParticles('particle')
      this.particles.explode(100, 20);
      */

      let poppable = bubble.children[0];

      //bubble.rotation = Math.random() * 360;

      if(bubble.frame === 0)
        bubble.play('pop', 15);
  
      if (poppable.alive && poppable.frame === 0) {
        poppable.play('crunch', 15);

        game.player.score += game.player.multiplier;
        game.player.multiplier += 1;

        game.settings.speed === 0 ? game.settings.speed += 1 : game.settings.speed += .5;
        if(game.settings.speed >= game.settings.maxSpeed)
          game.settings.speed = game.settings.maxSpeed;

        document.getElementById('score').innerHTML = game.player.score;
      }
      else if(!poppable.alive) {
        //reset player things
        game.player.multiplier = 1;
        game.player.misses += 1;

        let powerBar = document.getElementById('power');
        powerBar.style.width = (1 - game.player.misses * .25) * 100 + '%';

        switch(powerBar.style.width) {
        case '50%':
          powerBar.classList.add('medium');
          break;
        case '25%':
          powerBar.classList.add('low');
          break;
        case '0%':
          api.setState('over');
          this.game.state.start('over');
          break;
        }
      }
      //TODO -- make your own observable on game.player and update api.game.player || api.game.settings
      document.getElementById('score').innerHTML = game.player.score;
      document.getElementById('multiplier').innerHTML = game.player.multiplier;

      //this adds 5ms :(
      /*
      api.updateGameSettings('multiplier', game.player.multiplier);
      api.updateGameSettings('score', game.player.score);
      api.updateGameSettings('misses', game.player.misses);
      api.updateGameSettings('speed', game.settings.speed);
      */
      
    },
    spawnBubbleGroup() {
      let group = this.game.add.group();
      group.inputEnableChildren = true;

      for (let x = 0; x < game.config.sprites.bubble.perRow; x++) {
        for (let y = 0; y < game.config.sprites.bubble.perCol; y++) {
          this.addBubble(x, y, group);
        }
      }

      group.onChildInputDown.add(this.popPoppable, this);

      return group;
    },
    moveGroup(i) {
      let group = this.bubbles.children[i];
      
      group.y -= game.settings.speed;

      if (group.y <= -game.config.sprites.bubbles.height)
        this.resetGroup(i);
    },
    resetGroup(i) {
      let group = this.bubbles.children[i];
      let otherGroup = i === 0 ? this.bubbles.children[1] : this.bubbles.children[0];

      group.y = (otherGroup.y + otherGroup.height) - (game.config.sprites.bubble.height / 2);

      group.forEach(((bubble) => {
        bubble.frame = 0;
        bubble.rotation = 0;
        this.randomizePoppable(bubble);
      }).bind(this))

    },
    create() {
      this.game.paused = false;

      let group1 = this.spawnBubbleGroup();
      let group2 = this.spawnBubbleGroup();

      this.bubbles = this.game.add.group();
      this.bubbles.add(group1);
      this.bubbles.add(group2);

      game.config.sprites.bubbles.height = group1.height;

      group2.y += group1.height - (game.config.sprites.bubble.height / 2);

      this.bubbles.x = (this.game.width - this.bubbles.width) / 2; 
      this.bubbles.y = 0;
      
      this.particles = this.game.add.emitter(0, 0, 100);
      this.particles.setXSpeed(-1000, 1000);
      this.particles.setYSpeed(-1000, 1000);
    },
    update() {
      for (let i = 0; i < this.bubbles.children.length; i++) {
        this.moveGroup(i);
      }
    },
    render() {
      // this.game.debug.spriteBounds(game.bubbles, 'rgba(0, 0, 255, .1)')
      // this.game.debug.spriteBounds(this.bubbles.children[0])
      // this.game.debug.spriteBounds(this.bubbles.children[1], 'rgba(255, 0, 0, .4)')
      /*
      this.scale.grid.debug();
      */
    },
    scaleBubbles(group, w) {
      let configBubble = game.config.sprites.bubble;
      configBubble.step = w * .25;
      configBubble.width = w * .20;
      configBubble.scalar = configBubble.width < configBubble.defaultW ? configBubble.width / configBubble.defaultW : 1;
      console.log(configBubble.scalar)
      group.forEach(bubble => {
        bubble.scale.setTo(configBubble.scalar);
      });
    },
    resize(w, h) {
      this.game.renderer.resize(w, h);
      this.bubbles.x = (this.game.width - this.bubbles.width) / 2;
      //scale all bubbles
      for(let i = 0; i < this.bubbles.children.length; i++) {
        let bubbleGrp = this.bubbles.children[i];
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
