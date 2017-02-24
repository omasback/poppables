// stuff for homepage
import Vue from 'vue'
import './components/application'
import Home from 'components/home/home.vue'
import bg from './components/background.js'

window.onpageshow = function(event) {
  if (event.persisted) {
    window.location.reload()
  }
};

bg();

(function initHomeVue() {
  new Vue({
    el: '#home',
    ...Home,
  })
})();
