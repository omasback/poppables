// common stuff across all games
import '../application'

import Vue from 'vue'

//Game Components
import Gui from './ui/gui.vue'
import Screen from './ui/screen.vue'
import PowerBar from './ui/components/power.vue'
import ScoreBoard from './ui/components/scoreboard.vue'
import Multiplier from './ui/components/multiplier.vue'
import GameControls from './ui/components/controls.vue'
import Timer from './ui/components/timer.vue'

export default function start(Game) {
  document.querySelector('.footer').style.display = 'none';

  const vm = new Vue({
    el: '#game-app',
    ...Game,
    components: {
      'gui': Gui,
      'screen': Screen,
      'power-bar': PowerBar,
      'score-board': ScoreBoard,
      'multiplier': Multiplier,
      'game-controls': GameControls,
      'timer': Timer
    }
  });

  console.log(vm);
}

