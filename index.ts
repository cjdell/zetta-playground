/// <reference path="typings/index.d.ts" />

import zetta = require('zetta');
import fs = require('fs');
import LED = require('zetta-led-mock-driver');
import RemoteLED = require('./devices/remote-led');

zetta()
  .name('Hello Zetta')
  .use(LED)
  .listen(1337, function () {
    console.log('Zetta is running at http://127.0.0.1:1337');
  });
