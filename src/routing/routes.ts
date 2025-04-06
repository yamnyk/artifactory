import { FunctionalComponent } from 'preact';
import { lazy } from 'preact/compat';
import Layout from '@/layout';
import { RecentArtifacts } from '@/pages';
import { ROUTES } from './helper';

const Artifacts = lazy(() => import('@/pages/Artifacts'));
const SingleArtifact = lazy(() => import('@/pages/SingleArtifact'));

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

export interface RouteConfig {
  path: string;
  component: FunctionalComponent<any>;
  loader?: (ctx: { params: RouteParams }) => Promise<RouteLoaderResult>;
  children?: RouteConfig[];
  guard?: (ctx: RouteGuardContext) => Promise<boolean> | boolean;
}

export const routes: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    component: Layout,
    children: [
      {
        path: ROUTES.HOME,
        component: RecentArtifacts,
      },
      {
        path: ROUTES.ARTIFACTS,
        component: Artifacts,
      },
      {
        path: ROUTES.ARTIFACT,
        component: SingleArtifact,
        loader: async ({ params }) => {
          const data = await fetch(`/api/artifacts/${params.id}`).then((r) => r.json());
          return { artifact: data };
        },
      },
    ],
  },
];
