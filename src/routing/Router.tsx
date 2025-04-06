import { FunctionalComponent, h } from 'preact';
import { Suspense } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';

import { routes, RouteConfig, RouteLoaderResult } from './routes';
import { matchPath } from './route-matcher';

interface MatchedRoute {
  component: FunctionalComponent<any>;
  data: RouteLoaderResult;
  children: MatchedRoute | null;
}

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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary>
        <Component {...data}>{children ? renderRouteTree(children) : null}</Component>
      </ErrorBoundary>
    </Suspense>
  );
}

async function matchRoutes(configs: RouteConfig[], path: string): Promise<MatchedRoute | null> {
  for (const route of configs) {
    const match = matchPath(route.path, path);
    if (!match) continue;

    if (route.guard) {
      const allowed = await route.guard({ pathname: path, params: match.params });
      if (!allowed) {
        return {
          component: () => <div>Access Denied</div>,
          data: {},
          children: null,
        };
      }
    }

    const data = route.loader ? await route.loader({ params: match.params }) : {};
    const child = route.children ? await matchRoutes(route.children, match.remainingPath) : null;

    return {
      component: route.component,
      data,
      children: child,
    };
  }
  return null;
}
