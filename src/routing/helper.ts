import { RouteConfig } from './types';

export enum ROUTES {
  HOME = '/',
  ARTIFACTS = 'artifacts',
  ARTIFACT = 'artifacts/:id',
}

const sorter = (a: RouteConfig, b: RouteConfig): number => {
  if ('index' in a && a.index) return 1;
  if ('index' in b && b.index) return -1;

  const aDynamic = a.path?.includes(':') ? 1 : 0;
  const bDynamic = b.path?.includes(':') ? 1 : 0;

  return aDynamic - bDynamic; // static first, then dynamic
};

export const prioritySortRoutes = (src: RouteConfig[]): RouteConfig[] => src.sort(sorter);

const scoreRoute = (route: RouteConfig): number => {
  if (route.index) return 0;
  if (!route.path) return 0;

  const segments = route.path.split('/').filter(Boolean);
  return segments.reduce((score, segment) => {
    if (segment.startsWith(':')) return score + 5;
    if (segment === '*') return score - 999;
    return score + 10;
  }, 0);
};

export const sortRoutes = (routes: RouteConfig[]): RouteConfig[] =>
  [...routes].sort((a, b) => scoreRoute(b) - scoreRoute(a));
