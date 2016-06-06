// declare var ZettaDevice: {
//   new(): {}
// };

type WhenOptions = {
  allow: string[];
};

type TransitionFunction = {
  (cb: Function): void
};

type DeviceConfig = {
  type: (type: string) => DeviceConfig,
  state: (state: string) => DeviceConfig,
  name: (name: string) => DeviceConfig,
  when: (state: string, options: WhenOptions) => DeviceConfig,
  map: (transition: string, func: TransitionFunction) => DeviceConfig
};

declare abstract class Device {
  abstract init(config: DeviceConfig): void;
}

declare module "zetta-device" {
  export = Device;
}
