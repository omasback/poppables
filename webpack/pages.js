import './components/application'
import bg from './components/background.js'

const loadPages = () => {
  bg();

  window.removeEventListener('load', loadPages);
}

window.addEventListener('load', loadPages);