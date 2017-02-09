// common stuff across all pages (except admin)

import '../styles/application.scss'
import header from './header.js'
import initCollapse from './gamelist.js'
import cardSlideUp from './cardSlide.js'

const loadApp = () => {
  header();
  if( document.body.classList.contains('gamesLanding') ) { initCollapse() }
  if( document.body.classList.contains('aboutPage') ) { cardSlideUp() }

  window.removeEventListener('DOMContentLoaded', loadApp);
}

window.addEventListener('DOMContentLoaded', loadApp);