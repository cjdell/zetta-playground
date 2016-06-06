/// <reference path="../typings/index.d.ts" />

import Device = require('zetta-device');

export = class LED extends Device {
  led: string;
  state: string;

  constructor(led: string) {
    super();
    this.led = led;
  }

  init(config: DeviceConfig) {
    config
      .type('led')
      .state('off')
      .name(this.led)
      .when('off', { allow: ['turn-on'] })
      .when('on', { allow: ['turn-off'] })
      .map('turn-on', this.turnOn)
      .map('turn-off', this.turnOff);
  }

  turnOn(cb: Function) {
    this.state = 'on';
    cb();
  }

  turnOff(cb: Function) {
    this.state = 'off';
    cb();
  };
}
