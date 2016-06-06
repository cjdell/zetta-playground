declare function ZettaConstructor(): Zetta;

type Zetta = {
  name(name: string): Zetta,
  use(driver: Driver, arg1?: any): Zetta,
  listen(port: number, start: () => void)
};

declare type Driver = Function;

declare module "zetta" {
  export = ZettaConstructor;
}
