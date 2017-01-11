export default function header() {
  console.log('header init');
  const headerToggle = document.querySelector('.headerToggle')
  const headerNav = document.querySelector('.headerNav')
  let navShowing = window.innerWidth > 700

  headerToggle.addEventListener('click', () => {
    navShowing = !navShowing;
    //do DOM stuff here to show or hide the nav
  })
}
