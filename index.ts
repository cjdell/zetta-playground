/// <reference path="typings/index.d.ts" />

import zetta = require('zetta');
import config = require('./config');

// import LED = require('zetta-led-mock-driver');
// import DummySwitch = require('./devices/dummy-switch');
import ProximitySensor = require('./devices/proximity-sensor');

import EspScout = require('./scouts/esp-scout');
import DummyScout = require('./scouts/dummy-scout');

import Home = require('./interactions/home');

zetta()
  .name('Zetta Playground')
  .use(EspScout)
  .use(DummyScout)
  .use(ProximitySensor)
  .use(Home)
  .listen(config.Ports.Zetta, function () {
    console.log(`Zetta is running on port ${config.Ports.Zetta}`);
  });
