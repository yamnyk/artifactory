import { RouteParams } from './routes';

export interface MatchResult {
  params: RouteParams;
  remainingPath: string;
}

export function matchPath(routePath: string, actualPath: string, exact = false): MatchResult | null {
  const routeSegments = routePath.split('/').filter(Boolean);
  const actualSegments = actualPath.split('/').filter(Boolean);

  if (exact && routeSegments.length !== actualSegments.length) return null;
  if (routeSegments.length > actualSegments.length) return null;

  const params: RouteParams = {};

  for (let i = 0; i < routeSegments.length; i++) {
    const r = routeSegments[i];
    const a = actualSegments[i];

    if (!a) return null;
    if (r.startsWith(':')) {
      params[r.slice(1)] = a;
    } else if (r !== a) {
      return null;
    }
  }

  return {
    params,
    remainingPath: '/' + actualSegments.slice(routeSegments.length).join('/'),
  };
}
