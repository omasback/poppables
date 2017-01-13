export default function header() {
  const headerToggle = document.querySelector('.headerToggle')
  const headerNav = document.querySelector('.headerNav')
  const headerBar = document.querySelector('.headerBar')
  const headerLogoImage = document.querySelector('.headerLogoImage')
  const content = document.querySelector('.contentContainer')
  let navShowing = window.innerWidth > 570

  headerToggle.addEventListener('click', () => {
    navShowing = !navShowing;
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
  //function to re-size the logo
  window.addEventListener('scroll', () => {
    let yScroll = window.pageYOffset;
    if (yScroll < 1) { //large logo
      headerLogoImage.className = "headerLogoImage"
      headerBar.className = 'headerBar';
    } else { //small logo
      headerLogoImage.className = "headerLogoImage headerLogoImageSmall"
      headerBar.className = 'headerBar headerBarScroll';
    } 
  })
}
