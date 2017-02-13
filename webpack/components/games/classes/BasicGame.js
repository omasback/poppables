/** Basic Game extends Phaser.Game -- the following are reserved:
* 
_deltaTime
_height
_kickstart
_lastCount
_nextFpsNotification
_paused
_spiraling
_width
add : Phaser.GameObjectFactory
antialias
cache : Phaser.Cache
camera : Phaser.Camera
canvas : canvas
clearBeforeRender
config : Object
context : null
create : Phaser.Create
currentUpdateID
debug : Phaser.Utils.Debug
device : Phaser.Device
forceSingleUpdate
fpsProblemNotifier : Phaser.Signal
height
id
input : Phaser.Input
isBooted
isRunning
load : Phaser.Loader
lockRender
make : Phaser.GameObjectCreator
math : Object
net : Phaser.Net
onBlur
onFocus
onPause
onResume
parent
particles : Phaser.Particles
paused
pendingStep
physics : Phaser.Physics
physicsConfig
plugins : Phaser.PluginManager
preserveDrawingBuffer
raf : Phaser.RequestAnimationFrame
renderType
renderer : PIXI.WebGLRenderer
resolution
rnd : Phaser.RandomDataGenerator
scale : Phaser.ScaleManager
sound : Phaser.SoundManager
stage : Phaser.Stage
state : Phaser.StateManager
stepCount
stepping
time : Phaser.Time
transparent
tweens : Phaser.TweenManager
updatesThisFrame
width
world : Phaser.World
*/

export default class extends Phaser.Game {
  constructor(width, height, container, settings) {
    super(width, height, Phaser.AUTO, container, null, true);
    //private

    //public
    this.settings = settings;
    this.states = {
      boot: {
        preload() {
          this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

          if(this.game.device.desktop) {
            //stuf for desktop
          }
          else {
            //stuff for mobile
          }
        },
        create() {
          this.game.setState('load');
        }
      }
    }
    this.state.add('boot', this.states.boot);
    //this.state.start('boot);
    //this.settings.state = 'boot';
    
  } // end constructor

  // public API methods
  /** addState --
   * @param {string} key - 
   * @param {obj} state - state Phaser state object{key: {preload(){}, create(){}, update(){}}}
   */
  addState(key, state) {
    if(typeof key !== 'string') {
      console.warn('You tried to add a state with a key that is not a string', key);
      return;
    }
    if(typeof state !== 'object') {
      console.warn('You tried to add a state that is not an object', state);
      return;
    }
    this.state.add(key, state);
  }

  /**
   * @param {array} states - states is an array of objects: [{key:state}, {key:state}]
   */
  addStates(...states) {
    states.map(s => {
      for(let key in s)
        this.addState(key, s[key]);
    });
  }

  getState() {
    return this.state.current;
  }

  /** setState -- The sole function used to start a new state in the Phaser.Game
   * @param {string} newState --
   */
  setState(newState) {
    let flag = false;
    for(let state in this.state.states) {
      if(state === newState)
        flag = true;
    }
    if(!flag) {
      console.warn('You tried setting the state to something that has not been added yet', newState);
      return;
    }
    
    this.settings.state = newState;
    this.state.start(newState);
  }

  start() {
    this.setState('boot');
    /*
    let data = new FormData();
    data.append('game_name', 'pops');
    fetch('/api/games/start',{
      method: 'POST',
      body: data
    }).then((response) => {
      return response.json();
    }).then((json) => {
      console.log(json.token);
      // TODO store this token somewhere
    })
    */
  }

  stop() {
    this.setState('over');
  }

  play() {
    this.setState('play');
    this.input.enabled = false;
    //TODO -- MOVE THIS OUT OF BASIC GAME AND INTO THE DERIVED GAME
    setTimeout((() => {
      this.input.enabled = true;
    }).bind(this), 3000);
  }

  pause() {
    this.settings.state = 'pause';
    this.paused = true;
  }

  resume() {
    this.settings.state = 'play';
    setTimeout((() => {
      this.paused = false
    }).bind(this), 3000);
  }

  restart() {

  }

  resize(w, h) {
    console.log(w, h)
    this.width = w;
    this.height = h;
    this.renderer.resize(w, h)
  }

  sendResults(data) {
    //do an ajax call to some endpoint here
    console.log(data);
  }

  toggle(prop) {
    this[prop] = !this[prop];
  }

  toggleSound() {
    this.sound.mute = !this.sound.mute;
  }

  setSound(bool) {
    this.sound.mute = bool;
  }

  togglePause() {
    this.paused = !this.paused;
  }

}