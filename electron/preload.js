// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  // You can add any initialization code here that should run
  // before your app's content is loaded
  console.log('Electron preload script loaded');
});