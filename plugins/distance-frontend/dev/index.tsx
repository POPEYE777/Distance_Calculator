import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { distanceFrontendPlugin, DistanceFrontendPage } from '../src/plugin';

createDevApp()
  .registerPlugin(distanceFrontendPlugin)
  .addPage({
    element: <DistanceFrontendPage />,
    title: 'Root Page',
    path: '/distance-frontend',
  })
  .render();
