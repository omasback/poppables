import $ from 'jquery'

export default GameClient = function (gameType) {
  var self = this;
  this.ui = null;
  this.gameType = gameType;


  function fetchToken() {
    return $.ajax(
      {
        url: '/api/games/start',
        method: 'POST',
        data: { game_name: self.gameType },
      }
    ).fail(function(error) {
      console.error(error);
      self.ui.error('Something is Up', 'You\'ve overloaded us! Take a quick break and come back soon!');
    });
  }

  this.progress = function(percent) {
    this.ui.progress(percent);
  }

  // Called once by Phaser game once it is loaded and ready to being game play
  // Removes any waiting spinner and shows a start button
  this.ready = function(startCb, resumeCb, restartCb) {
    self.gameType = gameType;
    self.startCb = startCb;
    self.resumeCb = resumeCb;
    self.restartCb = restartCb;

    self.ui.ready();
  };

  this.start = function() {
    self.ui.playing();
    self.startCb();

    fetchToken().done(function(response) {
      self.token = response.token;
    });
  };

  this.pause = function(score) {
    self.ui.paused(score);
  };

  this.resume = function() {
    self.ui.playing();
    self.resumeCb();
  };

  this.restart = function() {
    self.token = null;
    self.restartCb();
    self.start();
  };

  this.complete = function(isWin, score) {
    if (typeof (isWin) === 'undefined') {
      isWin = false;
    }

    if (!self.token) {
      self.ui.error('Something is Up', 'Give it another try in just a sec.', score);
      return;
    }

    var preString = [self.token, (isWin ? '1' : '0'), score].join('');
    var postString = '';
    for (var i =  0; i <= preString.length - 1 ; i++) {
      postString += String.fromCharCode(preString.charCodeAt(i) ^ 6);
    }
    var transformedToken = (new Hashes.Base64()).encode(postString);

    $.ajax({
      url: '/api/games/finish',
      method: 'POST',
      data: {
        transformed_token: transformedToken,
        name: self.gameType,
      },
    }).done(function(response) {
      if (response.entry) {
        self.ui.won(score);
      } else if (response.location) {
        self.ui.login(score);
      } else {
        self.ui.lost(score);
      }
    }).fail(function(error) {
      console.error(error, score);
      // isWin
      var title = isWin ? 'Congrats, You Won!' : 'Something is Up';
      self.ui.error(title, error.responseJSON.errors.join(', '), score);
    }).always(function() {
      self.token = undefined;
    });
  };

  
};