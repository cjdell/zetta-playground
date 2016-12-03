import mdns = require('mdns');

const ad = mdns.createAdvertisement(mdns.tcp('foo-service'), 51234, {}, (err, service) => {
  console.log(err, service);
});

ad.start();
