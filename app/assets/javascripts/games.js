// common stuff across all games

import $ from 'jquery'
import Vue from 'vue'
import GameMock from './components/GameUI/GameMock'
import Test from './components/GameUI/Test.vue'



$(() => console.log('yo from Games'))

debugger

const vm = new Vue({
  el: '#vue-app',
  ...Test,
})