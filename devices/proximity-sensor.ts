/// <reference path="../typings/index.d.ts" />

import Device = require('zetta-device');

export = class ProximitySensor extends Device {
  name: string;
  proximity = false;

  constructor(name: string) {
    super();
    this.name = name;
  }

  init(config: DeviceConfig) {
    config
      .name(this.name)
      .type('proximity-sensor')
      .monitor('proximity');

    setInterval(() => {
      this.proximity = false;
      if (new Date().getTime() % 2 === 0) this.proximity = true;
    }, 1000);
  }
}
