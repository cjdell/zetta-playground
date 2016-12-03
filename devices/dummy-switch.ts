/// <reference path="../typings/index.d.ts" />

import Device = require('zetta-device');

export = class DummySwitch extends Device {
  name: string;
  vendorId: string;
  state: string;
  // thing: string;

  constructor(name: string, vendorId: string) {
    super();
    this.name = name;
    this.vendorId = vendorId;

    // if (!this.state) this.state = 'off';

    console.log('DummySwitch', arguments);
  }

  init(config: DeviceConfig) {
    config
      .type('dummy-switch')
      .name(this.name)
      .state('off')
      .when('off', { allow: ['turn-on'] })
      .when('on', { allow: ['turn-off'] })
      .map('turn-on', this.turnOn)
      .map('turn-off', this.turnOff)
      // .map('do-send', this.doSend, [{ name: 'code', type: 'number' }]);
  }

  turnOn(cb: () => void) {
    this.state = 'on';

    // setTimeout(() => {
    //   this.state = 'off';
    // }, 2000);

    cb();
  }

  turnOff(cb: () => void) {
    this.state = 'off';
    cb();
  }

  // doSend(cb: () => void) {
  //   console.log('send', arguments);
  // }
}
