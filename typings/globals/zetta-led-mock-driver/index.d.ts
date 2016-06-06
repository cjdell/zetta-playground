/// <reference path="../zetta/index.d.ts" />

type ZettaLedMockDriver = Function;

declare module "zetta-led-mock-driver" {
  var driver: ZettaLedMockDriver;

  export = driver;
}
