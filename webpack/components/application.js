// common stuff across all pages (except admin)

import '../styles/application.scss'
import header from './header.js'

const loadApp = () => {
  header();

  window.removeEventListener('DOMContentLoaded', loadApp);
}

window.addEventListener('DOMContentLoaded', loadApp);