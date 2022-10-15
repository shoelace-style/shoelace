import {
  s
} from "./chunk.BNCM3323.js";
import {
  __decorateClass,
  __spreadProps,
  __spreadValues
} from "./chunk.WN26B4OP.js";

// node_modules/@lit/reactive-element/decorators/custom-element.js
var e = (e5) => (n2) => "function" == typeof n2 ? ((e6, n3) => (customElements.define(e6, n3), n3))(e5, n2) : ((e6, n3) => {
  const { kind: t2, elements: s2 } = n3;
  return { kind: t2, elements: s2, finisher(n4) {
    customElements.define(e6, n4);
  } };
})(e5, n2);

// node_modules/@lit/reactive-element/decorators/property.js
var i = (i3, e5) => "method" === e5.kind && e5.descriptor && !("value" in e5.descriptor) ? __spreadProps(__spreadValues({}, e5), { finisher(n2) {
  n2.createProperty(e5.key, i3);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e5.key, initializer() {
  "function" == typeof e5.initializer && (this[e5.key] = e5.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e5.key, i3);
} };
function e2(e5) {
  return (n2, t2) => void 0 !== t2 ? ((i3, e6, n3) => {
    e6.constructor.createProperty(n3, i3);
  })(e5, n2, t2) : i(e5, n2);
}

// node_modules/@lit/reactive-element/decorators/state.js
function t(t2) {
  return e2(__spreadProps(__spreadValues({}, t2), { state: true }));
}

// node_modules/@lit/reactive-element/decorators/base.js
var o = ({ finisher: e5, descriptor: t2 }) => (o2, n2) => {
  var r;
  if (void 0 === n2) {
    const n3 = null !== (r = o2.originalKey) && void 0 !== r ? r : o2.key, i3 = null != t2 ? { kind: "method", placement: "prototype", key: n3, descriptor: t2(o2.key) } : __spreadProps(__spreadValues({}, o2), { key: n3 });
    return null != e5 && (i3.finisher = function(t3) {
      e5(t3, n3);
    }), i3;
  }
  {
    const r2 = o2.constructor;
    void 0 !== t2 && Object.defineProperty(o2, n2, t2(n2)), null == e5 || e5(r2, n2);
  }
};

// node_modules/@lit/reactive-element/decorators/query.js
function i2(i3, n2) {
  return o({ descriptor: (o2) => {
    const t2 = { get() {
      var o3, n3;
      return null !== (n3 = null === (o3 = this.renderRoot) || void 0 === o3 ? void 0 : o3.querySelector(i3)) && void 0 !== n3 ? n3 : null;
    }, enumerable: true, configurable: true };
    if (n2) {
      const n3 = "symbol" == typeof o2 ? Symbol() : "__" + o2;
      t2.get = function() {
        var o3, t3;
        return void 0 === this[n3] && (this[n3] = null !== (t3 = null === (o3 = this.renderRoot) || void 0 === o3 ? void 0 : o3.querySelector(i3)) && void 0 !== t3 ? t3 : null), this[n3];
      };
    }
    return t2;
  } });
}

// node_modules/@lit/reactive-element/decorators/query-async.js
function e3(e5) {
  return o({ descriptor: (r) => ({ async get() {
    var r2;
    return await this.updateComplete, null === (r2 = this.renderRoot) || void 0 === r2 ? void 0 : r2.querySelector(e5);
  }, enumerable: true, configurable: true }) });
}

// node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var n;
var e4 = null != (null === (n = window.HTMLSlotElement) || void 0 === n ? void 0 : n.prototype.assignedElements) ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);

// src/internal/shoelace-element.ts
var ShoelaceElement = class extends s {
  emit(name, options) {
    const event = new CustomEvent(name, __spreadValues({
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {}
    }, options));
    this.dispatchEvent(event);
    return event;
  }
};
__decorateClass([
  e2()
], ShoelaceElement.prototype, "dir", 2);
__decorateClass([
  e2()
], ShoelaceElement.prototype, "lang", 2);

export {
  e,
  e2,
  t,
  i2 as i,
  e3,
  ShoelaceElement
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
