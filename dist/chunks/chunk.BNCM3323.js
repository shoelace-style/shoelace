// node_modules/@lit/reactive-element/css-tag.js
var t = window;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var n = /* @__PURE__ */ new WeakMap();
var o = class {
  constructor(t3, e4, n5) {
    if (this._$cssResult$ = true, n5 !== s)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3, this.t = e4;
  }
  get styleSheet() {
    let t3 = this.o;
    const s5 = this.t;
    if (e && void 0 === t3) {
      const e4 = void 0 !== s5 && 1 === s5.length;
      e4 && (t3 = n.get(s5)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e4 && n.set(s5, t3));
    }
    return t3;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t3) => new o("string" == typeof t3 ? t3 : t3 + "", void 0, s);
var i = (t3, ...e4) => {
  const n5 = 1 === t3.length ? t3[0] : e4.reduce((e5, s5, n6) => e5 + ((t4) => {
    if (true === t4._$cssResult$)
      return t4.cssText;
    if ("number" == typeof t4)
      return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t3[n6 + 1], t3[0]);
  return new o(n5, t3, s);
};
var S = (s5, n5) => {
  e ? s5.adoptedStyleSheets = n5.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n5.forEach((e4) => {
    const n6 = document.createElement("style"), o5 = t.litNonce;
    void 0 !== o5 && n6.setAttribute("nonce", o5), n6.textContent = e4.cssText, s5.appendChild(n6);
  });
};
var c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e4 = "";
  for (const s5 of t4.cssRules)
    e4 += s5.cssText;
  return r(e4);
})(t3) : t3;

// node_modules/@lit/reactive-element/reactive-element.js
var s2;
var e2 = window;
var r2 = e2.trustedTypes;
var h = r2 ? r2.emptyScript : "";
var o2 = e2.reactiveElementPolyfillSupport;
var n2 = { toAttribute(t3, i3) {
  switch (i3) {
    case Boolean:
      t3 = t3 ? h : null;
      break;
    case Object:
    case Array:
      t3 = null == t3 ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, i3) {
  let s5 = t3;
  switch (i3) {
    case Boolean:
      s5 = null !== t3;
      break;
    case Number:
      s5 = null === t3 ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        s5 = JSON.parse(t3);
      } catch (t4) {
        s5 = null;
      }
  }
  return s5;
} };
var a = (t3, i3) => i3 !== t3 && (i3 == i3 || t3 == t3);
var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
var d = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
  }
  static addInitializer(t3) {
    var i3;
    null !== (i3 = this.h) && void 0 !== i3 || (this.h = []), this.h.push(t3);
  }
  static get observedAttributes() {
    this.finalize();
    const t3 = [];
    return this.elementProperties.forEach((i3, s5) => {
      const e4 = this._$Ep(s5, i3);
      void 0 !== e4 && (this._$Ev.set(e4, s5), t3.push(e4));
    }), t3;
  }
  static createProperty(t3, i3 = l) {
    if (i3.state && (i3.attribute = false), this.finalize(), this.elementProperties.set(t3, i3), !i3.noAccessor && !this.prototype.hasOwnProperty(t3)) {
      const s5 = "symbol" == typeof t3 ? Symbol() : "__" + t3, e4 = this.getPropertyDescriptor(t3, s5, i3);
      void 0 !== e4 && Object.defineProperty(this.prototype, t3, e4);
    }
  }
  static getPropertyDescriptor(t3, i3, s5) {
    return { get() {
      return this[i3];
    }, set(e4) {
      const r4 = this[t3];
      this[i3] = e4, this.requestUpdate(t3, r4, s5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) || l;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t3 = Object.getPrototypeOf(this);
    if (t3.finalize(), this.elementProperties = new Map(t3.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t4 = this.properties, i3 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
      for (const s5 of i3)
        this.createProperty(s5, t4[s5]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i3) {
    const s5 = [];
    if (Array.isArray(i3)) {
      const e4 = new Set(i3.flat(1 / 0).reverse());
      for (const i4 of e4)
        s5.unshift(c(i4));
    } else
      void 0 !== i3 && s5.push(c(i3));
    return s5;
  }
  static _$Ep(t3, i3) {
    const s5 = i3.attribute;
    return false === s5 ? void 0 : "string" == typeof s5 ? s5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
  }
  u() {
    var t3;
    this._$E_ = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t3 = this.constructor.h) || void 0 === t3 || t3.forEach((t4) => t4(this));
  }
  addController(t3) {
    var i3, s5;
    (null !== (i3 = this._$ES) && void 0 !== i3 ? i3 : this._$ES = []).push(t3), void 0 !== this.renderRoot && this.isConnected && (null === (s5 = t3.hostConnected) || void 0 === s5 || s5.call(t3));
  }
  removeController(t3) {
    var i3;
    null === (i3 = this._$ES) || void 0 === i3 || i3.splice(this._$ES.indexOf(t3) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t3, i3) => {
      this.hasOwnProperty(i3) && (this._$Ei.set(i3, this[i3]), delete this[i3]);
    });
  }
  createRenderRoot() {
    var t3;
    const s5 = null !== (t3 = this.shadowRoot) && void 0 !== t3 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
    return S(s5, this.constructor.elementStyles), s5;
  }
  connectedCallback() {
    var t3;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
      var i3;
      return null === (i3 = t4.hostConnected) || void 0 === i3 ? void 0 : i3.call(t4);
    });
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var t3;
    null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
      var i3;
      return null === (i3 = t4.hostDisconnected) || void 0 === i3 ? void 0 : i3.call(t4);
    });
  }
  attributeChangedCallback(t3, i3, s5) {
    this._$AK(t3, s5);
  }
  _$EO(t3, i3, s5 = l) {
    var e4;
    const r4 = this.constructor._$Ep(t3, s5);
    if (void 0 !== r4 && true === s5.reflect) {
      const h3 = (void 0 !== (null === (e4 = s5.converter) || void 0 === e4 ? void 0 : e4.toAttribute) ? s5.converter : n2).toAttribute(i3, s5.type);
      this._$El = t3, null == h3 ? this.removeAttribute(r4) : this.setAttribute(r4, h3), this._$El = null;
    }
  }
  _$AK(t3, i3) {
    var s5;
    const e4 = this.constructor, r4 = e4._$Ev.get(t3);
    if (void 0 !== r4 && this._$El !== r4) {
      const t4 = e4.getPropertyOptions(r4), h3 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== (null === (s5 = t4.converter) || void 0 === s5 ? void 0 : s5.fromAttribute) ? t4.converter : n2;
      this._$El = r4, this[r4] = h3.fromAttribute(i3, t4.type), this._$El = null;
    }
  }
  requestUpdate(t3, i3, s5) {
    let e4 = true;
    void 0 !== t3 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || a)(this[t3], i3) ? (this._$AL.has(t3) || this._$AL.set(t3, i3), true === s5.reflect && this._$El !== t3 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t3, s5))) : e4 = false), !this.isUpdatePending && e4 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return null != t3 && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t3;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t4, i4) => this[i4] = t4), this._$Ei = void 0);
    let i3 = false;
    const s5 = this._$AL;
    try {
      i3 = this.shouldUpdate(s5), i3 ? (this.willUpdate(s5), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
        var i4;
        return null === (i4 = t4.hostUpdate) || void 0 === i4 ? void 0 : i4.call(t4);
      }), this.update(s5)) : this._$Ek();
    } catch (t4) {
      throw i3 = false, this._$Ek(), t4;
    }
    i3 && this._$AE(s5);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    var i3;
    null === (i3 = this._$ES) || void 0 === i3 || i3.forEach((t4) => {
      var i4;
      return null === (i4 = t4.hostUpdated) || void 0 === i4 ? void 0 : i4.call(t4);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    void 0 !== this._$EC && (this._$EC.forEach((t4, i3) => this._$EO(i3, this[i3], t4)), this._$EC = void 0), this._$Ek();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
d.finalized = true, d.elementProperties = /* @__PURE__ */ new Map(), d.elementStyles = [], d.shadowRootOptions = { mode: "open" }, null == o2 || o2({ ReactiveElement: d }), (null !== (s2 = e2.reactiveElementVersions) && void 0 !== s2 ? s2 : e2.reactiveElementVersions = []).push("1.4.1");

// node_modules/lit-html/lit-html.js
var t2;
var i2 = window;
var s3 = i2.trustedTypes;
var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
var o3 = `lit$${(Math.random() + "").slice(9)}$`;
var n3 = "?" + o3;
var l2 = `<${n3}>`;
var h2 = document;
var r3 = (t3 = "") => h2.createComment(t3);
var d2 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
var u = Array.isArray;
var c2 = (t3) => u(t3) || "function" == typeof (null == t3 ? void 0 : t3[Symbol.iterator]);
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var a2 = /-->/g;
var f = />/g;
var _ = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var m = /'/g;
var p = /"/g;
var $ = /^(?:script|style|textarea|title)$/i;
var g = (t3) => (i3, ...s5) => ({ _$litType$: t3, strings: i3, values: s5 });
var y = g(1);
var w = g(2);
var x = Symbol.for("lit-noChange");
var b = Symbol.for("lit-nothing");
var T = /* @__PURE__ */ new WeakMap();
var A = h2.createTreeWalker(h2, 129, null, false);
var E = (t3, i3) => {
  const s5 = t3.length - 1, n5 = [];
  let h3, r4 = 2 === i3 ? "<svg>" : "", d3 = v;
  for (let i4 = 0; i4 < s5; i4++) {
    const s6 = t3[i4];
    let e4, u3, c3 = -1, g2 = 0;
    for (; g2 < s6.length && (d3.lastIndex = g2, u3 = d3.exec(s6), null !== u3); )
      g2 = d3.lastIndex, d3 === v ? "!--" === u3[1] ? d3 = a2 : void 0 !== u3[1] ? d3 = f : void 0 !== u3[2] ? ($.test(u3[2]) && (h3 = RegExp("</" + u3[2], "g")), d3 = _) : void 0 !== u3[3] && (d3 = _) : d3 === _ ? ">" === u3[0] ? (d3 = null != h3 ? h3 : v, c3 = -1) : void 0 === u3[1] ? c3 = -2 : (c3 = d3.lastIndex - u3[2].length, e4 = u3[1], d3 = void 0 === u3[3] ? _ : '"' === u3[3] ? p : m) : d3 === p || d3 === m ? d3 = _ : d3 === a2 || d3 === f ? d3 = v : (d3 = _, h3 = void 0);
    const y2 = d3 === _ && t3[i4 + 1].startsWith("/>") ? " " : "";
    r4 += d3 === v ? s6 + l2 : c3 >= 0 ? (n5.push(e4), s6.slice(0, c3) + "$lit$" + s6.slice(c3) + o3 + y2) : s6 + o3 + (-2 === c3 ? (n5.push(void 0), i4) : y2);
  }
  const u2 = r4 + (t3[s5] || "<?>") + (2 === i3 ? "</svg>" : "");
  if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [void 0 !== e3 ? e3.createHTML(u2) : u2, n5];
};
var C = class {
  constructor({ strings: t3, _$litType$: i3 }, e4) {
    let l4;
    this.parts = [];
    let h3 = 0, d3 = 0;
    const u2 = t3.length - 1, c3 = this.parts, [v2, a3] = E(t3, i3);
    if (this.el = C.createElement(v2, e4), A.currentNode = this.el.content, 2 === i3) {
      const t4 = this.el.content, i4 = t4.firstChild;
      i4.remove(), t4.append(...i4.childNodes);
    }
    for (; null !== (l4 = A.nextNode()) && c3.length < u2; ) {
      if (1 === l4.nodeType) {
        if (l4.hasAttributes()) {
          const t4 = [];
          for (const i4 of l4.getAttributeNames())
            if (i4.endsWith("$lit$") || i4.startsWith(o3)) {
              const s5 = a3[d3++];
              if (t4.push(i4), void 0 !== s5) {
                const t5 = l4.getAttribute(s5.toLowerCase() + "$lit$").split(o3), i5 = /([.?@])?(.*)/.exec(s5);
                c3.push({ type: 1, index: h3, name: i5[2], strings: t5, ctor: "." === i5[1] ? M : "?" === i5[1] ? k : "@" === i5[1] ? H : S2 });
              } else
                c3.push({ type: 6, index: h3 });
            }
          for (const i4 of t4)
            l4.removeAttribute(i4);
        }
        if ($.test(l4.tagName)) {
          const t4 = l4.textContent.split(o3), i4 = t4.length - 1;
          if (i4 > 0) {
            l4.textContent = s3 ? s3.emptyScript : "";
            for (let s5 = 0; s5 < i4; s5++)
              l4.append(t4[s5], r3()), A.nextNode(), c3.push({ type: 2, index: ++h3 });
            l4.append(t4[i4], r3());
          }
        }
      } else if (8 === l4.nodeType)
        if (l4.data === n3)
          c3.push({ type: 2, index: h3 });
        else {
          let t4 = -1;
          for (; -1 !== (t4 = l4.data.indexOf(o3, t4 + 1)); )
            c3.push({ type: 7, index: h3 }), t4 += o3.length - 1;
        }
      h3++;
    }
  }
  static createElement(t3, i3) {
    const s5 = h2.createElement("template");
    return s5.innerHTML = t3, s5;
  }
};
function P(t3, i3, s5 = t3, e4) {
  var o5, n5, l4, h3;
  if (i3 === x)
    return i3;
  let r4 = void 0 !== e4 ? null === (o5 = s5._$Co) || void 0 === o5 ? void 0 : o5[e4] : s5._$Cl;
  const u2 = d2(i3) ? void 0 : i3._$litDirective$;
  return (null == r4 ? void 0 : r4.constructor) !== u2 && (null === (n5 = null == r4 ? void 0 : r4._$AO) || void 0 === n5 || n5.call(r4, false), void 0 === u2 ? r4 = void 0 : (r4 = new u2(t3), r4._$AT(t3, s5, e4)), void 0 !== e4 ? (null !== (l4 = (h3 = s5)._$Co) && void 0 !== l4 ? l4 : h3._$Co = [])[e4] = r4 : s5._$Cl = r4), void 0 !== r4 && (i3 = P(t3, r4._$AS(t3, i3.values), r4, e4)), i3;
}
var V = class {
  constructor(t3, i3) {
    this.u = [], this._$AN = void 0, this._$AD = t3, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t3) {
    var i3;
    const { el: { content: s5 }, parts: e4 } = this._$AD, o5 = (null !== (i3 = null == t3 ? void 0 : t3.creationScope) && void 0 !== i3 ? i3 : h2).importNode(s5, true);
    A.currentNode = o5;
    let n5 = A.nextNode(), l4 = 0, r4 = 0, d3 = e4[0];
    for (; void 0 !== d3; ) {
      if (l4 === d3.index) {
        let i4;
        2 === d3.type ? i4 = new N(n5, n5.nextSibling, this, t3) : 1 === d3.type ? i4 = new d3.ctor(n5, d3.name, d3.strings, this, t3) : 6 === d3.type && (i4 = new I(n5, this, t3)), this.u.push(i4), d3 = e4[++r4];
      }
      l4 !== (null == d3 ? void 0 : d3.index) && (n5 = A.nextNode(), l4++);
    }
    return o5;
  }
  p(t3) {
    let i3 = 0;
    for (const s5 of this.u)
      void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t3, s5, i3), i3 += s5.strings.length - 2) : s5._$AI(t3[i3])), i3++;
  }
};
var N = class {
  constructor(t3, i3, s5, e4) {
    var o5;
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t3, this._$AB = i3, this._$AM = s5, this.options = e4, this._$Cm = null === (o5 = null == e4 ? void 0 : e4.isConnected) || void 0 === o5 || o5;
  }
  get _$AU() {
    var t3, i3;
    return null !== (i3 = null === (t3 = this._$AM) || void 0 === t3 ? void 0 : t3._$AU) && void 0 !== i3 ? i3 : this._$Cm;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i3 = this._$AM;
    return void 0 !== i3 && 11 === t3.nodeType && (t3 = i3.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i3 = this) {
    t3 = P(this, t3, i3), d2(t3) ? t3 === b || null == t3 || "" === t3 ? (this._$AH !== b && this._$AR(), this._$AH = b) : t3 !== this._$AH && t3 !== x && this.g(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : c2(t3) ? this.k(t3) : this.g(t3);
  }
  O(t3, i3 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t3, i3);
  }
  T(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.O(t3));
  }
  g(t3) {
    this._$AH !== b && d2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(h2.createTextNode(t3)), this._$AH = t3;
  }
  $(t3) {
    var i3;
    const { values: s5, _$litType$: e4 } = t3, o5 = "number" == typeof e4 ? this._$AC(t3) : (void 0 === e4.el && (e4.el = C.createElement(e4.h, this.options)), e4);
    if ((null === (i3 = this._$AH) || void 0 === i3 ? void 0 : i3._$AD) === o5)
      this._$AH.p(s5);
    else {
      const t4 = new V(o5, this), i4 = t4.v(this.options);
      t4.p(s5), this.T(i4), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i3 = T.get(t3.strings);
    return void 0 === i3 && T.set(t3.strings, i3 = new C(t3)), i3;
  }
  k(t3) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s5, e4 = 0;
    for (const o5 of t3)
      e4 === i3.length ? i3.push(s5 = new N(this.O(r3()), this.O(r3()), this, this.options)) : s5 = i3[e4], s5._$AI(o5), e4++;
    e4 < i3.length && (this._$AR(s5 && s5._$AB.nextSibling, e4), i3.length = e4);
  }
  _$AR(t3 = this._$AA.nextSibling, i3) {
    var s5;
    for (null === (s5 = this._$AP) || void 0 === s5 || s5.call(this, false, true, i3); t3 && t3 !== this._$AB; ) {
      const i4 = t3.nextSibling;
      t3.remove(), t3 = i4;
    }
  }
  setConnected(t3) {
    var i3;
    void 0 === this._$AM && (this._$Cm = t3, null === (i3 = this._$AP) || void 0 === i3 || i3.call(this, t3));
  }
};
var S2 = class {
  constructor(t3, i3, s5, e4, o5) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t3, this.name = i3, this._$AM = e4, this.options = o5, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = b;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i3 = this, s5, e4) {
    const o5 = this.strings;
    let n5 = false;
    if (void 0 === o5)
      t3 = P(this, t3, i3, 0), n5 = !d2(t3) || t3 !== this._$AH && t3 !== x, n5 && (this._$AH = t3);
    else {
      const e5 = t3;
      let l4, h3;
      for (t3 = o5[0], l4 = 0; l4 < o5.length - 1; l4++)
        h3 = P(this, e5[s5 + l4], i3, l4), h3 === x && (h3 = this._$AH[l4]), n5 || (n5 = !d2(h3) || h3 !== this._$AH[l4]), h3 === b ? t3 = b : t3 !== b && (t3 += (null != h3 ? h3 : "") + o5[l4 + 1]), this._$AH[l4] = h3;
    }
    n5 && !e4 && this.j(t3);
  }
  j(t3) {
    t3 === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t3 ? t3 : "");
  }
};
var M = class extends S2 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t3) {
    this.element[this.name] = t3 === b ? void 0 : t3;
  }
};
var R = s3 ? s3.emptyScript : "";
var k = class extends S2 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t3) {
    t3 && t3 !== b ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
  }
};
var H = class extends S2 {
  constructor(t3, i3, s5, e4, o5) {
    super(t3, i3, s5, e4, o5), this.type = 5;
  }
  _$AI(t3, i3 = this) {
    var s5;
    if ((t3 = null !== (s5 = P(this, t3, i3, 0)) && void 0 !== s5 ? s5 : b) === x)
      return;
    const e4 = this._$AH, o5 = t3 === b && e4 !== b || t3.capture !== e4.capture || t3.once !== e4.once || t3.passive !== e4.passive, n5 = t3 !== b && (e4 === b || o5);
    o5 && this.element.removeEventListener(this.name, this, e4), n5 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i3, s5;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s5 = null === (i3 = this.options) || void 0 === i3 ? void 0 : i3.host) && void 0 !== s5 ? s5 : this.element, t3) : this._$AH.handleEvent(t3);
  }
};
var I = class {
  constructor(t3, i3, s5) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    P(this, t3);
  }
};
var L = { P: "$lit$", A: o3, M: n3, C: 1, L: E, R: V, D: c2, V: P, I: N, H: S2, N: k, U: H, B: M, F: I };
var z = i2.litHtmlPolyfillSupport;
null == z || z(C, N), (null !== (t2 = i2.litHtmlVersions) && void 0 !== t2 ? t2 : i2.litHtmlVersions = []).push("2.4.0");
var Z = (t3, i3, s5) => {
  var e4, o5;
  const n5 = null !== (e4 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== e4 ? e4 : i3;
  let l4 = n5._$litPart$;
  if (void 0 === l4) {
    const t4 = null !== (o5 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== o5 ? o5 : null;
    n5._$litPart$ = l4 = new N(i3.insertBefore(r3(), t4), t4, void 0, null != s5 ? s5 : {});
  }
  return l4._$AI(t3), l4;
};

// node_modules/lit-element/lit-element.js
var l3;
var o4;
var s4 = class extends d {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t3, e4;
    const i3 = super.createRenderRoot();
    return null !== (t3 = (e4 = this.renderOptions).renderBefore) && void 0 !== t3 || (e4.renderBefore = i3.firstChild), i3;
  }
  update(t3) {
    const i3 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Dt = Z(i3, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), null === (t3 = this._$Dt) || void 0 === t3 || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), null === (t3 = this._$Dt) || void 0 === t3 || t3.setConnected(false);
  }
  render() {
    return x;
  }
};
s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
var n4 = globalThis.litElementPolyfillSupport;
null == n4 || n4({ LitElement: s4 });
(null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.2.0");

export {
  i,
  n2 as n,
  y,
  w,
  x,
  b,
  L,
  s4 as s
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
