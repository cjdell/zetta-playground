/// <reference path="../zetta-device/index.d.ts" />

declare class ZettaLedMockDriver extends Device {
  init(config: DeviceConfig): void;
}

declare module "zetta-led-mock-driver" {
  var driver: ZettaLedMockDriver;

  export = driver;
}
