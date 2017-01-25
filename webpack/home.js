// stuff for homepage
import Vue from 'vue'
import './application'
import Home from './components/home.vue'

import bg from './components/background.js'

bg();
const vm = new Vue({
  el: '#home',
  ...Home,
})
