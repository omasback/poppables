export default function initCollapse() {
  let gameList = document.querySelectorAll('[data-view-details]');
  gameList.forEach((el) => {
    el.addEventListener('click', (element) => {
      let elParent = element.target.parentNode;
      elParent.classList.toggle('game--show');
    }, false);
  });
}