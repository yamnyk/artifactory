import { FunctionalComponent, h } from 'preact';
import { Suspense } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';

import { routes } from './routes';
import { RouteConfig, MatchedRoute } from './types';
import { matchPath } from './route-matcher';

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

  for (const route of routes) {
    const isIndex = 'index' in route && route.index === true;

    if (isIndex) {
      if (normalizedPath !== '/') continue;

      if (route.guard && !(await route.guard({ pathname: normalizedPath, params: {} }))) continue;

      const data = route.loader ? await route.loader({ params: {} }) : {};
      return { component: route.component, data, children: null };
    }

    const match = matchPath(route.path, normalizedPath);
    if (!match) continue;

    const { params, remainingPath } = match;

    if (route.guard && !(await route.guard({ pathname: normalizedPath, params }))) continue;

    const data = route.loader ? await route.loader({ params }) : {};
    const children = route.children ? await matchRoutes(route.children, remainingPath) : null;

    return { component: route.component, data, children };
  }

  return null;
}
