/* @flow */

// common stuff across all games
import './application'

import $ from 'jquery'
import Vue from 'vue'
import GameMock from './components/GameUI/GameMock'
import Test from './components/GameUI/Test.vue'

$(() => console.log('yo from Games'))

const vm = new Vue({
  el: '#vue-app',
  ...Test,
})