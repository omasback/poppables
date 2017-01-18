// common stuff across all games
import './application'

import $ from 'jquery'
import Vue from 'vue'
import GameMock from './components/GameUI/GameMock'
import Test from './components/GameUI/Test.vue'

import Pops from './components/games/pops/Pops.vue'

const vm = new Vue({
  el: '#game-app',
  ...Pops
})