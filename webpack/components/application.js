// common stuff across all pages (except admin)

import '../styles/application.scss'
import header from './header.js'
import initCollapse from './gamelist.js'

const loadApp = () => {
  header();
  if( document.body.classList.contains('gamesLanding') ) { initCollapse(); }

  window.removeEventListener('DOMContentLoaded', loadApp);
}

window.addEventListener('DOMContentLoaded', loadApp);