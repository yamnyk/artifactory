import { FunctionalComponent } from 'preact';

export interface MatchedRoute {
  component: FunctionalComponent<any>;
  data: RouteLoaderResult;
  children: MatchedRoute | null;
}

export interface RouteParams {
  [key: string]: string;
}

export interface RouteLoaderResult {
  [key: string]: unknown;
}

export interface RouteGuardContext {
  pathname: string;
  params: RouteParams;
}

type BaseRoute = {
  component: FunctionalComponent<any>;
  loader?: (ctx: { params: RouteParams }) => Promise<RouteLoaderResult>;
  guard?: (ctx: RouteGuardContext) => Promise<boolean> | boolean;
  children?: RouteConfig[];
};

type IndexRoute = BaseRoute & {
  index: true;
  path?: never;
};

type PathRoute = BaseRoute & {
  index?: false;
  path: string;
};

export type RouteConfig = (IndexRoute | PathRoute) & BaseRoute;
