import {
  w,
  y
} from "./chunk.BNCM3323.js";

// node_modules/lit-html/static.js
var e = Symbol.for("");
var l = (t) => {
  if ((null == t ? void 0 : t.r) === e)
    return null == t ? void 0 : t._$litStatic$;
};
var i = (t, ...r) => ({ _$litStatic$: r.reduce((r2, e2, l2) => r2 + ((t2) => {
  if (void 0 !== t2._$litStatic$)
    return t2._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t2}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(e2) + t[l2 + 1], t[0]), r: e });
var s = /* @__PURE__ */ new Map();
var a = (t) => (r, ...e2) => {
  const o = e2.length;
  let i2, a2;
  const n2 = [], u2 = [];
  let c, $ = 0, f = false;
  for (; $ < o; ) {
    for (c = r[$]; $ < o && void 0 !== (a2 = e2[$], i2 = l(a2)); )
      c += i2 + r[++$], f = true;
    u2.push(a2), n2.push(c), $++;
  }
  if ($ === o && n2.push(r[o]), f) {
    const t2 = n2.join("$$lit$$");
    void 0 === (r = s.get(t2)) && (n2.raw = n2, s.set(t2, r = n2)), e2 = u2;
  }
  return t(r, ...e2);
};
var n = a(y);
var u = a(w);

export {
  i,
  n
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
