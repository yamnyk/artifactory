import { RouteParams } from './routes';

export interface MatchResult {
  params: RouteParams;
  remainingPath: string;
}

export function matchPath(routePath: string, actualPath: string): MatchResult | null {
  const routeSegments = routePath.split('/').filter(Boolean);
  const actualSegments = actualPath.split('/').filter(Boolean);

  if (routeSegments.length > actualSegments.length) return null;

  const params: RouteParams = {};

  for (let i = 0; i < routeSegments.length; i++) {
    const routeSegment = routeSegments[i];
    const actualSegment = actualSegments[i];

    if (routeSegment.startsWith(':')) {
      const paramName = routeSegment.slice(1);
      params[paramName] = actualSegment;
    } else if (routeSegment !== actualSegment) {
      return null;
    }
  }

  return {
    params,
    remainingPath: '/' + actualSegments.slice(routeSegments.length).join('/'),
  };
}
