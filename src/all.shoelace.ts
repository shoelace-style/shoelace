// This is a convenience file that exports everything and registers components automatically
import * as shoelace from './shoelace';

export * from './shoelace';

Object.keys(shoelace).map(key => {
  const item = (shoelace as any)[key];
  if (typeof item.register === 'function') {
    item.register();
  }
});
