// common stuff across all pages (except admin)

import '../styles/application.scss'
import header from './header.js'
import gameList from './gamelist.js'

const loadApp = () => {
  header();
  gameList();

  window.removeEventListener('DOMContentLoaded', loadApp);
}

window.addEventListener('DOMContentLoaded', loadApp);