export default {
  //STATES ENUM of base
  STATES: {
    BOOT: 'boot',
    LOAD: 'load',
    MENU: 'menu',
    PLAY: 'play',
    PAUSE: 'pause',
    OVER: 'over'
  },
  state: '',
  game: {
    settings: {
      //fill this with anything vue can listen/react to
      score: 0,
      speed: 0,
      misses: 0,
      chance: .35,
      multiplier: 1,
      maxSpeed: 5,
      time: 60
    }
  },

  //if you prefer functions to touch properties :)
  setState(val) {
    let flag = false;
    for(let state in this.STATES) {
      if(state === val)
        flag = true;
    }
    if(!flag)
      this.addState(val);
    
    this.state = val;
  },
  getState() {
    return this.state;
  },
  addState(state) {
    if(typeof state !== 'string')
      return;
    let ls = state.toLowerCase();
    let us = state.toUpperCase();
    this.STATES[us] = ls;
  },
  addStates(...states) {
    states.map(s => this.addState(s))
  },

  //interact with the Vue
  updateGameSettings(prop, val) {
    this.game.settings[prop] = val;
  },

  //interact with the game
  startGame(game) {
    this.setState('play');
    game.state.start('play');
  },
  restartGame(game) {
    this.setState('menu');
    game.state.start('menu', true, true);
  },
  pauseGame(game) {
    this.setState('pause');
    game.paused = true;
  },
  resumeGame(game) {
    this.setState('play');
    //do a nice countdown timer from 3.
    game.paused = false;
  },
  endGame(game) {
    this.setState('over');
    game.state.start('over');
  },
  changeGameState(game, state) {
    this.setState(state);
    game.state.start(state);
  },
  toggleSound(game) {
    game.mute ? game.mute = true : game.mute = false;
  }

}