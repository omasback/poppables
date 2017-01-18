// stuff for homepage
import Vue from 'vue'
import './application'
import Home from './components/home.vue'

if (document.getElementById('home')) {
  const vm = new Vue({
    el: '#home',
    ...Home,
  })
}
