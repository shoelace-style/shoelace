import {
  popup_styles_default
} from "./chunk.2G3TDFQA.js";
import {
  o
} from "./chunk.KXNOOZ7Z.js";
import {
  ShoelaceElement,
  e,
  e2,
  i
} from "./chunk.ACZ6PQE4.js";
import {
  y
} from "./chunk.BNCM3323.js";
import {
  __decorateClass,
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk.WN26B4OP.js";

// node_modules/@floating-ui/core/dist/floating-ui.core.browser.min.mjs
function t(t2) {
  return t2.split("-")[0];
}
function e3(t2) {
  return t2.split("-")[1];
}
function n(e4) {
  return ["top", "bottom"].includes(t(e4)) ? "x" : "y";
}
function r(t2) {
  return "y" === t2 ? "height" : "width";
}
function i2(i4, o4, a3) {
  let { reference: l3, floating: s3 } = i4;
  const c3 = l3.x + l3.width / 2 - s3.width / 2, f3 = l3.y + l3.height / 2 - s3.height / 2, u3 = n(o4), m3 = r(u3), g3 = l3[m3] / 2 - s3[m3] / 2, d3 = "x" === u3;
  let p3;
  switch (t(o4)) {
    case "top":
      p3 = { x: c3, y: l3.y - s3.height };
      break;
    case "bottom":
      p3 = { x: c3, y: l3.y + l3.height };
      break;
    case "right":
      p3 = { x: l3.x + l3.width, y: f3 };
      break;
    case "left":
      p3 = { x: l3.x - s3.width, y: f3 };
      break;
    default:
      p3 = { x: l3.x, y: l3.y };
  }
  switch (e3(o4)) {
    case "start":
      p3[u3] -= g3 * (a3 && d3 ? -1 : 1);
      break;
    case "end":
      p3[u3] += g3 * (a3 && d3 ? -1 : 1);
  }
  return p3;
}
var o2 = async (t2, e4, n3) => {
  const { placement: r3 = "bottom", strategy: o4 = "absolute", middleware: a3 = [], platform: l3 } = n3, s3 = await (null == l3.isRTL ? void 0 : l3.isRTL(e4));
  let c3 = await l3.getElementRects({ reference: t2, floating: e4, strategy: o4 }), { x: f3, y: u3 } = i2(c3, r3, s3), m3 = r3, g3 = {}, d3 = 0;
  for (let n4 = 0; n4 < a3.length; n4++) {
    const { name: p3, fn: h3 } = a3[n4], { x: y4, y: x3, data: w3, reset: v3 } = await h3({ x: f3, y: u3, initialPlacement: r3, placement: m3, strategy: o4, middlewareData: g3, rects: c3, platform: l3, elements: { reference: t2, floating: e4 } });
    f3 = null != y4 ? y4 : f3, u3 = null != x3 ? x3 : u3, g3 = __spreadProps(__spreadValues({}, g3), { [p3]: __spreadValues(__spreadValues({}, g3[p3]), w3) }), v3 && d3 <= 50 && (d3++, "object" == typeof v3 && (v3.placement && (m3 = v3.placement), v3.rects && (c3 = true === v3.rects ? await l3.getElementRects({ reference: t2, floating: e4, strategy: o4 }) : v3.rects), { x: f3, y: u3 } = i2(c3, m3, s3)), n4 = -1);
  }
  return { x: f3, y: u3, placement: m3, strategy: o4, middlewareData: g3 };
};
function a(t2) {
  return "number" != typeof t2 ? function(t3) {
    return __spreadValues({ top: 0, right: 0, bottom: 0, left: 0 }, t3);
  }(t2) : { top: t2, right: t2, bottom: t2, left: t2 };
}
function l(t2) {
  return __spreadProps(__spreadValues({}, t2), { top: t2.y, left: t2.x, right: t2.x + t2.width, bottom: t2.y + t2.height });
}
async function s(t2, e4) {
  var n3;
  void 0 === e4 && (e4 = {});
  const { x: r3, y: i4, platform: o4, rects: s3, elements: c3, strategy: f3 } = t2, { boundary: u3 = "clippingAncestors", rootBoundary: m3 = "viewport", elementContext: g3 = "floating", altBoundary: d3 = false, padding: p3 = 0 } = e4, h3 = a(p3), y4 = c3[d3 ? "floating" === g3 ? "reference" : "floating" : g3], x3 = l(await o4.getClippingRect({ element: null == (n3 = await (null == o4.isElement ? void 0 : o4.isElement(y4))) || n3 ? y4 : y4.contextElement || await (null == o4.getDocumentElement ? void 0 : o4.getDocumentElement(c3.floating)), boundary: u3, rootBoundary: m3, strategy: f3 })), w3 = l(o4.convertOffsetParentRelativeRectToViewportRelativeRect ? await o4.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: "floating" === g3 ? __spreadProps(__spreadValues({}, s3.floating), { x: r3, y: i4 }) : s3.reference, offsetParent: await (null == o4.getOffsetParent ? void 0 : o4.getOffsetParent(c3.floating)), strategy: f3 }) : s3[g3]);
  return { top: x3.top - w3.top + h3.top, bottom: w3.bottom - x3.bottom + h3.bottom, left: x3.left - w3.left + h3.left, right: w3.right - x3.right + h3.right };
}
var c = Math.min;
var f = Math.max;
function u(t2, e4, n3) {
  return f(t2, c(e4, n3));
}
var m = (t2) => ({ name: "arrow", options: t2, async fn(i4) {
  const { element: o4, padding: l3 = 0 } = null != t2 ? t2 : {}, { x: s3, y: c3, placement: f3, rects: m3, platform: g3 } = i4;
  if (null == o4)
    return {};
  const d3 = a(l3), p3 = { x: s3, y: c3 }, h3 = n(f3), y4 = e3(f3), x3 = r(h3), w3 = await g3.getDimensions(o4), v3 = "y" === h3 ? "top" : "left", b3 = "y" === h3 ? "bottom" : "right", R2 = m3.reference[x3] + m3.reference[h3] - p3[h3] - m3.floating[x3], A = p3[h3] - m3.reference[h3], P2 = await (null == g3.getOffsetParent ? void 0 : g3.getOffsetParent(o4));
  let T3 = P2 ? "y" === h3 ? P2.clientHeight || 0 : P2.clientWidth || 0 : 0;
  0 === T3 && (T3 = m3.floating[x3]);
  const O2 = R2 / 2 - A / 2, L3 = d3[v3], D3 = T3 - w3[x3] - d3[b3], k2 = T3 / 2 - w3[x3] / 2 + O2, E3 = u(L3, k2, D3), C2 = ("start" === y4 ? d3[v3] : d3[b3]) > 0 && k2 !== E3 && m3.reference[x3] <= m3.floating[x3];
  return { [h3]: p3[h3] - (C2 ? k2 < L3 ? L3 - k2 : D3 - k2 : 0), data: { [h3]: E3, centerOffset: k2 - E3 } };
} });
var g = { left: "right", right: "left", bottom: "top", top: "bottom" };
function d(t2) {
  return t2.replace(/left|right|bottom|top/g, (t3) => g[t3]);
}
function p(t2, i4, o4) {
  void 0 === o4 && (o4 = false);
  const a3 = e3(t2), l3 = n(t2), s3 = r(l3);
  let c3 = "x" === l3 ? a3 === (o4 ? "end" : "start") ? "right" : "left" : "start" === a3 ? "bottom" : "top";
  return i4.reference[s3] > i4.floating[s3] && (c3 = d(c3)), { main: c3, cross: d(c3) };
}
var h = { start: "end", end: "start" };
function y2(t2) {
  return t2.replace(/start|end/g, (t3) => h[t3]);
}
var x = ["top", "right", "bottom", "left"];
var w = x.reduce((t2, e4) => t2.concat(e4, e4 + "-start", e4 + "-end"), []);
var b = function(e4) {
  return void 0 === e4 && (e4 = {}), { name: "flip", options: e4, async fn(n3) {
    var r3;
    const { placement: i4, middlewareData: o4, rects: a3, initialPlacement: l3, platform: c3, elements: f3 } = n3, _a = e4, { mainAxis: u3 = true, crossAxis: m3 = true, fallbackPlacements: g3, fallbackStrategy: h3 = "bestFit", flipAlignment: x3 = true } = _a, w3 = __objRest(_a, ["mainAxis", "crossAxis", "fallbackPlacements", "fallbackStrategy", "flipAlignment"]), v3 = t(i4), b3 = g3 || (v3 === l3 || !x3 ? [d(l3)] : function(t2) {
      const e5 = d(t2);
      return [y2(t2), e5, y2(e5)];
    }(l3)), R2 = [l3, ...b3], A = await s(n3, w3), P2 = [];
    let T3 = (null == (r3 = o4.flip) ? void 0 : r3.overflows) || [];
    if (u3 && P2.push(A[v3]), m3) {
      const { main: t2, cross: e5 } = p(i4, a3, await (null == c3.isRTL ? void 0 : c3.isRTL(f3.floating)));
      P2.push(A[t2], A[e5]);
    }
    if (T3 = [...T3, { placement: i4, overflows: P2 }], !P2.every((t2) => t2 <= 0)) {
      var O2, L3;
      const t2 = (null != (O2 = null == (L3 = o4.flip) ? void 0 : L3.index) ? O2 : 0) + 1, e5 = R2[t2];
      if (e5)
        return { data: { index: t2, overflows: T3 }, reset: { placement: e5 } };
      let n4 = "bottom";
      switch (h3) {
        case "bestFit": {
          var D3;
          const t3 = null == (D3 = T3.map((t4) => [t4, t4.overflows.filter((t5) => t5 > 0).reduce((t5, e6) => t5 + e6, 0)]).sort((t4, e6) => t4[1] - e6[1])[0]) ? void 0 : D3[0].placement;
          t3 && (n4 = t3);
          break;
        }
        case "initialPlacement":
          n4 = l3;
      }
      if (i4 !== n4)
        return { reset: { placement: n4 } };
    }
    return {};
  } };
};
var T = function(r3) {
  return void 0 === r3 && (r3 = 0), { name: "offset", options: r3, async fn(i4) {
    const { x: o4, y: a3 } = i4, l3 = await async function(r4, i5) {
      const { placement: o5, platform: a4, elements: l4 } = r4, s3 = await (null == a4.isRTL ? void 0 : a4.isRTL(l4.floating)), c3 = t(o5), f3 = e3(o5), u3 = "x" === n(o5), m3 = ["left", "top"].includes(c3) ? -1 : 1, g3 = s3 && u3 ? -1 : 1, d3 = "function" == typeof i5 ? i5(r4) : i5;
      let { mainAxis: p3, crossAxis: h3, alignmentAxis: y4 } = "number" == typeof d3 ? { mainAxis: d3, crossAxis: 0, alignmentAxis: null } : __spreadValues({ mainAxis: 0, crossAxis: 0, alignmentAxis: null }, d3);
      return f3 && "number" == typeof y4 && (h3 = "end" === f3 ? -1 * y4 : y4), u3 ? { x: h3 * g3, y: p3 * m3 } : { x: p3 * m3, y: h3 * g3 };
    }(i4, r3);
    return { x: o4 + l3.x, y: a3 + l3.y, data: l3 };
  } };
};
function O(t2) {
  return "x" === t2 ? "y" : "x";
}
var L = function(e4) {
  return void 0 === e4 && (e4 = {}), { name: "shift", options: e4, async fn(r3) {
    const { x: i4, y: o4, placement: a3 } = r3, _a = e4, { mainAxis: l3 = true, crossAxis: c3 = false, limiter: f3 = { fn: (t2) => {
      let { x: e5, y: n3 } = t2;
      return { x: e5, y: n3 };
    } } } = _a, m3 = __objRest(_a, ["mainAxis", "crossAxis", "limiter"]), g3 = { x: i4, y: o4 }, d3 = await s(r3, m3), p3 = n(t(a3)), h3 = O(p3);
    let y4 = g3[p3], x3 = g3[h3];
    if (l3) {
      const t2 = "y" === p3 ? "bottom" : "right";
      y4 = u(y4 + d3["y" === p3 ? "top" : "left"], y4, y4 - d3[t2]);
    }
    if (c3) {
      const t2 = "y" === h3 ? "bottom" : "right";
      x3 = u(x3 + d3["y" === h3 ? "top" : "left"], x3, x3 - d3[t2]);
    }
    const w3 = f3.fn(__spreadProps(__spreadValues({}, r3), { [p3]: y4, [h3]: x3 }));
    return __spreadProps(__spreadValues({}, w3), { data: { x: w3.x - i4, y: w3.y - o4 } });
  } };
};
var k = function(n3) {
  return void 0 === n3 && (n3 = {}), { name: "size", options: n3, async fn(r3) {
    const { placement: i4, rects: o4, platform: a3, elements: l3 } = r3, _a = n3, { apply: c3 = () => {
    } } = _a, u3 = __objRest(_a, ["apply"]), m3 = await s(r3, u3), g3 = t(i4), d3 = e3(i4);
    let p3, h3;
    "top" === g3 || "bottom" === g3 ? (p3 = g3, h3 = d3 === (await (null == a3.isRTL ? void 0 : a3.isRTL(l3.floating)) ? "start" : "end") ? "left" : "right") : (h3 = g3, p3 = "end" === d3 ? "top" : "bottom");
    const y4 = f(m3.left, 0), x3 = f(m3.right, 0), w3 = f(m3.top, 0), v3 = f(m3.bottom, 0), b3 = { availableHeight: o4.floating.height - (["left", "right"].includes(i4) ? 2 * (0 !== w3 || 0 !== v3 ? w3 + v3 : f(m3.top, m3.bottom)) : m3[p3]), availableWidth: o4.floating.width - (["top", "bottom"].includes(i4) ? 2 * (0 !== y4 || 0 !== x3 ? y4 + x3 : f(m3.left, m3.right)) : m3[h3]) };
    await c3(__spreadValues(__spreadValues({}, r3), b3));
    const R2 = await a3.getDimensions(l3.floating);
    return o4.floating.width !== R2.width || o4.floating.height !== R2.height ? { reset: { rects: true } } : {};
  } };
};

// node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.min.mjs
function n2(t2) {
  return t2 && t2.document && t2.location && t2.alert && t2.setInterval;
}
function o3(t2) {
  if (null == t2)
    return window;
  if (!n2(t2)) {
    const e4 = t2.ownerDocument;
    return e4 && e4.defaultView || window;
  }
  return t2;
}
function i3(t2) {
  return o3(t2).getComputedStyle(t2);
}
function r2(t2) {
  return n2(t2) ? "" : t2 ? (t2.nodeName || "").toLowerCase() : "";
}
function l2() {
  const t2 = navigator.userAgentData;
  return null != t2 && t2.brands ? t2.brands.map((t3) => t3.brand + "/" + t3.version).join(" ") : navigator.userAgent;
}
function c2(t2) {
  return t2 instanceof o3(t2).HTMLElement;
}
function f2(t2) {
  return t2 instanceof o3(t2).Element;
}
function s2(t2) {
  if ("undefined" == typeof ShadowRoot)
    return false;
  return t2 instanceof o3(t2).ShadowRoot || t2 instanceof ShadowRoot;
}
function u2(t2) {
  const { overflow: e4, overflowX: n3, overflowY: o4 } = i3(t2);
  return /auto|scroll|overlay|hidden/.test(e4 + o4 + n3);
}
function d2(t2) {
  return ["table", "td", "th"].includes(r2(t2));
}
function h2(t2) {
  const e4 = /firefox/i.test(l2()), n3 = i3(t2);
  return "none" !== n3.transform || "none" !== n3.perspective || "paint" === n3.contain || ["transform", "perspective"].includes(n3.willChange) || e4 && "filter" === n3.willChange || e4 && !!n3.filter && "none" !== n3.filter;
}
function a2() {
  return !/^((?!chrome|android).)*safari/i.test(l2());
}
var g2 = Math.min;
var p2 = Math.max;
var m2 = Math.round;
function w2(t2, e4, n3) {
  var i4, r3, l3, s3;
  void 0 === e4 && (e4 = false), void 0 === n3 && (n3 = false);
  const u3 = t2.getBoundingClientRect();
  let d3 = 1, h3 = 1;
  e4 && c2(t2) && (d3 = t2.offsetWidth > 0 && m2(u3.width) / t2.offsetWidth || 1, h3 = t2.offsetHeight > 0 && m2(u3.height) / t2.offsetHeight || 1);
  const g3 = f2(t2) ? o3(t2) : window, p3 = !a2() && n3, w3 = (u3.left + (p3 && null != (i4 = null == (r3 = g3.visualViewport) ? void 0 : r3.offsetLeft) ? i4 : 0)) / d3, v3 = (u3.top + (p3 && null != (l3 = null == (s3 = g3.visualViewport) ? void 0 : s3.offsetTop) ? l3 : 0)) / h3, y4 = u3.width / d3, x3 = u3.height / h3;
  return { width: y4, height: x3, top: v3, right: w3 + y4, bottom: v3 + x3, left: w3, x: w3, y: v3 };
}
function v2(t2) {
  return (e4 = t2, (e4 instanceof o3(e4).Node ? t2.ownerDocument : t2.document) || window.document).documentElement;
  var e4;
}
function y3(t2) {
  return f2(t2) ? { scrollLeft: t2.scrollLeft, scrollTop: t2.scrollTop } : { scrollLeft: t2.pageXOffset, scrollTop: t2.pageYOffset };
}
function x2(t2) {
  return w2(v2(t2)).left + y3(t2).scrollLeft;
}
function b2(t2, e4, n3) {
  const o4 = c2(e4), i4 = v2(e4), l3 = w2(t2, o4 && function(t3) {
    const e5 = w2(t3);
    return m2(e5.width) !== t3.offsetWidth || m2(e5.height) !== t3.offsetHeight;
  }(e4), "fixed" === n3);
  let f3 = { scrollLeft: 0, scrollTop: 0 };
  const s3 = { x: 0, y: 0 };
  if (o4 || !o4 && "fixed" !== n3)
    if (("body" !== r2(e4) || u2(i4)) && (f3 = y3(e4)), c2(e4)) {
      const t3 = w2(e4, true);
      s3.x = t3.x + e4.clientLeft, s3.y = t3.y + e4.clientTop;
    } else
      i4 && (s3.x = x2(i4));
  return { x: l3.left + f3.scrollLeft - s3.x, y: l3.top + f3.scrollTop - s3.y, width: l3.width, height: l3.height };
}
function L2(t2) {
  return "html" === r2(t2) ? t2 : t2.assignedSlot || t2.parentNode || (s2(t2) ? t2.host : null) || v2(t2);
}
function R(t2) {
  return c2(t2) && "fixed" !== i3(t2).position ? t2.offsetParent : null;
}
function T2(t2) {
  const e4 = o3(t2);
  let n3 = R(t2);
  for (; n3 && d2(n3) && "static" === i3(n3).position; )
    n3 = R(n3);
  return n3 && ("html" === r2(n3) || "body" === r2(n3) && "static" === i3(n3).position && !h2(n3)) ? e4 : n3 || function(t3) {
    let e5 = L2(t3);
    for (s2(e5) && (e5 = e5.host); c2(e5) && !["html", "body"].includes(r2(e5)); ) {
      if (h2(e5))
        return e5;
      {
        const t4 = e5.parentNode;
        e5 = s2(t4) ? t4.host : t4;
      }
    }
    return null;
  }(t2) || e4;
}
function W(t2) {
  if (c2(t2))
    return { width: t2.offsetWidth, height: t2.offsetHeight };
  const e4 = w2(t2);
  return { width: e4.width, height: e4.height };
}
function E2(t2) {
  const e4 = L2(t2);
  return ["html", "body", "#document"].includes(r2(e4)) ? t2.ownerDocument.body : c2(e4) && u2(e4) ? e4 : E2(e4);
}
function H(t2, e4) {
  var n3;
  void 0 === e4 && (e4 = []);
  const i4 = E2(t2), r3 = i4 === (null == (n3 = t2.ownerDocument) ? void 0 : n3.body), l3 = o3(i4), c3 = r3 ? [l3].concat(l3.visualViewport || [], u2(i4) ? i4 : []) : i4, f3 = e4.concat(c3);
  return r3 ? f3 : f3.concat(H(c3));
}
function C(e4, n3, r3) {
  return "viewport" === n3 ? l(function(t2, e5) {
    const n4 = o3(t2), i4 = v2(t2), r4 = n4.visualViewport;
    let l3 = i4.clientWidth, c3 = i4.clientHeight, f3 = 0, s3 = 0;
    if (r4) {
      l3 = r4.width, c3 = r4.height;
      const t3 = a2();
      (t3 || !t3 && "fixed" === e5) && (f3 = r4.offsetLeft, s3 = r4.offsetTop);
    }
    return { width: l3, height: c3, x: f3, y: s3 };
  }(e4, r3)) : f2(n3) ? function(t2, e5) {
    const n4 = w2(t2, false, "fixed" === e5), o4 = n4.top + t2.clientTop, i4 = n4.left + t2.clientLeft;
    return { top: o4, left: i4, x: i4, y: o4, right: i4 + t2.clientWidth, bottom: o4 + t2.clientHeight, width: t2.clientWidth, height: t2.clientHeight };
  }(n3, r3) : l(function(t2) {
    var e5;
    const n4 = v2(t2), o4 = y3(t2), r4 = null == (e5 = t2.ownerDocument) ? void 0 : e5.body, l3 = p2(n4.scrollWidth, n4.clientWidth, r4 ? r4.scrollWidth : 0, r4 ? r4.clientWidth : 0), c3 = p2(n4.scrollHeight, n4.clientHeight, r4 ? r4.scrollHeight : 0, r4 ? r4.clientHeight : 0);
    let f3 = -o4.scrollLeft + x2(t2);
    const s3 = -o4.scrollTop;
    return "rtl" === i3(r4 || n4).direction && (f3 += p2(n4.clientWidth, r4 ? r4.clientWidth : 0) - l3), { width: l3, height: c3, x: f3, y: s3 };
  }(v2(e4)));
}
function D2(t2) {
  const e4 = H(t2), n3 = ["absolute", "fixed"].includes(i3(t2).position) && c2(t2) ? T2(t2) : t2;
  return f2(n3) ? e4.filter((t3) => f2(t3) && function(t4, e5) {
    const n4 = null == e5.getRootNode ? void 0 : e5.getRootNode();
    if (t4.contains(e5))
      return true;
    if (n4 && s2(n4)) {
      let n5 = e5;
      do {
        if (n5 && t4 === n5)
          return true;
        n5 = n5.parentNode || n5.host;
      } while (n5);
    }
    return false;
  }(t3, n3) && "body" !== r2(t3)) : [];
}
var N = { getClippingRect: function(t2) {
  let { element: e4, boundary: n3, rootBoundary: o4, strategy: i4 } = t2;
  const r3 = [..."clippingAncestors" === n3 ? D2(e4) : [].concat(n3), o4], l3 = r3[0], c3 = r3.reduce((t3, n4) => {
    const o5 = C(e4, n4, i4);
    return t3.top = p2(o5.top, t3.top), t3.right = g2(o5.right, t3.right), t3.bottom = g2(o5.bottom, t3.bottom), t3.left = p2(o5.left, t3.left), t3;
  }, C(e4, l3, i4));
  return { width: c3.right - c3.left, height: c3.bottom - c3.top, x: c3.left, y: c3.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(t2) {
  let { rect: e4, offsetParent: n3, strategy: o4 } = t2;
  const i4 = c2(n3), l3 = v2(n3);
  if (n3 === l3)
    return e4;
  let f3 = { scrollLeft: 0, scrollTop: 0 };
  const s3 = { x: 0, y: 0 };
  if ((i4 || !i4 && "fixed" !== o4) && (("body" !== r2(n3) || u2(l3)) && (f3 = y3(n3)), c2(n3))) {
    const t3 = w2(n3, true);
    s3.x = t3.x + n3.clientLeft, s3.y = t3.y + n3.clientTop;
  }
  return __spreadProps(__spreadValues({}, e4), { x: e4.x - f3.scrollLeft + s3.x, y: e4.y - f3.scrollTop + s3.y });
}, isElement: f2, getDimensions: W, getOffsetParent: T2, getDocumentElement: v2, getElementRects: (t2) => {
  let { reference: e4, floating: n3, strategy: o4 } = t2;
  return { reference: b2(e4, T2(n3), o4), floating: __spreadProps(__spreadValues({}, W(n3)), { x: 0, y: 0 }) };
}, getClientRects: (t2) => Array.from(t2.getClientRects()), isRTL: (t2) => "rtl" === i3(t2).direction };
function S(t2, e4, n3, o4) {
  void 0 === o4 && (o4 = {});
  const { ancestorScroll: i4 = true, ancestorResize: r3 = true, elementResize: l3 = true, animationFrame: c3 = false } = o4, s3 = i4 && !c3, u3 = r3 && !c3, d3 = s3 || u3 ? [...f2(t2) ? H(t2) : [], ...H(e4)] : [];
  d3.forEach((t3) => {
    s3 && t3.addEventListener("scroll", n3, { passive: true }), u3 && t3.addEventListener("resize", n3);
  });
  let h3, a3 = null;
  if (l3) {
    let o5 = true;
    a3 = new ResizeObserver(() => {
      o5 || n3(), o5 = false;
    }), f2(t2) && !c3 && a3.observe(t2), a3.observe(e4);
  }
  let g3 = c3 ? w2(t2) : null;
  return c3 && function e5() {
    const o5 = w2(t2);
    !g3 || o5.x === g3.x && o5.y === g3.y && o5.width === g3.width && o5.height === g3.height || n3();
    g3 = o5, h3 = requestAnimationFrame(e5);
  }(), n3(), () => {
    var t3;
    d3.forEach((t4) => {
      s3 && t4.removeEventListener("scroll", n3), u3 && t4.removeEventListener("resize", n3);
    }), null == (t3 = a3) || t3.disconnect(), a3 = null, c3 && cancelAnimationFrame(h3);
  };
}
var z = (t2, n3, o4) => o2(t2, n3, __spreadValues({ platform: N }, o4));

// src/components/popup/popup.ts
var SlPopup = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.active = false;
    this.placement = "top";
    this.strategy = "absolute";
    this.distance = 0;
    this.skidding = 0;
    this.arrow = false;
    this.arrowPlacement = "anchor";
    this.arrowPadding = 10;
    this.flip = false;
    this.flipFallbackPlacements = "";
    this.flipFallbackStrategy = "initial";
    this.flipPadding = 0;
    this.shift = false;
    this.shiftPadding = 0;
    this.autoSizePadding = 0;
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    this.start();
  }
  disconnectedCallback() {
    this.stop();
  }
  async handleAnchorChange() {
    await this.stop();
    if (this.anchor && typeof this.anchor === "string") {
      const root = this.getRootNode();
      this.anchorEl = root.getElementById(this.anchor);
    } else if (this.anchor instanceof HTMLElement) {
      this.anchorEl = this.anchor;
    } else {
      this.anchorEl = this.querySelector('[slot="anchor"]');
    }
    if (this.anchorEl instanceof HTMLSlotElement) {
      this.anchorEl = this.anchorEl.assignedElements({ flatten: true })[0];
    }
    if (!this.anchorEl) {
      throw new Error(
        "Invalid anchor element: no anchor could be found using the anchor slot or the anchor attribute."
      );
    }
    this.start();
  }
  start() {
    if (!this.anchorEl) {
      return;
    }
    this.cleanup = S(this.anchorEl, this.popup, () => {
      this.reposition();
    });
  }
  async stop() {
    return new Promise((resolve) => {
      if (this.cleanup) {
        this.cleanup();
        this.cleanup = void 0;
        this.removeAttribute("data-current-placement");
        this.style.removeProperty("--auto-size-available-width");
        this.style.removeProperty("--auto-size-available-height");
        requestAnimationFrame(() => resolve());
      } else {
        resolve();
      }
    });
  }
  async updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has("active")) {
      if (this.active) {
        this.start();
      } else {
        this.stop();
      }
    }
    if (changedProps.has("anchor")) {
      this.handleAnchorChange();
    }
    if (this.active) {
      await this.updateComplete;
      this.reposition();
    }
  }
  reposition() {
    if (!this.active || !this.anchorEl) {
      return;
    }
    const middleware = [
      T({ mainAxis: this.distance, crossAxis: this.skidding })
    ];
    if (this.sync) {
      middleware.push(
        k({
          apply: ({ rects }) => {
            const syncWidth = this.sync === "width" || this.sync === "both";
            const syncHeight = this.sync === "height" || this.sync === "both";
            this.popup.style.width = syncWidth ? `${rects.reference.width}px` : "";
            this.popup.style.height = syncHeight ? `${rects.reference.height}px` : "";
          }
        })
      );
    } else {
      this.popup.style.width = "";
      this.popup.style.height = "";
    }
    if (this.flip) {
      middleware.push(
        b({
          boundary: this.flipBoundary,
          fallbackPlacements: this.flipFallbackPlacements,
          fallbackStrategy: this.flipFallbackStrategy === "best-fit" ? "bestFit" : "initialPlacement",
          padding: this.flipPadding
        })
      );
    }
    if (this.shift) {
      middleware.push(
        L({
          boundary: this.shiftBoundary,
          padding: this.shiftPadding
        })
      );
    }
    if (this.autoSize) {
      middleware.push(
        k({
          boundary: this.autoSizeBoundary,
          padding: this.autoSizePadding,
          apply: ({ availableWidth, availableHeight }) => {
            if (this.autoSize === "vertical" || this.autoSize === "both") {
              this.style.setProperty("--auto-size-available-height", `${availableHeight}px`);
            } else {
              this.style.removeProperty("--auto-size-available-height");
            }
            if (this.autoSize === "horizontal" || this.autoSize === "both") {
              this.style.setProperty("--auto-size-available-width", `${availableWidth}px`);
            } else {
              this.style.removeProperty("--auto-size-available-width");
            }
          }
        })
      );
    } else {
      this.style.removeProperty("--auto-size-available-width");
      this.style.removeProperty("--auto-size-available-height");
    }
    if (this.arrow) {
      middleware.push(
        m({
          element: this.arrowEl,
          padding: this.arrowPadding
        })
      );
    }
    z(this.anchorEl, this.popup, {
      placement: this.placement,
      middleware,
      strategy: this.strategy
    }).then(({ x: x3, y: y4, middlewareData, placement }) => {
      const isRtl = getComputedStyle(this).direction === "rtl";
      const staticSide = { top: "bottom", right: "left", bottom: "top", left: "right" }[placement.split("-")[0]];
      this.setAttribute("data-current-placement", placement);
      Object.assign(this.popup.style, {
        left: `${x3}px`,
        top: `${y4}px`
      });
      if (this.arrow) {
        const arrowX = middlewareData.arrow.x;
        const arrowY = middlewareData.arrow.y;
        let top = "";
        let right = "";
        let bottom = "";
        let left = "";
        if (this.arrowPlacement === "start") {
          const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          top = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          right = isRtl ? value : "";
          left = isRtl ? "" : value;
        } else if (this.arrowPlacement === "end") {
          const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          right = isRtl ? "" : value;
          left = isRtl ? value : "";
          bottom = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
        } else if (this.arrowPlacement === "center") {
          left = typeof arrowX === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
          top = typeof arrowY === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
        } else {
          left = typeof arrowX === "number" ? `${arrowX}px` : "";
          top = typeof arrowY === "number" ? `${arrowY}px` : "";
        }
        Object.assign(this.arrowEl.style, {
          top,
          right,
          bottom,
          left,
          [staticSide]: "calc(var(--arrow-size-diagonal) * -1)"
        });
      }
    });
    this.emit("sl-reposition");
  }
  render() {
    return y`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <div
        part="popup"
        class=${o({
      popup: true,
      "popup--active": this.active,
      "popup--fixed": this.strategy === "fixed",
      "popup--has-arrow": this.arrow
    })}
      >
        <slot></slot>
        ${this.arrow ? y`<div part="arrow" class="popup__arrow" role="presentation"></div>` : ""}
      </div>
    `;
  }
};
SlPopup.styles = popup_styles_default;
__decorateClass([
  i(".popup")
], SlPopup.prototype, "popup", 2);
__decorateClass([
  i(".popup__arrow")
], SlPopup.prototype, "arrowEl", 2);
__decorateClass([
  e2()
], SlPopup.prototype, "anchor", 2);
__decorateClass([
  e2({ type: Boolean, reflect: true })
], SlPopup.prototype, "active", 2);
__decorateClass([
  e2({ reflect: true })
], SlPopup.prototype, "placement", 2);
__decorateClass([
  e2({ reflect: true })
], SlPopup.prototype, "strategy", 2);
__decorateClass([
  e2({ type: Number })
], SlPopup.prototype, "distance", 2);
__decorateClass([
  e2({ type: Number })
], SlPopup.prototype, "skidding", 2);
__decorateClass([
  e2({ type: Boolean })
], SlPopup.prototype, "arrow", 2);
__decorateClass([
  e2({ attribute: "arrow-placement" })
], SlPopup.prototype, "arrowPlacement", 2);
__decorateClass([
  e2({ attribute: "arrow-padding", type: Number })
], SlPopup.prototype, "arrowPadding", 2);
__decorateClass([
  e2({ type: Boolean })
], SlPopup.prototype, "flip", 2);
__decorateClass([
  e2({
    attribute: "flip-fallback-placements",
    converter: {
      fromAttribute: (value) => {
        return value.split(" ").map((p3) => p3.trim()).filter((p3) => p3 !== "");
      },
      toAttribute: (value) => {
        return value.join(" ");
      }
    }
  })
], SlPopup.prototype, "flipFallbackPlacements", 2);
__decorateClass([
  e2({ attribute: "flip-fallback-strategy" })
], SlPopup.prototype, "flipFallbackStrategy", 2);
__decorateClass([
  e2({ type: Object })
], SlPopup.prototype, "flipBoundary", 2);
__decorateClass([
  e2({ attribute: "flip-padding", type: Number })
], SlPopup.prototype, "flipPadding", 2);
__decorateClass([
  e2({ type: Boolean })
], SlPopup.prototype, "shift", 2);
__decorateClass([
  e2({ type: Object })
], SlPopup.prototype, "shiftBoundary", 2);
__decorateClass([
  e2({ attribute: "shift-padding", type: Number })
], SlPopup.prototype, "shiftPadding", 2);
__decorateClass([
  e2({ attribute: "auto-size" })
], SlPopup.prototype, "autoSize", 2);
__decorateClass([
  e2()
], SlPopup.prototype, "sync", 2);
__decorateClass([
  e2({ type: Object })
], SlPopup.prototype, "autoSizeBoundary", 2);
__decorateClass([
  e2({ attribute: "auto-size-padding", type: Number })
], SlPopup.prototype, "autoSizePadding", 2);
SlPopup = __decorateClass([
  e("sl-popup")
], SlPopup);

export {
  SlPopup
};
