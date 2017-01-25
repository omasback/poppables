// stuff for homepage
import Vue from 'vue'
import './application'
import Home from './components/home.vue'

import bg from './components/background.js'

bg();
new Vue({
  el: '#home',
  ...Home,
})
