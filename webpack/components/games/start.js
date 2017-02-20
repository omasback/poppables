// common stuff across all games
import '../application'

import Vue from 'vue'

//Game Components
import Gui from './ui/gui.vue'
import PowerBar from './ui/components/power.vue'
import ScoreBoard from './ui/components/scoreboard.vue'
import Multiplier from './ui/components/multiplier.vue'
import GameControls from './ui/components/controls.vue'
import Timer from './ui/components/timer.vue'
import Countdown from './ui/components/countdown.vue'
import PlayMenu from './ui/components/menu-play.vue'
import PauseMenu from './ui/components/menu-pause.vue'
import OverMenu from './ui/components/menu-over.vue'

export default function start(Game) {
  document.querySelector('.footer').style.display = 'none';

  const vm = new Vue({
    el: '#game-app',
    ...Game,
    components: {
      'gui': Gui,
      'power-bar': PowerBar,
      'score-board': ScoreBoard,
      'multiplier': Multiplier,
      'game-controls': GameControls,
      'timer': Timer,
      'countdown': Countdown,
      'menu-play': PlayMenu,
      'menu-pause': PauseMenu,
      'over-menu': OverMenu
    }
  });

  console.log(vm);
}

