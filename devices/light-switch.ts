/// <reference path="../typings/index.d.ts" />

import Device = require('zetta-device');
import { espSend } from '../endpoints/esp';

export = class LightSwitch extends Device {
  ip: string;
  name: string;
  code: string;
  state: string;

  constructor(ip: string, _switch: { name: string, code: string }) {
    super();
    this.ip = ip;
    this.name = _switch.name;
    this.code = _switch.code;
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

  turnOn(cb: () => void) {
    const code = getCode(this.code, true);

    return espSend({ host: this.ip, path: `/cmd?code=${code}` }).then(message => {
      this.state = 'on';
      cb();
    });
  }

  turnOff(cb: () => void) {
    const code = getCode(this.code, false);

    return espSend({ host: this.ip, path: `/cmd?code=${code}` }).then(message => {
      this.state = 'off';
      cb();
    });
  }
}

function getCode(baseCode: string, on: boolean): string {
  const [code, bitLength] = baseCode.split(':').map(s => parseInt(s, 10));

  const onOffCode = on ? code + 1 : code;   // Flip bit 0 to 1 for ON

  return String(onOffCode) + ':' + String(bitLength);
}
