import { lazy } from 'preact/compat';

import Layout from '@/layout';
import { RecentArtifacts } from '@/pages';

import { fetchMarkdown } from '@/context/artifacts/helpers';

import { prioritySortRoutes, ROUTES } from './helper';
import { RouteConfig, RouteParams } from './types';

const Artifacts = lazy(() => import('@/pages/Artifacts'));
const SingleArtifact = lazy(() => import('@/pages/SingleArtifact'));

export const routes: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    component: Layout,
    children: prioritySortRoutes([
      {
        index: true,
        component: RecentArtifacts,
      },
      {
        path: ROUTES.ARTIFACTS,
        component: Artifacts,
      },
      {
        path: ROUTES.ARTIFACT,
        component: SingleArtifact,
        loader: async ({ params }: { params: RouteParams }) => {
          const data = await fetchMarkdown(params.id);
          return { artifactMarkdown: data };
        },
      },
    ]),
  },
];
