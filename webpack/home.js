// stuff for homepage
import Vue from 'vue'
import './application'
import Home from './components/Home.vue'

const vm = new Vue({
  el: '#home',
  ...Home,
})
