var path = require('path');
import { legacyPlugin } from '@web/dev-server-legacy';
export default {
  open: true,
  watch: true,
  devServer:{
	   contentBase: path.join(__dirname, 'docs'),
  }
  appIndex: '/index.html',
  nodeResolve: {
    exportConditions: ['development'],
    dedupe: true,
  },
  esbuildTarget: 'auto'
  
};