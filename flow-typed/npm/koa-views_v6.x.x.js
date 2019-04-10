// flow-typed signature: 0cf6b19f96e57435f0ea1b3cc075efac
// flow-typed version: 60fd29d2cf/koa-views_v6.x.x/flow_>=v0.56.x

declare module "koa-views" {
  declare type Context = Object;

  declare type Middleware = (
    ctx: Context,
    next: () => Promise<void>
  ) => Promise<void> | void;

  declare type Options = {|
    extension?: string,
    options?: Object,
    map?: Object,
    engineSource?: Object
  |};

  declare export default function views(
    root: string,
    opts?: Options
  ): Middleware;
}
