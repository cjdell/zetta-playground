/// <reference path="../typings/index.d.ts" />

import http = require('http');
import Scout = require('zetta-scout');
import mdns = require('mdns');
import LightSwitch = require('../devices/light-switch');
import { espQuery } from '../endpoints/esp';

export = class EspScout extends Scout {
  init(next: () => void) {
    this.startDiscoverer();

    next();
  }

  startDiscoverer() {
    const browser = mdns.createBrowser(mdns.tcp('esp'));

    browser.on('serviceUp', (service) => {
      console.log("service up: ", service.fullname);

      const remoteAddress = service.addresses[0];

      espQuery(remoteAddress).then(message => {
        console.log('Found ESP:', message.name);

        message.switches.forEach(_switch => {
          this.discover(LightSwitch, remoteAddress, _switch);
        });
      });
    });

    browser.on('serviceDown', (service) => {
      console.log("service down: ", service.fullname);
    });

    browser.start();
  }
}
