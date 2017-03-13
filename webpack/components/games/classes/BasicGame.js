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
import 'babel-polyfill'
import axios from 'axios'
// import {createFloodlight} from 'util/floodlight'

export default class extends Phaser.Game {
  constructor(width, height, container, settings) {
    super(width, height, Phaser.AUTO, container, null, true);
    //private
    this._startDelay = 3000;

    //public
    this.api = {};

    this.settings = settings;

    this.states = {
      boot: {
        preload() {
          this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        },
        create() {
          this.game.setState('load');
        }
      }
    }
    this.state.add('boot', this.states.boot);
    //this.state.start('boot);
    //this.settings.state = 'boot';

  }

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
  }

  stop() {
    // createFloodlight('1358061;type=2017l00;cat=2017l003;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1;num=');

    window.location = '#over';

    this.getLeaderboard(this.settings);
    this.setState('over');
  }

  play() {
    this.setState('play');
    this.input.enabled = false;

    setTimeout((() => {
      this.input.enabled = true;
      this.apiToken(this.settings.name);
    }).bind(this), 3000);
  }

  falter() {
    this.settings.state = 'incorrect'
    this.paused = true;
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
    //TODO - make fancy restart state and reset game's data.
    window.location.reload();
  }

  resize(w, h) {
    this.width = w;
    this.height = h;
    this.renderer.resize(w, h)
  }

  //TODO - safe guard against touching bad props?
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

  //Endpoints
  setTransformedToken(won, score) {
    let preString = [this.api.token, (won ? '1' : '0'), score].join('');
    let postString = '';
    for (let i = 0; i <= preString.length - 1; i++) {
      postString += String.fromCharCode(preString.charCodeAt(i) ^ 6);
    }
    this.api.transformedToken = btoa(postString);
  }

  apiToken(game_name) {
    axios.post('/api/games/fetch_token', {
      game_name
    })
    .then(res => {
      this.api.token = res.data.token
    })
    .catch(err => {
      console.warn(err);
    });
  }

  getLeaderboard(data) {
    if(!this.api.transformedToken) {
      this.setTransformedToken(data.won, data.score);
    }

    axios.get('/api/games/leaderboard_status', {
      params: {
        game_name: data.name,
        initials: 'YOU',
        transformed_token: this.api.transformedToken
      }
    }).then(res => {
      this.settings.leaderboard = res.data;
    })
    .catch(err => {
      if(err.response) {
        this.settings.errors = err.response.data.errors;
      }
      else {
        console.log(err.message)
      }
    });
  }

  sendResults(data) {
    if(!this.api.transformedToken) {
      this.setTransformedToken(data.won, data.score);
    }
    axios.post('/api/games/record_score', {
      game_name: data.name,
      initials: data.initials,
      transformed_token: this.api.transformedToken
    })
    .then(() => {
      this.settings.state = 'share';
      //window.location = '/users/sign_up?game_name='+this.settings.name+'&transformed_token='+this.api.transformedToken;
    })
    .catch(err => {
      if(err.response) {
        this.settings.errors = err.response.data.errors;
      }
      else {
        console.log(err.message)
      }
    });
  }

}
