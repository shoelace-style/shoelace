import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'shoelace',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme',
      footer: ''
    },
    {
      type: 'www',
      serviceWorker: undefined // disable service workers
    }
  ],
  plugins: [
    sass({
      includePaths: ['./node_modules', './src/styles']
    })
  ]
};
