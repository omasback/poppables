// TODO this is currently stubbed debug stuff, to be replaced when a real
// game with real callbacks is available.
export default function GameMock($el, client) {
  const $pause = $el.find('.js-dummy-pause');
  const $win = $el.find('.js-dummy-win');
  const $lose = $el.find('.js-dummy-lose');

  const startCb = () => console.log('PHASER START CALLBACK');
  const resumeCb = () => console.log('PHASER RESUME CALLBACK');
  const restartCb = () => console.log('PHASER RESTART CALLBACK');

  $pause.on('click', () => client.pause());
  $win.on('click', () => client.complete(true, Math.floor(Math.random() * 1000)));
  $lose.on('click', () => client.complete(false, Math.floor(Math.random() * 1000)));

  // pretend it take 1 sec to load the game
  setTimeout(() => client.ready(startCb, resumeCb, restartCb), 200);
};