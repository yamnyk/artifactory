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
