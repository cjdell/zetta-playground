/// <reference path="../zetta-device/index.d.ts" />

declare function ZettaConstructor(): Zetta;

type QueryExpr = {
  id?: string,
  type?: string,
  vendorId?: string
};

type Query = {

};

type Server = {
  where(queryExpr: QueryExpr): Query,
  observe(queries: Query[], callback: (...device: Device[]) => void): void
  find(query: Query, callback: (err: Error, results: any[]) => void): void
};

type Application = (server: Server) => void;

type Useables = DeviceClass | Application;

type Zetta = {
  name(name: string): Zetta,
  use(device: {}, arg1?: any): Zetta,
  listen(port: number, start: () => void): void
};

declare module "zetta" {
  export = ZettaConstructor;
}
