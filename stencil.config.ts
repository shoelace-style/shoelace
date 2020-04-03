import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';

export const config: Config = {
  namespace: 'Shoelace',
  globalStyle: 'src/styles/shoelace.scss',
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
    }),

    inlineSvg()
  ]
};
