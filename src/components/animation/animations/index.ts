import animatecss from './animatecss';
import animista from './animista';

const sortObject = (o: any) =>
  Object.keys(o)
    .sort()
    .reduce((r, k) => ((r[k] = o[k]), r), {});

export default {
  none: [],
  ...sortObject({ ...animatecss, ...animista })
};
