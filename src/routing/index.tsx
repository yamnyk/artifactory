import { Route, Routes } from 'react-router';

import { Artifacts, RecentArtifacts } from '@/pages';

import { ROUTES } from './helper.ts';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<RecentArtifacts />} />
      <Route path={ROUTES.ARTIFACTS} element={<Artifacts />} />
    </Routes>
  );
};

export default AppRoutes;
