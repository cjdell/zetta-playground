type WhenOptions = {
  allow: string[];
};

type TransitionFunction = {
  (cb: () => void): void
};

type TransitionAttribute = {
  type: string,
  name: string,
  value?: number,
  min?: number,
  max?: number
};

type DeviceConfig = {
  id: (id: string) => DeviceConfig,
  type: (type: string) => DeviceConfig,
  state: (state: string) => DeviceConfig,
  name: (name: string) => DeviceConfig,
  when: (state: string, options: WhenOptions) => DeviceConfig,
  map: (transition: string, func: TransitionFunction, attrs?: TransitionAttribute[]) => DeviceConfig,
  monitor: (propertyName: string) => DeviceConfig
};

type DeviceReadStream = NodeJS.ReadableStream & {
  on(type: string, cb: (msg: any) => void): void,
  on(type: 'data', cb: (msg: { data: any }) => void): void
};

declare abstract class Device {
  abstract init(config: DeviceConfig): void;
  createReadStream(propertyName: string): DeviceReadStream;
  available(state: String): boolean;
  call(state: String): void
}

type DeviceClass = new (...args: any[]) => Device;

declare module "zetta-device" {
  export = Device;
}
