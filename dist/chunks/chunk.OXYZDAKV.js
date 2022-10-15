import {
  e,
  i,
  t
} from "./chunk.2JQPDYNA.js";
import {
  L,
  b,
  x
} from "./chunk.BNCM3323.js";

// node_modules/lit-html/directive-helpers.js
var { I: l } = L;
var e2 = (o) => void 0 === o.strings;
var f = {};
var s = (o, l3 = f) => o._$AH = l3;

// node_modules/lit-html/directives/live.js
var l2 = e(class extends i {
  constructor(r) {
    if (super(r), r.type !== t.PROPERTY && r.type !== t.ATTRIBUTE && r.type !== t.BOOLEAN_ATTRIBUTE)
      throw Error("The `live` directive is not allowed on child or event bindings");
    if (!e2(r))
      throw Error("`live` bindings can only contain a single expression");
  }
  render(r) {
    return r;
  }
  update(i2, [t2]) {
    if (t2 === x || t2 === b)
      return t2;
    const o = i2.element, l3 = i2.name;
    if (i2.type === t.PROPERTY) {
      if (t2 === o[l3])
        return x;
    } else if (i2.type === t.BOOLEAN_ATTRIBUTE) {
      if (!!t2 === o.hasAttribute(l3))
        return x;
    } else if (i2.type === t.ATTRIBUTE && o.getAttribute(l3) === t2 + "")
      return x;
    return s(i2), t2;
  }
});

export {
  l2 as l
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
