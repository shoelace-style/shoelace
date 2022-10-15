import {
  qr_code_styles_default
} from "./chunk.QWNVXS7S.js";
import {
  i as i2
} from "./chunk.EN5QK32J.js";
import {
  watch
} from "./chunk.HFHIZRKF.js";
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
  __decorateClass
} from "./chunk.WN26B4OP.js";

// node_modules/qr-creator/dist/qr-creator.es6.min.js
var G = null;
var H = class {
};
H.render = function(w, B) {
  G(w, B);
};
self.QrCreator = H;
(function(w) {
  function B(t, c, a, e3) {
    var b = {}, h = w(a, c);
    h.u(t);
    h.J();
    e3 = e3 || 0;
    var r = h.h(), d = h.h() + 2 * e3;
    b.text = t;
    b.level = c;
    b.version = a;
    b.O = d;
    b.a = function(b2, a2) {
      b2 -= e3;
      a2 -= e3;
      return 0 > b2 || b2 >= r || 0 > a2 || a2 >= r ? false : h.a(b2, a2);
    };
    return b;
  }
  function C(t, c, a, e3, b, h, r, d, g, x) {
    function u(b2, a2, f, c2, d2, r2, g2) {
      b2 ? (t.lineTo(a2 + r2, f + g2), t.arcTo(a2, f, c2, d2, h)) : t.lineTo(a2, f);
    }
    r ? t.moveTo(c + h, a) : t.moveTo(c, a);
    u(d, e3, a, e3, b, -h, 0);
    u(g, e3, b, c, b, 0, -h);
    u(x, c, b, c, a, h, 0);
    u(r, c, a, e3, a, 0, h);
  }
  function z(t, c, a, e3, b, h, r, d, g, x) {
    function u(b2, a2, c2, d2) {
      t.moveTo(b2 + c2, a2);
      t.lineTo(
        b2,
        a2
      );
      t.lineTo(b2, a2 + d2);
      t.arcTo(b2, a2, b2 + c2, a2, h);
    }
    r && u(c, a, h, h);
    d && u(e3, a, -h, h);
    g && u(e3, b, -h, -h);
    x && u(c, b, h, -h);
  }
  function A(t, c) {
    var a = c.fill;
    if ("string" === typeof a)
      t.fillStyle = a;
    else {
      var e3 = a.type, b = a.colorStops;
      a = a.position.map((b2) => Math.round(b2 * c.size));
      if ("linear-gradient" === e3)
        var h = t.createLinearGradient.apply(t, a);
      else if ("radial-gradient" === e3)
        h = t.createRadialGradient.apply(t, a);
      else
        throw Error("Unsupported fill");
      b.forEach(([b2, a2]) => {
        h.addColorStop(b2, a2);
      });
      t.fillStyle = h;
    }
  }
  function y2(t, c) {
    a: {
      var a = c.text, e3 = c.v, b = c.N, h = c.K, r = c.P;
      b = Math.max(1, b || 1);
      for (h = Math.min(40, h || 40); b <= h; b += 1)
        try {
          var d = B(a, e3, b, r);
          break a;
        } catch (J) {
        }
      d = void 0;
    }
    if (!d)
      return null;
    a = t.getContext("2d");
    c.background && (a.fillStyle = c.background, a.fillRect(c.left, c.top, c.size, c.size));
    e3 = d.O;
    h = c.size / e3;
    a.beginPath();
    for (r = 0; r < e3; r += 1)
      for (b = 0; b < e3; b += 1) {
        var g = a, x = c.left + b * h, u = c.top + r * h, p = r, q = b, f = d.a, k = x + h, m = u + h, D = p - 1, E = p + 1, n = q - 1, l = q + 1, y3 = Math.floor(Math.min(0.5, Math.max(0, c.R)) * h), v2 = f(p, q), I = f(D, n), w2 = f(D, q);
        D = f(D, l);
        var F = f(p, l);
        l = f(E, l);
        q = f(
          E,
          q
        );
        E = f(E, n);
        p = f(p, n);
        x = Math.round(x);
        u = Math.round(u);
        k = Math.round(k);
        m = Math.round(m);
        v2 ? C(g, x, u, k, m, y3, !w2 && !p, !w2 && !F, !q && !F, !q && !p) : z(g, x, u, k, m, y3, w2 && p && I, w2 && F && D, q && F && l, q && p && E);
      }
    A(a, c);
    a.fill();
    return t;
  }
  var v = { minVersion: 1, maxVersion: 40, ecLevel: "L", left: 0, top: 0, size: 200, fill: "#000", background: null, text: "no text", radius: 0.5, quiet: 0 };
  G = function(t, c) {
    var a = {};
    Object.assign(a, v, t);
    a.N = a.minVersion;
    a.K = a.maxVersion;
    a.v = a.ecLevel;
    a.left = a.left;
    a.top = a.top;
    a.size = a.size;
    a.fill = a.fill;
    a.background = a.background;
    a.text = a.text;
    a.R = a.radius;
    a.P = a.quiet;
    if (c instanceof HTMLCanvasElement) {
      if (c.width !== a.size || c.height !== a.size)
        c.width = a.size, c.height = a.size;
      c.getContext("2d").clearRect(0, 0, c.width, c.height);
      y2(c, a);
    } else
      t = document.createElement("canvas"), t.width = a.size, t.height = a.size, a = y2(t, a), c.appendChild(a);
  };
})(function() {
  function w(c) {
    var a = C.s(c);
    return { S: function() {
      return 4;
    }, b: function() {
      return a.length;
    }, write: function(c2) {
      for (var b = 0; b < a.length; b += 1)
        c2.put(a[b], 8);
    } };
  }
  function B() {
    var c = [], a = 0, e3 = {
      B: function() {
        return c;
      },
      c: function(b) {
        return 1 == (c[Math.floor(b / 8)] >>> 7 - b % 8 & 1);
      },
      put: function(b, h) {
        for (var a2 = 0; a2 < h; a2 += 1)
          e3.m(1 == (b >>> h - a2 - 1 & 1));
      },
      f: function() {
        return a;
      },
      m: function(b) {
        var h = Math.floor(a / 8);
        c.length <= h && c.push(0);
        b && (c[h] |= 128 >>> a % 8);
        a += 1;
      }
    };
    return e3;
  }
  function C(c, a) {
    function e3(b2, h2) {
      for (var a2 = -1; 7 >= a2; a2 += 1)
        if (!(-1 >= b2 + a2 || d <= b2 + a2))
          for (var c2 = -1; 7 >= c2; c2 += 1)
            -1 >= h2 + c2 || d <= h2 + c2 || (r[b2 + a2][h2 + c2] = 0 <= a2 && 6 >= a2 && (0 == c2 || 6 == c2) || 0 <= c2 && 6 >= c2 && (0 == a2 || 6 == a2) || 2 <= a2 && 4 >= a2 && 2 <= c2 && 4 >= c2 ? true : false);
    }
    function b(b2, a2) {
      for (var f = d = 4 * c + 17, k = Array(f), m = 0; m < f; m += 1) {
        k[m] = Array(f);
        for (var p = 0; p < f; p += 1)
          k[m][p] = null;
      }
      r = k;
      e3(0, 0);
      e3(d - 7, 0);
      e3(0, d - 7);
      f = y2.G(c);
      for (k = 0; k < f.length; k += 1)
        for (m = 0; m < f.length; m += 1) {
          p = f[k];
          var q = f[m];
          if (null == r[p][q])
            for (var n = -2; 2 >= n; n += 1)
              for (var l = -2; 2 >= l; l += 1)
                r[p + n][q + l] = -2 == n || 2 == n || -2 == l || 2 == l || 0 == n && 0 == l;
        }
      for (f = 8; f < d - 8; f += 1)
        null == r[f][6] && (r[f][6] = 0 == f % 2);
      for (f = 8; f < d - 8; f += 1)
        null == r[6][f] && (r[6][f] = 0 == f % 2);
      f = y2.w(h << 3 | a2);
      for (k = 0; 15 > k; k += 1)
        m = !b2 && 1 == (f >> k & 1), r[6 > k ? k : 8 > k ? k + 1 : d - 15 + k][8] = m, r[8][8 > k ? d - k - 1 : 9 > k ? 15 - k : 14 - k] = m;
      r[d - 8][8] = !b2;
      if (7 <= c) {
        f = y2.A(c);
        for (k = 0; 18 > k; k += 1)
          m = !b2 && 1 == (f >> k & 1), r[Math.floor(k / 3)][k % 3 + d - 8 - 3] = m;
        for (k = 0; 18 > k; k += 1)
          m = !b2 && 1 == (f >> k & 1), r[k % 3 + d - 8 - 3][Math.floor(k / 3)] = m;
      }
      if (null == g) {
        b2 = t.I(c, h);
        f = B();
        for (k = 0; k < x.length; k += 1)
          m = x[k], f.put(4, 4), f.put(m.b(), y2.f(4, c)), m.write(f);
        for (k = m = 0; k < b2.length; k += 1)
          m += b2[k].j;
        if (f.f() > 8 * m)
          throw Error("code length overflow. (" + f.f() + ">" + 8 * m + ")");
        for (f.f() + 4 <= 8 * m && f.put(0, 4); 0 != f.f() % 8; )
          f.m(false);
        for (; !(f.f() >= 8 * m); ) {
          f.put(236, 8);
          if (f.f() >= 8 * m)
            break;
          f.put(17, 8);
        }
        var u2 = 0;
        m = k = 0;
        p = Array(b2.length);
        q = Array(b2.length);
        for (n = 0; n < b2.length; n += 1) {
          var v2 = b2[n].j, w2 = b2[n].o - v2;
          k = Math.max(k, v2);
          m = Math.max(m, w2);
          p[n] = Array(v2);
          for (l = 0; l < p[n].length; l += 1)
            p[n][l] = 255 & f.B()[l + u2];
          u2 += v2;
          l = y2.C(w2);
          v2 = z(p[n], l.b() - 1).l(l);
          q[n] = Array(l.b() - 1);
          for (l = 0; l < q[n].length; l += 1)
            w2 = l + v2.b() - q[n].length, q[n][l] = 0 <= w2 ? v2.c(w2) : 0;
        }
        for (l = f = 0; l < b2.length; l += 1)
          f += b2[l].o;
        f = Array(f);
        for (l = u2 = 0; l < k; l += 1)
          for (n = 0; n < b2.length; n += 1)
            l < p[n].length && (f[u2] = p[n][l], u2 += 1);
        for (l = 0; l < m; l += 1)
          for (n = 0; n < b2.length; n += 1)
            l < q[n].length && (f[u2] = q[n][l], u2 += 1);
        g = f;
      }
      b2 = g;
      f = -1;
      k = d - 1;
      m = 7;
      p = 0;
      a2 = y2.F(a2);
      for (q = d - 1; 0 < q; q -= 2)
        for (6 == q && --q; ; ) {
          for (n = 0; 2 > n; n += 1)
            null == r[k][q - n] && (l = false, p < b2.length && (l = 1 == (b2[p] >>> m & 1)), a2(k, q - n) && (l = !l), r[k][q - n] = l, --m, -1 == m && (p += 1, m = 7));
          k += f;
          if (0 > k || d <= k) {
            k -= f;
            f = -f;
            break;
          }
        }
    }
    var h = A[a], r = null, d = 0, g = null, x = [], u = { u: function(b2) {
      b2 = w(b2);
      x.push(b2);
      g = null;
    }, a: function(b2, a2) {
      if (0 > b2 || d <= b2 || 0 > a2 || d <= a2)
        throw Error(b2 + "," + a2);
      return r[b2][a2];
    }, h: function() {
      return d;
    }, J: function() {
      for (var a2 = 0, h2 = 0, c2 = 0; 8 > c2; c2 += 1) {
        b(true, c2);
        var d2 = y2.D(u);
        if (0 == c2 || a2 > d2)
          a2 = d2, h2 = c2;
      }
      b(false, h2);
    } };
    return u;
  }
  function z(c, a) {
    if ("undefined" == typeof c.length)
      throw Error(c.length + "/" + a);
    var e3 = function() {
      for (var b2 = 0; b2 < c.length && 0 == c[b2]; )
        b2 += 1;
      for (var r = Array(c.length - b2 + a), d = 0; d < c.length - b2; d += 1)
        r[d] = c[d + b2];
      return r;
    }(), b = { c: function(b2) {
      return e3[b2];
    }, b: function() {
      return e3.length;
    }, multiply: function(a2) {
      for (var h = Array(b.b() + a2.b() - 1), c2 = 0; c2 < b.b(); c2 += 1)
        for (var g = 0; g < a2.b(); g += 1)
          h[c2 + g] ^= v.i(v.g(b.c(c2)) + v.g(a2.c(g)));
      return z(h, 0);
    }, l: function(a2) {
      if (0 > b.b() - a2.b())
        return b;
      for (var c2 = v.g(b.c(0)) - v.g(a2.c(0)), h = Array(b.b()), g = 0; g < b.b(); g += 1)
        h[g] = b.c(g);
      for (g = 0; g < a2.b(); g += 1)
        h[g] ^= v.i(v.g(a2.c(g)) + c2);
      return z(h, 0).l(a2);
    } };
    return b;
  }
  C.s = function(c) {
    for (var a = [], e3 = 0; e3 < c.length; e3++) {
      var b = c.charCodeAt(e3);
      128 > b ? a.push(b) : 2048 > b ? a.push(192 | b >> 6, 128 | b & 63) : 55296 > b || 57344 <= b ? a.push(224 | b >> 12, 128 | b >> 6 & 63, 128 | b & 63) : (e3++, b = 65536 + ((b & 1023) << 10 | c.charCodeAt(e3) & 1023), a.push(240 | b >> 18, 128 | b >> 12 & 63, 128 | b >> 6 & 63, 128 | b & 63));
    }
    return a;
  };
  var A = { L: 1, M: 0, Q: 3, H: 2 }, y2 = function() {
    function c(b) {
      for (var a2 = 0; 0 != b; )
        a2 += 1, b >>>= 1;
      return a2;
    }
    var a = [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170]
    ], e3 = { w: function(b) {
      for (var a2 = b << 10; 0 <= c(a2) - c(1335); )
        a2 ^= 1335 << c(a2) - c(1335);
      return (b << 10 | a2) ^ 21522;
    }, A: function(b) {
      for (var a2 = b << 12; 0 <= c(a2) - c(7973); )
        a2 ^= 7973 << c(a2) - c(7973);
      return b << 12 | a2;
    }, G: function(b) {
      return a[b - 1];
    }, F: function(b) {
      switch (b) {
        case 0:
          return function(b2, a2) {
            return 0 == (b2 + a2) % 2;
          };
        case 1:
          return function(b2) {
            return 0 == b2 % 2;
          };
        case 2:
          return function(b2, a2) {
            return 0 == a2 % 3;
          };
        case 3:
          return function(b2, a2) {
            return 0 == (b2 + a2) % 3;
          };
        case 4:
          return function(b2, a2) {
            return 0 == (Math.floor(b2 / 2) + Math.floor(a2 / 3)) % 2;
          };
        case 5:
          return function(b2, a2) {
            return 0 == b2 * a2 % 2 + b2 * a2 % 3;
          };
        case 6:
          return function(b2, a2) {
            return 0 == (b2 * a2 % 2 + b2 * a2 % 3) % 2;
          };
        case 7:
          return function(b2, a2) {
            return 0 == (b2 * a2 % 3 + (b2 + a2) % 2) % 2;
          };
        default:
          throw Error("bad maskPattern:" + b);
      }
    }, C: function(b) {
      for (var a2 = z([1], 0), c2 = 0; c2 < b; c2 += 1)
        a2 = a2.multiply(z([1, v.i(c2)], 0));
      return a2;
    }, f: function(b, a2) {
      if (4 != b || 1 > a2 || 40 < a2)
        throw Error("mode: " + b + "; type: " + a2);
      return 10 > a2 ? 8 : 16;
    }, D: function(b) {
      for (var a2 = b.h(), c2 = 0, d = 0; d < a2; d += 1)
        for (var g = 0; g < a2; g += 1) {
          for (var e4 = 0, t2 = b.a(d, g), p = -1; 1 >= p; p += 1)
            if (!(0 > d + p || a2 <= d + p))
              for (var q = -1; 1 >= q; q += 1)
                0 > g + q || a2 <= g + q || (0 != p || 0 != q) && t2 == b.a(d + p, g + q) && (e4 += 1);
          5 < e4 && (c2 += 3 + e4 - 5);
        }
      for (d = 0; d < a2 - 1; d += 1)
        for (g = 0; g < a2 - 1; g += 1)
          if (e4 = 0, b.a(d, g) && (e4 += 1), b.a(d + 1, g) && (e4 += 1), b.a(d, g + 1) && (e4 += 1), b.a(d + 1, g + 1) && (e4 += 1), 0 == e4 || 4 == e4)
            c2 += 3;
      for (d = 0; d < a2; d += 1)
        for (g = 0; g < a2 - 6; g += 1)
          b.a(d, g) && !b.a(d, g + 1) && b.a(d, g + 2) && b.a(d, g + 3) && b.a(d, g + 4) && !b.a(d, g + 5) && b.a(d, g + 6) && (c2 += 40);
      for (g = 0; g < a2; g += 1)
        for (d = 0; d < a2 - 6; d += 1)
          b.a(d, g) && !b.a(d + 1, g) && b.a(d + 2, g) && b.a(d + 3, g) && b.a(d + 4, g) && !b.a(d + 5, g) && b.a(d + 6, g) && (c2 += 40);
      for (g = e4 = 0; g < a2; g += 1)
        for (d = 0; d < a2; d += 1)
          b.a(d, g) && (e4 += 1);
      return c2 += Math.abs(100 * e4 / a2 / a2 - 50) / 5 * 10;
    } };
    return e3;
  }(), v = function() {
    for (var c = Array(256), a = Array(256), e3 = 0; 8 > e3; e3 += 1)
      c[e3] = 1 << e3;
    for (e3 = 8; 256 > e3; e3 += 1)
      c[e3] = c[e3 - 4] ^ c[e3 - 5] ^ c[e3 - 6] ^ c[e3 - 8];
    for (e3 = 0; 255 > e3; e3 += 1)
      a[c[e3]] = e3;
    return { g: function(b) {
      if (1 > b)
        throw Error("glog(" + b + ")");
      return a[b];
    }, i: function(b) {
      for (; 0 > b; )
        b += 255;
      for (; 256 <= b; )
        b -= 255;
      return c[b];
    } };
  }(), t = function() {
    function c(b, c2) {
      switch (c2) {
        case A.L:
          return a[4 * (b - 1)];
        case A.M:
          return a[4 * (b - 1) + 1];
        case A.Q:
          return a[4 * (b - 1) + 2];
        case A.H:
          return a[4 * (b - 1) + 3];
      }
    }
    var a = [
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],
      [2, 146, 116],
      [
        3,
        58,
        36,
        2,
        59,
        37
      ],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12, 7, 37, 13],
      [5, 122, 98, 1, 123, 99],
      [
        7,
        73,
        45,
        3,
        74,
        46
      ],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],
      [
        4,
        151,
        121,
        5,
        152,
        122
      ],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ], e3 = { I: function(b, a2) {
      var e4 = c(b, a2);
      if ("undefined" == typeof e4)
        throw Error("bad rs block @ typeNumber:" + b + "/errorCorrectLevel:" + a2);
      b = e4.length / 3;
      a2 = [];
      for (var d = 0; d < b; d += 1)
        for (var g = e4[3 * d], h = e4[3 * d + 1], t2 = e4[3 * d + 2], p = 0; p < g; p += 1) {
          var q = t2, f = {};
          f.o = h;
          f.j = q;
          a2.push(f);
        }
      return a2;
    } };
    return e3;
  }();
  return C;
}());
var qr_creator_es6_min_default = QrCreator;

// src/components/qr-code/qr-code.ts
var SlQrCode = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.value = "";
    this.label = "";
    this.size = 128;
    this.fill = "#000";
    this.background = "#fff";
    this.radius = 0;
    this.errorCorrection = "H";
  }
  firstUpdated() {
    this.generate();
  }
  generate() {
    if (!this.hasUpdated) {
      return;
    }
    qr_creator_es6_min_default.render(
      {
        text: this.value,
        radius: this.radius,
        ecLevel: this.errorCorrection,
        fill: this.fill,
        background: this.background === "transparent" ? null : this.background,
        size: this.size * 2
      },
      this.canvas
    );
  }
  render() {
    return y`
      <div
        class="qr-code"
        part="base"
        style=${i2({
      width: `${this.size}px`,
      height: `${this.size}px`
    })}
      >
        <canvas role="img" aria-label=${this.label.length > 0 ? this.label : this.value}></canvas>
      </div>
    `;
  }
};
SlQrCode.styles = qr_code_styles_default;
__decorateClass([
  i("canvas")
], SlQrCode.prototype, "canvas", 2);
__decorateClass([
  e2()
], SlQrCode.prototype, "value", 2);
__decorateClass([
  e2()
], SlQrCode.prototype, "label", 2);
__decorateClass([
  e2({ type: Number })
], SlQrCode.prototype, "size", 2);
__decorateClass([
  e2()
], SlQrCode.prototype, "fill", 2);
__decorateClass([
  e2()
], SlQrCode.prototype, "background", 2);
__decorateClass([
  e2({ type: Number })
], SlQrCode.prototype, "radius", 2);
__decorateClass([
  e2({ attribute: "error-correction" })
], SlQrCode.prototype, "errorCorrection", 2);
__decorateClass([
  watch("background"),
  watch("errorCorrection"),
  watch("fill"),
  watch("radius"),
  watch("size"),
  watch("value")
], SlQrCode.prototype, "generate", 1);
SlQrCode = __decorateClass([
  e("sl-qr-code")
], SlQrCode);

export {
  SlQrCode
};
