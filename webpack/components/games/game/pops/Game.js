/** Game extends BasicGame -- the following can be used from BasicGame:
* 
  addState(key, state)
  addStates(...states)
  getState() 
  setState(newState)
  start()
  play()
  pause()
  resume()
  restart()
  resize(w, h)
  sendResults(data)
  toggle(prop)
  toggleSound()
  togglePause()
*/
//Classes|Objects
import BasicGame from '../../classes/BasicGame'

//States
import load from './states/load'
import menu from './states/menu'
import play from './states/play'
import over from './states/over'

export default class extends BasicGame {
  constructor(width, height, container, settings) {
    super(width, height, container, settings);
    //private    
    
    //public
    this.data = {
      poppables: {
        count: 0
      }
    }

    this.state.add('load', load);
    this.state.add('menu', menu);
    this.state.add('play', play);
    this.state.add('over', over);
  }
  
}