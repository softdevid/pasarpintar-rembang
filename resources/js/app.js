require('./bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/react'

createInertiaApp({
  title: (title) => `${title} | Pasar Pintar`,
  resolve: (name) => require(`./Pages/${name}`),
  progress: {
    color: '#29d',
    // color: 'orange',
  },
  setup({ el, App, props }) {
    return render(<App {...props} />, el);
  },
});

// // InertiaProgress.init({ color: '#4B5563' });
// InertiaProgress.init({ color: 'blue' });
