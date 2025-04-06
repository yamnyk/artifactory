import { FunctionalComponent, h } from 'preact';
import { Suspense } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';

import { routes } from './routes';
import { RouteConfig, MatchedRoute } from './types';
import { matchPath } from './route-matcher';
import { sortRoutes } from './helper';

export const Router: FunctionalComponent = () => {
  const [route, setRoute] = useState<MatchedRoute | null>(null);
  console.log('[Router] Current route:', window.location.pathname);
  useEffect(() => {
    const load = async () => {
      const matched = await matchRoutes(routes, window.location.pathname);
      setRoute(matched);
    };

    load();
    window.addEventListener('popstate', load);
    return () => window.removeEventListener('popstate', load);
  }, []);

  if (!route) return <div>Loading...</div>;
  return renderRouteTree(route);
};

const ErrorBoundary: FunctionalComponent<{ error?: string }> = ({ children, error }) => {
  try {
    return <>{children}</>;
  } catch (e) {
    return <div>💥 {error || 'Something broke.'}</div>;
  }
};

function renderRouteTree(node: MatchedRoute | null): h.JSX.Element | null {
  if (!node) return null;
  const { component: Component, data, children } = node;
  console.log('[renderRouteTree]', {
    component: Component?.name,
    resolved: Component,
  });
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary>
        <Component {...data}>{children ? renderRouteTree(children) : null}</Component>
      </ErrorBoundary>
    </Suspense>
  );
}

export async function matchRoutes(routes: RouteConfig[], path: string): Promise<MatchedRoute | null> {
  const normalizedPath = path.replace(/\/+$/, '') || '/';
  routes = sortRoutes(routes);

  for (const route of routes) {
    // Handle index route
    if (route.index) {
      if (normalizedPath !== '/') continue;

      if (route.guard) {
        const allowed = await route.guard({ pathname: normalizedPath, params: {} });
        if (!allowed) continue;
      }

      const data = route.loader ? await route.loader({ params: {} }) : {};
      return {
        component: route.component,
        data,
        children: null,
      };
    }

    // Skip invalid
    if (!route.path) continue;

    const match = matchPath(route.path, normalizedPath);
    if (!match) continue;

    const { params, remainingPath } = match;

    if (route.guard) {
      const allowed = await route.guard({ pathname: normalizedPath, params });
      if (!allowed) continue;
    }

    const data = route.loader ? await route.loader({ params }) : {};
    const children = route.children ? await matchRoutes(sortRoutes(route.children), remainingPath) : null;

    return {
      component: route.component,
      data,
      children,
    };
  }

  return null;
}
