/* @flow weak */

// stuff for homepage
import './application'
// this is listed in config/browserify.yml
// so it won't be required twice
import $ from 'jquery'

import redBubble from './components/redBubble'

$(() => {
  console.log('yoFromHome')
})