/* Initial Pops Game Data for Vue to Listen and React to */
export default {
  name: 'pops',
  state: 'boot',
  initials: '',
  chance: .25,
  maxSpeed: 6,
  misses: 0,
  time: 0,
  multiplier: 1,
  score: 0,
  speed: 1,
  won: false,
  leaderboard: [],
  errors: []
}