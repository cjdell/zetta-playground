/// <reference path="../zetta/index.d.ts" />
/// <reference path="../zetta-device/index.d.ts" />

declare abstract class Scout {
  protected server: Server;

  abstract init(next: () => void): void;
  discover(device: DeviceClass, ...args: any[]): void;
  provision(props: any, device: DeviceClass, ...args: any[]): void;
}

declare module "zetta-scout" {
  export = Scout;
}
