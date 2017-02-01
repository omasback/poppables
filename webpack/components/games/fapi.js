export default {
  state: 'boot',
  states: ['boot', 'load', 'menu', 'play', 'pause', 'over'],
  game: {
    score: 0,
    speed: 0,
    misses: 0,
    chance: .35,
    multiplier: 1,
    maxSpeed: 5,
    time: 10
  },

  //functions to touch props
  setState(val) {
    if(!this.states.includes(val))
      this.addState(val);
    
    this.state = val;
  },
  getState() {
    return this.state;
  },
  addState(state) {
    if(typeof state !== 'string')
      return;
    this.states.push(state.toLowerCase()); 
  },
  addStates(...states) {
    states.map(s => this.addState(s))
  },

  //interact with the Vue
  updateGameSettings(prop, val) {
    this.game[prop] = val;
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