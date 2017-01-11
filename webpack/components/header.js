export default function header() {
  console.log('header init');
  const headerToggle = document.querySelector('.headerToggle')
  const headerNav = document.querySelector('.headerNav')
  let navShowing = window.innerWidth > 700

  headerToggle.addEventListener('click', () => {
    navShowing = !navShowing;
    //do DOM stuff here to show or hide the nav
    console.log('navShowing is', navShowing)
    if (navShowing) {
      headerNav.style.display = 'block';
      headerToggle.children[0].className = "navImage xIcon";
    } else {
      headerNav.style.display = 'none';
      headerToggle.children[0].className = "navImage hamburger";
    }
  })
}
