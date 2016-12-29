
export default GameUI = function($el, client) {
  // all overlays
  var $overlays = $el.find('.game-overlay-page');

  // individual overlays
  var $instruction = $el.find('.js-instructions-overlay');
  var $pause = $el.find('.js-pause-overlay');
  var $won = $el.find('.js-won-overlay');
  var $lost = $el.find('.js-lost-overlay');
  var $error = $el.find('.js-error-overlay');
  // TODO: implement quit confirmation
  var $quit = $el.find('.js-quit-overlay');

  // misc ui elements
  var $loader = $el.find('.loader');
  var $scoreContainer = $el.find('.js-score-container');
  var $score = $el.find('.js-score');
  var $errorMessage = $el.find('.js-error-message');

  // buttons
  var $startButton = $el.find('.js-start');
  var $resumeButton = $el.find('.js-resume');
  var $restartButton = $el.find('.js-restart');
  var $instantWinButton = $el.find('.js-instant-win');
  var $loginButton = $el.find('.js-login');

  // init ui
  $startButton.on('click', function() {
    client.start();
  });

  $resumeButton.on('click', function() {
    client.resume();
  });

  $restartButton.on('click', function() {
    client.restart();
  });

  // public API
  this.ready = function() {
    $loader.hide();
    $startButton.show();
  };

  this.playing = function() {
    $overlays.hide();
    $el.hide();
  };

  this.paused = function(score) {
    showDialog(score);
    $pause.show();
  };

  this.won = function(score) {
    showDialog(score);
    $won.show();
    $loginButton.hide();
    $instantWinButton.show();
  };

  this.login = function(score) {
    showDialog(score);
    $won.show();
    $instantWinButton.hide();
    $loginButton.show();
  };

  this.lost = function(score) {
    showDialog(score);
    $lost.show();
  };

  this.error = function(msg, score) {
    showDialog(score);
    $errorMessage.html(msg);
    $error.show();
    console.log(msg);
  };

  // private helpers
  function showDialog(score) {
    if (score) {
      $scoreContainer.show();
      $score.text(score);
    } else {
      $scoreContainer.hide();
    }

    $el.show();
    $overlays.hide();
  }
};