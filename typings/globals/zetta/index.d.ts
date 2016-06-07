/// <reference path="../zetta-device/index.d.ts" />

declare function ZettaConstructor(): Zetta;

type QueryExpr = {
  type: string
};

type Query = {

};

type Server = {
  where(queryExpr: QueryExpr): Query,
  observe(queries: Query[], callback: (...device: Device[]) => void): void
};

type DeviceClass = new (name: string) => Device;

type Application = (server: Server) => void;

type Useables = DeviceClass | Application;

type Zetta = {
  name(name: string): Zetta,
  use(driver: {}, arg1?: any): Zetta,
  listen(port: number, start: () => void): void
};

// declare type Driver = Function;

declare module "zetta" {
  export = ZettaConstructor;
}
