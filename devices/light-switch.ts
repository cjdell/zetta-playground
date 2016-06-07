/// <reference path="../typings/index.d.ts" />

import Device = require('zetta-device');

export = class LightSwitch extends Device {
  name: string;
  state: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  init(config: DeviceConfig) {
    config
      .type('light-switch')
      .state('off')
      .name(this.name)
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
