// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'C:/Development/ZpxWeb_antd/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.jsx').default,
    "routes": [
      {
        "path": "/Apartment",
        "exact": true,
        "component": require('@/pages/Apartment.js').default
      },
      {
        "path": "/Asset",
        "exact": true,
        "component": require('@/pages/Asset.js').default
      },
      {
        "path": "/eCommerce",
        "exact": true,
        "component": require('@/pages/eCommerce.js').default
      },
      {
        "path": "/Food",
        "exact": true,
        "component": require('@/pages/Food.js').default
      },
      {
        "path": "/Gallery",
        "exact": true,
        "component": require('@/pages/Gallery.js').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('@/pages/index.js').default
      },
      {
        "path": "/Markets",
        "exact": true,
        "component": require('@/pages/Markets.js').default
      },
      {
        "path": "/Office",
        "exact": true,
        "component": require('@/pages/Office.js').default
      },
      {
        "path": "/Packagelocker",
        "exact": true,
        "component": require('@/pages/Packagelocker.js').default
      },
      {
        "path": "/School",
        "exact": true,
        "component": require('@/pages/School.js').default
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
