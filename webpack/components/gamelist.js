export default function gameList() {
  let gameList = document.querySelectorAll('[data-view-details]');
  for (let i = 0; i < gameList.length; i++) {
    gameList[i].addEventListener('click', function(element) {
      element.preventDefault();
      let el = element.target.parentNode;

      if (el.classList) {
        el.classList.toggle('game--show');
      } else {
        let classes = el.className.split(' ');
        let existingIndex = classes.indexOf('game--show');

        if (existingIndex >= 0)
          classes.splice(existingIndex, 1);
        else
          classes.push('game--show');

        el.className = classes.join(' ');
      }

    });
  }
}
