import './components/application'
import bg from './components/background.js'
import form from './components/form.js'

const loadPages = () => {
  bg();
  form();

  window.removeEventListener('load', loadPages);
}

window.addEventListener('load', loadPages);