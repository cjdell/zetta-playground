import mdns = require('mdns');

const browser = mdns.createBrowser(mdns.tcp('foo-service'));

browser.on('serviceUp', (service) => {
  console.log("service up: ", service);
});

browser.on('serviceDown', (service) => {
  console.log("service down: ", service);
});

browser.start();
