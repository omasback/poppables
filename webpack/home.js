// stuff for homepage
import Vue from 'vue'
import './components/application'
import Home from 'components/home/home.vue'
import bg from './components/background.js'

bg();
new Vue({
  el: '#home',
  ...Home,
})
