import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const distanceFrontendPlugin = createPlugin({
  id: 'distance-frontend',
  routes: {
    root: rootRouteRef,
  },
});

export const DistanceFrontendPage = distanceFrontendPlugin.provide(
  createRoutableExtension({
    name: 'DistanceFrontendPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
