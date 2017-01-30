// common stuff across all games
import './application'
import './styles/pages/games.scss'

// import $ from 'jquery'
import Vue from 'vue'

//Game Components
import Gui from './components/games/ui/gui.vue'
import PowerBar from './components/games/ui/components/power.vue'
import ScoreBoard from './components/games/ui/components/scoreboard.vue'
import Multiplier from './components/games/ui/components/multiplier.vue'
import GameControls from './components/games/ui/components/controls.vue'
import Timer from './components/games/ui/components/timer.vue'

import Pops from './components/games/game/pops/Pops.vue'
import Catch from './components/games/game/catch/Catch.vue'
import Dots from './components/games/game/dots/Dots.vue'

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
    'gui': Gui,
    'power-bar': PowerBar,
    'score-board': ScoreBoard,
    'multiplier': Multiplier,
    'game-controls': GameControls,
    'timer': Timer
  }
});

console.log(vm);

vm.$on('test', () => {

});