// common stuff across all games
import './application'
import './styles/pages/games.scss'

import $ from 'jquery'
import Vue from 'vue'
import GameMock from './components/GameUI/GameMock'

import GUI from './components/games/ui/GUI.vue'
import PowerBar from './components/games/ui/PowerBar.vue'
import ScoreBoard from './components/games/ui/ScoreBoard.vue'
import GameControls from './components/games/ui/GameControls.vue'

import Pops from './components/games/pops/Pops.vue'
import Catch from './components/games/catch/Catch.vue'
import Dots from './components/games/dots/Dots.vue'

//TODO - this better
//hide bg fluff?

$("#dots").hide();
/*
$("#vignette").hide();
$("#debris").hide();
*/

//set game
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
  default:
    console.log('no game here bro')
  break;
}

const vm = new Vue({
  el: '#game-app',
  ...Game,
  components: {
    'gui': GUI,
    'power-bar': PowerBar,
    'score-board': ScoreBoard,
    'game-controls': GameControls,
  },
});

vm.$on('test', function() {
  console.log("test")
})