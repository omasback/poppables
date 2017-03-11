export function createFloodlight(src) {
  let iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = 'https://1358061.fls.doubleclick.net/activityi;src='+ src + Math.random() * 10000000000000 + '?';
  iframe.width = '1';
  iframe.height = '1';
  document.body.insertBefore(iframe, document.body.firstChild);
}