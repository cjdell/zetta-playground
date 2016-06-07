/// <reference path="typings/index.d.ts" />

import zetta = require('zetta');

// import LED = require('zetta-led-mock-driver');
import LightSwitch = require('./devices/light-switch');
import ProximitySensor = require('./devices/proximity-sensor');

import Home = require('./interactions/home');

zetta()
  .name('Hello Zetta')
  .use(LightSwitch)
  .use(ProximitySensor)
  .use(Home)
  .listen(1337, function () {
    console.log('Zetta is running at http://127.0.0.1:1337');
  });
