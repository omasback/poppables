export default function header() {
  console.log('header init');
  const headerToggle = document.querySelector('.headerToggle')
  const headerNav = document.querySelector('.headerNav')
  const headerBar = document.querySelector('.headerBar')
  const headerLogoImage = document.querySelector('.headerLogoImage')
  const content = document.querySelector('.contentContainer')
  let navShowing = window.innerWidth > 700

  headerToggle.addEventListener('click', () => {
    navShowing = !navShowing;
    //do DOM stuff here to show or hide the nav
    if (navShowing) {
      headerNav.style.display = 'block';
      headerToggle.children[0].className = "navImage xIcon";
      content.className = "contentContainer blurred";
    } else {
      headerNav.style.display = 'none';
      headerToggle.children[0].className = "navImage hamburger";
      content.className = "contentContainer";
    }
  })
  window.addEventListener('scroll', () => {
    let yScroll = window.pageYOffset;
    if (yScroll > 18) {
      headerBar.className = 'headerBar headerBarScroll';
      headerLogoImage.className = "headerLogoImage headerLogoImageSmall"
    } else {
      headerBar.className = 'headerBar';
      headerLogoImage.className = "headerLogoImage headerLogoImageLarge"
    }
  })
}
