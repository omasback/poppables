// common stuff across all games
import './application'
import './styles/pages/games.scss'

// import $ from 'jquery'
import Vue from 'vue'

import GUI from './components/games/ui/gui.vue'
import PowerBar from './components/games/ui/powerbar.vue'
import ScoreBoard from './components/games/ui/scoreboard.vue'
import Multiplier from './components/games/ui/multiplier.vue'
import GameControls from './components/games/ui/gamecontrols.vue'
import Timer from './components/games/ui/timer.vue'

import Pops from './components/games/pops/Pops.vue'
import Catch from './components/games/catch/Catch.vue'
import Dots from './components/games/dots/Dots.vue'

//TODO - this better
let Game = null;
switch(window.GAME) {
case 'pops':
  Game = Pops;
  break;
case 'catch':
  Game = Catch;
  break;
case 'dots':
  Game = Dots;
  break;
default:
  console.warn('404. No game here bro');
  break;
}

const vm = new Vue({
  el: '#game-app',
  ...Game,
  components: {
    'gui': GUI,
    'power-bar': PowerBar,
    'score-board': ScoreBoard,
    'multiplier': Multiplier,
    'game-controls': GameControls,
    'timer': Timer
  }
});

vm.$on('test', () => {

});
