// common stuff across all games
import './application'
import './styles/pages/games.scss'

import $ from 'jquery'
import Vue from 'vue'
import GameMock from './components/GameUI/GameMock'

import Pops from './components/games/pops/Pops.vue'
import Catch from './components/games/catch/Catch.vue'
import Dots from './components/games/dots/Dots.vue'

//TODO - this better
//hide bg fluff
$("#dots").hide();
$("#vignette").hide();
$("#debris").hide();

console.log(Pops)
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
    window.location = "/"; 
  break;
}

const vm = new Vue({
  el: '#game-app',
  ...Game
})